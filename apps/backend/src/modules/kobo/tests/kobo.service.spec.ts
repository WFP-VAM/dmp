import { Test, TestingModule } from '@nestjs/testing';

import { KoboService } from '../kobo.service';

describe('KoboService', () => {
  let service: KoboService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KoboService],
    }).compile();

    service = module.get<KoboService>(KoboService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
