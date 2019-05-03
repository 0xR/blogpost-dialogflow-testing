import {
  Context,
  Contexts,
  dialogflow,
  DialogflowConversation,
  Parameters,
} from 'actions-on-google';

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

app.intent('HowAreYouIntent', conv => {
  conv.add(`I'm fine`);
});

app.intent<ExampleParameters>(
  'ParameterIntent',
  (conv, { exampleParameter }) => {
    conv.add(`The parameter is: ${exampleParameter}`);
  },
);

interface ExampleData {
  visitedDataIntent?: boolean;
}

app.intent(
  'StoreDataIntent',
  (conv: DialogflowConversation<ExampleData, {}, {}>) => {
    conv.data.visitedDataIntent = true;
    conv.add('I will remember you visited this intent');
  },
);

export default app;
