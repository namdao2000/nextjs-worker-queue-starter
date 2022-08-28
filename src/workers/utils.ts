import { Services } from '../lib/buildServices';
import { logger } from '../lib/utils/logger';

export const queueOptions = {
  redis: process.env.REDIS_URL,
};

export const onCompleted = async (job: any) => {
  await Services.job.markJobAsCompleted(job.data.id);
};

export const handleWorkerError = async (jobId: string, err: any) => {
  await Services.job.markJobAsFailed(jobId);
  logger.error({ jobId, err }, 'Job failed');
};
