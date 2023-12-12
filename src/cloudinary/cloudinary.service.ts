import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/types/cloudinary';

@Injectable()
export class CloudinaryService {
  private cloudinary: typeof cloudinary = cloudinary;

  constructor(private readonly configService: ConfigService) {
    this.cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_IMAGE_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(image: string) {
    try {
      const response = (await this.cloudinary.uploader.upload(
        image,
      )) as unknown as CloudinaryResponse;

      return response.secure_url;
    } catch (err) {
      const error = err as Error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
