import { logger } from '../lib/utils/logger';
import { handleWorkerError, onCompleted } from './utils';
import { JobType } from '@prisma/client';

const Queue = require('bull');

export const simpleWorker = new Queue(JobType.SIMPLE, process.env.REDIS_URL);

if (process.env.WORKER) {
  logger.info('simple workers listening...');
  simpleWorker.process(100, async (job: any, done: () => void) => {
    try {
      // Your logic goes here
      console.log('Simple worker received: ', job.data);
    } catch (err) {
      await handleWorkerError(job.data.id, err);
    }
    done();
  });

  simpleWorker.on('completed', onCompleted);
}
