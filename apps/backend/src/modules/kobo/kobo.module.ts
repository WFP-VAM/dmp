import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { KoboController } from './kobo.controller';
import { KoboService } from './kobo.service';

@Module({
  imports: [HttpModule],
  controllers: [KoboController],
  providers: [KoboService],
})
export class KoboModule {}
