import { createServer } from './create-server';

import supertest, { Response } from 'supertest';
import { GoogleCloudDialogflowV2WebhookRequest } from 'actions-on-google';
import { GoogleCloudDialogflowV2WebhookResponse } from 'actions-on-google/dist/service/dialogflow/api/v2';
import { ConversationResponse } from 'actions-on-google/dist/service/actionssdk';

function getResponseForIntentName(name: string) {
  const request: GoogleCloudDialogflowV2WebhookRequest = {
    queryResult: {
      intent: {
        displayName: name,
      },
    },
  };
  return supertest(createServer())
    .post('/')
    .send(request);
}

function expectResponse(responseText: string, actual: Response) {
  const conversationResponse: Partial<ConversationResponse> = {
    richResponse: {
      items: [{ simpleResponse: { textToSpeech: responseText } }],
    },
  };

  const webhookResponse: GoogleCloudDialogflowV2WebhookResponse = {
    payload: {
      google: conversationResponse,
    },
  };

  expect(actual.status).toBe(200);
  expect(actual.body).toMatchObject(webhookResponse);
}

describe('How are you intent', () => {
  it('should respond', async () => {
    const response = await getResponseForIntentName('How are you intent');
    expectResponse("I'm fine", response);
  });
});

it('should be testable', async () => {
  const response = await getResponseForIntentName('Example with Parameters');
  expectResponse('The parameter is: undefined', response);
});
