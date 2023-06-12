describe('cli', () => {
  // Act before assertions
  beforeAll(async () => {
    console.log('beforeAll');
  });

  // Teardown (cleanup) after assertions
  afterAll(() => {
    console.log('afterAll');
  });

  // Assert greeter result
  it('tests some stuff', () => {
    expect('test').toBe(`test`);
  });
});
