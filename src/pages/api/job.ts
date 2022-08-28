import { NextApiRequest, NextApiResponse } from 'next';
import { handleError } from '../../lib/utils/handleError';
import { Services } from '../../lib/buildServices';

let number = 0;
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    switch (method) {
      case 'GET': {
        await Services.job.createWebhookJob(
          'https://webhook.site/c4e4cc23-0f4d-4978-a18b-a6c49d0a031d',
          {
            data: { msg: 'hello world', jobNumber: number },
          }
        );
        await Services.job.createSimpleJob('hello world bitch');
        res.json('Send a task to the queue: ' + number);
        number++;
        break;
      }
    }
  } catch (error) {
    handleError(error, res);
  }
}
