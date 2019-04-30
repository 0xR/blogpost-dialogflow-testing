import { Context, Contexts, dialogflow, Parameters } from 'actions-on-google';

interface CallParameters extends Parameters {
  count?: number;
}

interface ExampleContext extends Contexts {
  calls?: Context<CallParameters>;
}

interface ExampleParameters extends Parameters {
  exampleParameter?: string;
}

const app = dialogflow();

app.intent('How are you intent', conv => {
  conv.add(`I'm fine`);
});

app.intent<ExampleParameters>(
  'Example with Parameters',
  (conv, { exampleParameter }) => {
    conv.add(`The parameter is: ${exampleParameter}`);
  },
);

export default app;
