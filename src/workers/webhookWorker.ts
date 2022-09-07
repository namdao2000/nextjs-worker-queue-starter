import { logger } from '../lib/utils/logger';
import { Services } from '../lib/buildServices';
import { handleWorkerError, onCompleted } from './utils';
import { JobType } from '@prisma/client';

const Queue = require('bull');

export const webhookWorker = new Queue(JobType.WEBHOOK, process.env.REDIS_URL);

if (process.env.WORKER) {
  logger.info('webhook workers listening...');
  webhookWorker.process(100, async (job: any, done: () => void) => {
    try {
      // Your logic goes here
      console.log('Webhook worker received: ', job.data);
      await Services.webhook.sendWebhook(job.data.url, job.data.data);
    } catch (err) {
      await handleWorkerError(job.data.id, err);
    }
    done();
  });

  webhookWorker.on('completed', onCompleted);
}
