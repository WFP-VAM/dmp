import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

@Injectable()
export class WebhookGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const token = context.switchToHttp().getRequest<{ headers: { authorization?: string } }>()
      .headers.authorization;

    if (WEBHOOK_TOKEN === undefined) {
      throw new Error('Webhook token is not defined');
    }

    return token === `Bearer ${WEBHOOK_TOKEN}`;
  }
}
