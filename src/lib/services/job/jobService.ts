import { JobRepository } from '../../repositories/job/jobRepository';
import { Job, JobType } from '@prisma/client';
import { logger } from '../../utils/logger';
import { webhookWorker } from '../../../workers/webhookWorker';
import { simpleWorker } from '../../../workers/simpleWorker';

export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async markJobAsCompleted(id: string): Promise<Job> {
    const result = await this.jobRepository.markJobAsCompleted(id);
    logger.info({ id }, 'Job marked as completed');
    return result;
  }

  async markJobAsFailed(id: string): Promise<Job> {
    const result = await this.jobRepository.markJobAsFailed(id);
    logger.info({ id }, 'Job marked as failed');
    return result;
  }

  async getJob(id: string): Promise<Job> {
    return await this.jobRepository.getJob(id);
  }

  async createWebhookJob(url: string, data: any): Promise<void> {
    const job = await this.jobRepository.createJob({
      scheduledAt: new Date(),
      type: JobType.WEBHOOK,
      data: { url, data },
    });
    await webhookWorker.add({ id: job.id, url, data });
  }

  async createSimpleJob(data: any): Promise<void> {
    const job = await this.jobRepository.createJob({
      scheduledAt: new Date(),
      type: JobType.SIMPLE,
      data,
    });
    await simpleWorker.add({ id: job.id, data });
  }
}
