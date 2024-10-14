import { Post } from '@decorators/httpDecorators';
import { Body, Controller, UseGuards } from '@nestjs/common';
import { DROUGHT, DroughtDto, FLOOD, FloodDto, INCIDENT, IncidentDto } from '@wfp-dmp/interfaces';

import { WebhookGuard } from './webhook.guard';
import { WebhookService } from './webhook.service';

@Controller('webhook')
@UseGuards(WebhookGuard)
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post(FLOOD, { isPublic: true })
  async postFloodWebhook(@Body() body: FloodDto & Record<string, string>): Promise<string> {
    const response = await this.webhookService.sendAlerts(FLOOD, body);

    return response;
  }

  @Post(DROUGHT, { isPublic: true })
  async postDroughtWebhook(@Body() body: DroughtDto & Record<string, string>): Promise<string> {
    const response = await this.webhookService.sendAlerts(DROUGHT, body);

    return response;
  }

  @Post(INCIDENT, { isPublic: true })
  async postIncidentWebhook(@Body() body: IncidentDto & Record<string, string>): Promise<string> {
    const response = await this.webhookService.sendAlerts(INCIDENT, body);

    return response;
  }
}
