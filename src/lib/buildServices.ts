// This is manual dependency injection. See why we do DI in the README.
// Yes, this is not the optimal way to do it, but there's not a nice way to do it in Typescript Nodejs.
import { ProductService } from './services/product/productService';
import { ProductRepository } from './repositories/product/productRepository';
import { PrismaClient } from '@prisma/client';
import { JobRepository } from './repositories/job/jobRepository';
import { JobService } from './services/job/jobService';
import { WebhookService } from './services/webhook/webhookService';

const prisma = new PrismaClient();

const repositories = {
  product: new ProductRepository(prisma),
  job: new JobRepository(prisma),
};

export const Services = {
  product: new ProductService(repositories.product),
  job: new JobService(repositories.job),
  webhook: new WebhookService(),
};
