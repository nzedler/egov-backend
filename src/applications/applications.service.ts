import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationsService {
  public async create242(files: {
    id_photo?: Express.Multer.File[];
    license_proof?: Express.Multer.File[];
  }): Promise<void> {
    // logs the files
    console.log(files);
  }
}
