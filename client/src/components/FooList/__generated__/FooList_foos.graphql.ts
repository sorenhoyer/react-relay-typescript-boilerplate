/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FooList_foos = {
    readonly foos: ReadonlyArray<{
        readonly uuid: string;
        readonly " $fragmentRefs": FragmentRefs<"FooListItem_foo">;
    } | null> | null;
    readonly " $refType": "FooList_foos";
};
export type FooList_foos$data = FooList_foos;
export type FooList_foos$key = {
    readonly " $data"?: FooList_foos$data;
    readonly " $fragmentRefs": FragmentRefs<"FooList_foos">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FooList_foos",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Foo",
      "kind": "LinkedField",
      "name": "foos",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "uuid",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FooListItem_foo"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '35fce5f6300fc8e3db386ed55581e547';
export default node;
