import { Test, TestingModule } from '@nestjs/testing';
import { ImmeubleController } from './immeuble.controller';

describe('ImmeubleController', () => {
  let controller: ImmeubleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImmeubleController],
    }).compile();

    controller = module.get<ImmeubleController>(ImmeubleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
