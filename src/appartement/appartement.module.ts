import { Module } from '@nestjs/common';
import { AppartementController } from './appartement.controller';
import { AppartementService } from './appartement.service';

@Module({
  controllers: [AppartementController],
  providers: [AppartementService]
})
export class AppartementModule {}
