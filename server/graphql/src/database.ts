type Foo = { id: string; text: string };

const foos: Record<string, Foo> = {
  'cdfda462-7fe0-4d15-ae38-164e92040f19': { id: 'cdfda462-7fe0-4d15-ae38-164e92040f19', text: 'bar' },
  '6728dbdc-8f47-444c-adc3-c9e707e2144a': { id: '6728dbdc-8f47-444c-adc3-c9e707e2144a', text: 'baz' },
  '73276921-f0a2-401c-8438-12f4c4fb1529': { id: '73276921-f0a2-401c-8438-12f4c4fb1529', text: 'Foo 3' },
  '51d71006-be69-450f-af7f-78945c4a7d2c': { id: '51d71006-be69-450f-af7f-78945c4a7d2c', text: 'Foo 4' },
  '71bc3c38-4405-4809-970b-0bdacae04e26': { id: '71bc3c38-4405-4809-970b-0bdacae04e26', text: 'Foo 5' },
  '9c988f52-781d-43de-b962-068bd7ab34a7': { id: '9c988f52-781d-43de-b962-068bd7ab34a7', text: 'Foo 6' },
  '3b72d9fd-0537-4318-bb76-f8c02f2a82db': { id: '3b72d9fd-0537-4318-bb76-f8c02f2a82db', text: 'Foo 7' },
  '7c508d5f-d0e5-40cd-9a4e-1061f9b240e7': { id: '7c508d5f-d0e5-40cd-9a4e-1061f9b240e7', text: 'Foo 8' },
  '745fda71-d44f-4c3f-9c81-60c69d7238d2': { id: '745fda71-d44f-4c3f-9c81-60c69d7238d2', text: 'Foo 9' },
  'aa4a81f2-23d6-490c-ae07-a79cc7c8d481': { id: 'aa4a81f2-23d6-490c-ae07-a79cc7c8d481', text: 'Foo 10' },
};

type User = { id: string; firstName: string };

const users: Record<string, User> = {
  '24cd352f-ca45-40d9-8ced-2c12a874a530': { id: '24cd352f-ca45-40d9-8ced-2c12a874a530', firstName: 'John' },
  'd7f03938-7674-4c7c-96cc-e58fe25a3811': { id: 'd7f03938-7674-4c7c-96cc-e58fe25a3811', firstName: 'Jane' },
};

// eslint-disable-next-line import/prefer-default-export
export { foos, users };
