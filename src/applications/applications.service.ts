import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationsService {
  public async create242(files: {
    id_photo?: Express.Multer.File[];
    license_proof?: Express.Multer.File[];
  }): Promise<void> {
    console.log(files);
    return;
  }
}
