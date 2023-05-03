import { Post } from '@decorators/httpDecorators';
import { Body, Controller, UseGuards } from '@nestjs/common';
import { DROUGHT, DroughtDto, FLOOD, FloodDto, INCIDENT, IncidentDto } from '@wfp-dmp/interfaces';

import { WebhookGuard } from './webhook.guard';

@Controller('webhook')
@UseGuards(WebhookGuard)
export class WebhookController {
  @Post(FLOOD, { isPublic: true })
  postFloodWebhook(@Body() body: FloodDto): string {
    console.log(FLOOD, body._id);

    return 'ok';
  }

  @Post(DROUGHT, { isPublic: true })
  postDroughtWebhook(@Body() body: DroughtDto): string {
    console.log(body._id);

    return 'ok';
  }

  @Post(INCIDENT, { isPublic: true })
  postIncidentWebhook(@Body() body: IncidentDto): string {
    console.log(body._id);

    return 'ok';
  }
}
