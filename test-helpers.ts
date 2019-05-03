import { createServer } from './create-server';

import supertest, { Response } from 'supertest';
import { GoogleCloudDialogflowV2WebhookRequest } from 'actions-on-google';
import { GoogleCloudDialogflowV2WebhookResponse } from 'actions-on-google/dist/service/dialogflow/api/v2';
import { ConversationResponse } from 'actions-on-google/dist/service/actionssdk';

interface GetResponseArguments {
  intentName: string;
  parameters?: {};
}

export function getResponse({ intentName, parameters }: GetResponseArguments) {
  const request: GoogleCloudDialogflowV2WebhookRequest = {
    session: 'unit-test-session',
    queryResult: {
      parameters,
      intent: {
        displayName: intentName,
      },
    },
  };
  return supertest(createServer())
    .post('/')
    .send(request);
}

interface ExpectResponseArguments {
  text: string;
  data?: {};
}

export function expectResponse(
  { text, data }: ExpectResponseArguments,
  actual: Response,
) {
  const conversationResponse: Partial<ConversationResponse> = {
    richResponse: {
      items: [{ simpleResponse: { textToSpeech: text } }],
    },
  };

  const webhookResponse: GoogleCloudDialogflowV2WebhookResponse = {
    ...(data && {
      outputContexts: [
        {
          lifespanCount: 99,
          name: 'unit-test-session/contexts/_actions_on_google',
          parameters: {
            data: JSON.stringify(data),
          },
        },
      ],
    }),
    payload: {
      google: conversationResponse,
    },
  };

  expect(actual.status).toBe(200);
  expect(actual.body).toMatchObject(webhookResponse);
}
