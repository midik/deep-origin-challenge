import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlTrackService {
  findAll() {
    return `This action returns all tracks`;
  }

  findOne(id: string) {
    return `This action returns all tracks for URL #${id}`;
  }

  update(id: string) {
    return `This action updates a track for URL #${id}`;
  }
}
