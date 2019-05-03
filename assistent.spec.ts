import { expectResponse, getResponse } from "./test-helpers";

describe('How are you intent', () => {
  it('should respond', async () => {
    const response = await getResponse({
      intentName: 'HowAreYouIntent',
    });
    expectResponse({ text: "I'm fine" }, response);
  });
});

describe('Example with Parameters', () => {
  it('should echo the input parameter', async () => {
    const response = await getResponse({
      intentName: 'ParameterIntent',
      parameters: { exampleParameter: 42 },
    });
    expectResponse({ text: 'The parameter is: 42' }, response);
  });
});

describe('Example with data', () => {
  it('should set some data', async () => {
    const response = await getResponse({
      intentName: 'StoreDataIntent',
    });
    expectResponse(
      {
        text: 'I will remember you visited this intent',
        data: { visitedDataIntent: true },
      },
      response,
    );
  });
});
