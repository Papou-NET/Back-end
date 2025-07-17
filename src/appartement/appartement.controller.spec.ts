import { Test, TestingModule } from '@nestjs/testing';
import { AppartementController } from './appartement.controller';

describe('AppartementController', () => {
  let controller: AppartementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppartementController],
    }).compile();

    controller = module.get<AppartementController>(AppartementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
