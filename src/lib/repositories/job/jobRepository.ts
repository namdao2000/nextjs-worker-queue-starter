import { Prisma, PrismaClient, Job } from '@prisma/client';
import { HttpError } from '../../utils/httpError';

export class JobRepository {
  constructor(private prisma: PrismaClient) {}

  async createJob(data: Prisma.JobUncheckedCreateInput): Promise<Job> {
    return await this.prisma.job.create({
      data: {
        type: data.type,
        data: data.data,
        scheduledAt: data.scheduledAt,
      },
    });
  }

  async markJobAsCompleted(id: string): Promise<Job> {
    return await this.prisma.job.update({
      where: { id },
      data: { completedAt: new Date() },
    });
  }

  async markJobAsFailed(id: string): Promise<Job> {
    return await this.prisma.job.update({
      where: { id },
      data: { failed: true, retries: { increment: 1 } },
    });
  }

  async getJob(id: string): Promise<Job> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new HttpError(404, 'Job not found');
    }

    return job;
  }
}
