type Foo = { id: string; text: string };

const foos: Record<string, Foo> = {
  'cdfda462-7fe0-4d15-ae38-164e92040f19': { id: 'cdfda462-7fe0-4d15-ae38-164e92040f19', text: 'bar' },
  '6728dbdc-8f47-444c-adc3-c9e707e2144a': { id: '6728dbdc-8f47-444c-adc3-c9e707e2144a', text: 'baz' },
};

type User = { id: string; firstName: string };

const users: Record<string, User> = {
  '24cd352f-ca45-40d9-8ced-2c12a874a530': { id: '24cd352f-ca45-40d9-8ced-2c12a874a530', firstName: 'John' },
  'd7f03938-7674-4c7c-96cc-e58fe25a3811': { id: 'd7f03938-7674-4c7c-96cc-e58fe25a3811', firstName: 'Jane' },
};

// eslint-disable-next-line import/prefer-default-export
export { foos, users };
