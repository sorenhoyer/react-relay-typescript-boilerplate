// eslint-disable-next-line import/no-extraneous-dependencies
import { Environment, FetchFunction, Network, RecordSource, Store } from 'relay-runtime';

const fetchRelay: FetchFunction = async (params, variables) => {
  const response = await fetch(process.env.REACT_RELAY_TYPESCRIPT_BOILERPLATE_GRAPHQL_ENDPOINT, {
    body: JSON.stringify({
      query: params.id ?? params.text,
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
  });

  const json = await response.json();

  if (Array.isArray(json.errors))
    throw new Error(
      `Error fetching GraphQL query '${params.name}' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors,
      )}`,
    );

  return json;
};

const environment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10,
  }),
});

export default environment;
