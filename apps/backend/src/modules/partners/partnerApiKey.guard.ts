import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

// Comma-separated "partnerName:apiKey" pairs, e.g. "idpoor:abc123,someOtherPartner:def456".
// See docs/adr/003-partner-api-approach.md: a shared/per-partner API key plus request logging
// is the agreed baseline for the current partner scale.
const parsePartnerApiKeys = (raw: string | undefined): Map<string, string> => {
  const entries = (raw ?? '')
    .split(',')
    .map((pair) => pair.trim())
    .filter((pair) => pair !== '')
    .map((pair) => pair.split(':').map((part) => part.trim()) as [string, string]);

  return new Map(entries.map(([partnerName, apiKey]) => [apiKey, partnerName]));
};

export interface PartnerRequest {
  headers: { 'x-api-key'?: string };
  partnerName?: string;
}

@Injectable()
export class PartnerApiKeyGuard implements CanActivate {
  private readonly apiKeysByKey = parsePartnerApiKeys(process.env.PARTNER_API_KEYS);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<PartnerRequest>();
    const apiKey = request.headers['x-api-key'];

    const partnerName = apiKey === undefined ? undefined : this.apiKeysByKey.get(apiKey);

    if (partnerName === undefined) {
      throw new HttpException('Invalid or missing API key', HttpStatus.UNAUTHORIZED);
    }

    // Attach the resolved partner identity for downstream request logging.
    request.partnerName = partnerName;

    return true;
  }
}
