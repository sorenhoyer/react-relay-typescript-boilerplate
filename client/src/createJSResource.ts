import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TA from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';

type Resource = {
  moduleId: string;
  loader: TA.Task<any>;
  error: O.Option<unknown>;
  promise: O.Option<Promise<any>>;
  result: O.Option<any>;
};

type JSResource = {
  getModuleId: () => string;
  getModuleIfRequired: () => any | null;
  load: () => Promise<any>;
};

const loadModule = (resource: Resource) =>
  O.isSome(resource.promise)
    ? TE.of(resource)
    : ((promise = resource.loader()) =>
        pipe(
          TE.tryCatch(
            () => promise,
            (reason) => new Error(`${reason}`),
          ),
          TE.map((resp) => ({
            ...resource,
            promise: O.some(promise),
            result: resp ? O.some(resp?.default || resp) : O.none,
          })),
        ))();

const createResource = (moduleId: string, loader: TA.Task<any>): Resource => ({
  moduleId,
  loader,
  error: O.none,
  promise: O.none,
  result: O.none,
});

const get = ({ result }: Resource): O.Option<any> => result;

const getModuleId = ({ moduleId }: Resource): string => moduleId;

const getModuleIfRequired = (resource: Resource): O.Option<any> => get(resource);

const getOrCacheResource = (
  resourceMap: ReadonlyMap<string | number, Resource>,
  resource: O.Option<Resource>,
  moduleId: string,
  loader: TA.Task<any>,
): [Resource, ReadonlyMap<string | number, Resource>] =>
  O.isSome(resource)
    ? [resource.value, resourceMap]
    : [
        createResource(moduleId, loader),
        new Map([...resourceMap, [moduleId, createResource(moduleId, loader)]]) as ReadonlyMap<
          string | number,
          Resource
        >,
      ];

const createJSResource = ((): ((moduleId: string, loader: TA.Task<any>) => JSResource) => {
  let resourceMap: ReadonlyMap<string | number, Resource> = new Map();

  return (moduleId: string, loader: TA.Task<any>): JSResource => {
    // eslint-disable-next-line prefer-const
    let [resource, map] = getOrCacheResource(resourceMap, O.fromNullable(resourceMap.get(moduleId)), moduleId, loader);

    return {
      getModuleId: (): string => getModuleId(resource),
      getModuleIfRequired: (): any | null =>
        pipe(
          getModuleIfRequired(resource),
          O.getOrElse(() => O.toNullable(O.none)),
        ),
      load: async (): Promise<any> => {
        resource = await pipe(
          loadModule(resource),
          TE.getOrElse(() => {
            throw new Error('get called on Left');
          }),
        )();

        resourceMap = new Map([...map, [moduleId, resource]]);

        // eslint-disable-next-line no-nested-ternary
        return O.isSome(resource.promise)
          ? resource.promise.value
          : O.isSome(resource.result)
          ? resource.result.value
          : undefined;
      },
    };
  };
})();

export default createJSResource;

// type Loader = () => Promise<any>;

// type JSResource = {
//   getModuleId: () => string;
//   getModuleIfRequired: () => any | null;
//   load: () => Promise<any>;
// };

// const JSResource = (moduleId: string, loader: Loader): JSResource => {
//   let error: unknown | null = null;
//   let promise: Promise<any> | null = null;
//   let result: any = null;

//   const load = async (): Promise<any> => {
//     if (promise === null) {
//       promise = loader();

//       try {
//         let res = await promise;

//         if (res.default) res = res.default;

//         result = res;

//         return res;
//       } catch (err) {
//         error = err;

//         throw error;
//       }
//     }

//     return promise;
//   };

//   const get = (): any => {
//     if (result !== null) return result;
//   };

//   const getModuleId = (): string => moduleId;

//   const getModuleIfRequired = (): any | null => get();

//   return {
//     getModuleId,
//     getModuleIfRequired,
//     load,
//   };
// };

// let resourceMap: ReadonlyMap<string | number, JSResource> = new Map();

// const createJSResource = (moduleId: string, loader: Loader): JSResource => {
//   let resource = resourceMap.get(moduleId);

//   if (!resource) {
//     resource = JSResource(moduleId, loader);

//     resourceMap = new Map([...resourceMap, [moduleId, resource]]);
//   }

//   return resource;
// };

// export default createJSResource;
