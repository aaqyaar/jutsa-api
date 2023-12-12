import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadImage(image: string): Promise<{ url: string }> {
    try {
      return { url: await this.cloudinaryService.uploadImage(image) };
    } catch (err) {
      const error = err as Error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
