import { Test, TestingModule } from '@nestjs/testing';
import { ImmeubleService } from './immeuble.service';

describe('ImmeubleService', () => {
  let service: ImmeubleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImmeubleService],
    }).compile();

    service = module.get<ImmeubleService>(ImmeubleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
