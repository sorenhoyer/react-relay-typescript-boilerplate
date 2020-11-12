/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FoosQueryVariables = {};
export type FoosQueryResponse = {
    readonly foos: ReadonlyArray<{
        readonly uuid: string;
        readonly text: string;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"FooList_foos">;
};
export type FoosQuery = {
    readonly response: FoosQueryResponse;
    readonly variables: FoosQueryVariables;
};



/*
query FoosQuery {
  foos {
    uuid
    text
    id
  }
  ...FooList_foos
}

fragment FooListItem_foo on Foo {
  uuid
  text
}

fragment FooList_foos on Query {
  foos {
    uuid
    ...FooListItem_foo
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "uuid",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FoosQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Foo",
        "kind": "LinkedField",
        "name": "foos",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FooList_foos"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FoosQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Foo",
        "kind": "LinkedField",
        "name": "foos",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ff00f2dc8b98acc092b7699b60b3fe02",
    "id": null,
    "metadata": {},
    "name": "FoosQuery",
    "operationKind": "query",
    "text": "query FoosQuery {\n  foos {\n    uuid\n    text\n    id\n  }\n  ...FooList_foos\n}\n\nfragment FooListItem_foo on Foo {\n  uuid\n  text\n}\n\nfragment FooList_foos on Query {\n  foos {\n    uuid\n    ...FooListItem_foo\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '133ff76fa5091af3fc33b2cb347fa199';
export default node;
