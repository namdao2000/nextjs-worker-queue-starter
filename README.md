<div align="center">
  <h1><b>🚀 The Ultimate Next.js Worker Queue Starter Pack</b></h1>
    <img src='https://dz2cdn1.dzone.com/storage/article-thumb/11707156-thumb.jpg' height="350" width="auto">
  <p>Next.js ^12 + Worker Queue</p>
  <p>I've adopted industries best practices into this template from my professional experience working in big tech, startups and YC companies.</p>
  <p>Made by <a href="https://namdao.dev">Nam Dao</a></p>
</div>

# **👉 Quick start**

1. Please set up the [Google OAuth 2.0 API & Credentials by following this tutorial](https://next-auth.js.org/providers/google)

2. Make sure you have the following `.env` file present.
    ```
    DATABASE_URL= Your PostgreSQL url
    GOOGLE_ID= Your Google Credentials API ID for NextAuth
    GOOGLE_SECRET= Your Google Credentials API secret for NextAuth
    SECRET= A secret string used to sign the JWT token for NextAuth
    ```
3. Spin up docker and start the postgreSQL via docker compose.

4. Run `npx prisma db push`. Make sure it is pointed at the local db.

5. Run `npm run dev`.

6. Run `npm run start-workers` to spin up the workers. 

7. Deploy to Vercel for free 😎

    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnamdao2000%2Fultimate-nextjs-starter)

##  **Add a new job**
1. Add a new job type to `JobType` in `schema.prisma`, then run `npx prisma migrate dev`.

2. Add a new worker to a file called `src/workers/[JobType]Worker.ts` using the following template.

```ts
import { logger } from '../lib/utils/logger';
import { handleWorkerError, onCompleted, queueOptions } from './utils';
import { JobType } from '@prisma/client';

const Queue = require('bull');

export const newWorker = new Queue(JobType.NEW, queueOptions);

if (process.env.WORKER) {
  logger.info('new workers listening...');
  newWorker.process(100, async (job: any, done: () => void) => {
    try {
      // Your logic goes here
      // ...
    } catch (err) {
      await handleWorkerError(job.data.id, err);
    }
    done();
  });

   newWorker.on('completed', onCompleted);
}
```

3. Add `import './[JobType]Worker';` to `src/workers/index.ts`

4. Add a new method called `create[JobType]Worker` to `JobService` in `src/services/jobService.ts`.

# **⭐️ Contribution**
Always looking for feedbacks and contributors! Please open an issue or a PR if you have any suggestions 😁
