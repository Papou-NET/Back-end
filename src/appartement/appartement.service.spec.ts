import { Test, TestingModule } from '@nestjs/testing';
import { AppartementService } from './appartement.service';

describe('AppartementService', () => {
  let service: AppartementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppartementService],
    }).compile();

    service = module.get<AppartementService>(AppartementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
