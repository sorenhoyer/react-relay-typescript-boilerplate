/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FooListItem_foo = {
    readonly uuid: string;
    readonly text: string;
    readonly " $refType": "FooListItem_foo";
};
export type FooListItem_foo$data = FooListItem_foo;
export type FooListItem_foo$key = {
    readonly " $data"?: FooListItem_foo$data;
    readonly " $fragmentRefs": FragmentRefs<"FooListItem_foo">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FooListItem_foo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "uuid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "Foo",
  "abstractKey": null
};
(node as any).hash = 'a8849e1eab261aeb220a9b7448dede78';
export default node;
