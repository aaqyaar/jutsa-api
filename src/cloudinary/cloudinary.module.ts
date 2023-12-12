import { Global, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Global()
@Module({
  providers: [CloudinaryService],
})
export class CloudinaryModule {}
