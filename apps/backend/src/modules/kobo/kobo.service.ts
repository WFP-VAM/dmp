import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KoboService {
  constructor(private readonly httpService: HttpService) {}
}
