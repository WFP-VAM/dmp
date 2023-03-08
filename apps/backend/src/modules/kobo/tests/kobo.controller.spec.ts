import { Test, TestingModule } from '@nestjs/testing';

import { KoboController } from '../kobo.controller';

describe('KoboController', () => {
  let controller: KoboController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KoboController],
    }).compile();

    controller = module.get<KoboController>(KoboController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
