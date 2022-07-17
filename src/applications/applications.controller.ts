import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post('242')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['id_photo', 'license_proof'],
      properties: {
        id_photo: {
          type: 'string',
          format: 'binary',
        },
        license_proof: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'id_photo', maxCount: 1 },
      { name: 'license_proof', maxCount: 1 },
    ]),
  )
  async create242(
    @UploadedFiles()
    files: {
      id_photo?: Express.Multer.File[];
      license_proof?: Express.Multer.File[];
    },
  ): Promise<void> {
    return this.applicationsService.create242(files);
  }
}
