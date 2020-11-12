/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FoosQueryVariables = {};
export type FoosQueryResponse = {
    readonly foos: ReadonlyArray<{
        readonly uuid: string;
        readonly text: string;
    } | null> | null;
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
    "cacheID": "87eeae3e37bd275263a5e89cb88bcf8c",
    "id": null,
    "metadata": {},
    "name": "FoosQuery",
    "operationKind": "query",
    "text": "query FoosQuery {\n  foos {\n    uuid\n    text\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8025880d268e8809bd77cabecb889027';
export default node;
