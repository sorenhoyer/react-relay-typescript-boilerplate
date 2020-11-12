/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { fromGlobalId, nodeDefinitions, toGlobalId } from 'graphql-relay';
import { foos, users } from './database';
import { sleep } from './utils';

const { nodeField, nodeInterface } = nodeDefinitions(
  async (nodeId, ctx) => {
    const { id, type } = fromGlobalId(nodeId);

    switch (type) {
      case 'User':
        return { ...users[id], type: 'User' } || null;
      case 'Foo': {
        await sleep(8000);
        return { ...foos[id], type: 'Foo' } || null;
      }
      default:
        return null;
    }
  },
  (o): any => {
    switch (o.type) {
      case 'User':
        return userType;
      case 'Foo':
        return fooType;
      default:
        return null;
    }
  },
);

const userType = new GraphQLObjectType({
  name: 'User',
  interfaces: () => [nodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (u) => toGlobalId('User', u.id),
    },
    uuid: { type: GraphQLNonNull(GraphQLString), resolve: (u) => u.id },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const fooType = new GraphQLObjectType({
  name: 'Foo',
  interfaces: () => [nodeInterface],
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      resolve: (u) => toGlobalId('Foo', u.id),
    },
    uuid: { type: GraphQLNonNull(GraphQLString), resolve: (u) => u.id },
    text: { type: GraphQLNonNull(GraphQLString) },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    me: {
      type: new GraphQLNonNull(userType),
      async resolve() {
        await sleep(5000);
        return users['24cd352f-ca45-40d9-8ced-2c12a874a530'] || null;
      },
    },
    foos: {
      type: GraphQLList(fooType),
      resolve: async () => {
        await sleep(2000);
        return Object.values(foos);
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

export default schema;
