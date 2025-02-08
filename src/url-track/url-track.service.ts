import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlTrackService {
  findAll() {
    return `This action returns all tracks`;
  }

  findOne(id: number) {
    return `This action returns all tracks for URL #${id}`;
  }
}
