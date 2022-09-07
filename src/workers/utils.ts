import { Services } from '../lib/buildServices';
import { logger } from '../lib/utils/logger';

export const queueOptions = {
  redis: {
    port: "6379",
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
};

export const onCompleted = async (job: any) => {
  await Services.job.markJobAsCompleted(job.data.id);
};

export const handleWorkerError = async (jobId: string, err: any) => {
  await Services.job.markJobAsFailed(jobId);
  logger.error({ jobId, err }, 'Job failed');
};
