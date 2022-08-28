import axios from 'axios';
import { logger } from '../../utils/logger';

// Example webhook service
export class WebhookService {
  async sendWebhook(url: string, data: any): Promise<void> {
    await axios.post(url, data);
    logger.info({ url, data }, 'Webhook sent');
  }
}
