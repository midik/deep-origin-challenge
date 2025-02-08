import * as crypto from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlShortenerService {
  getRandomSlug() {
    // todo: move to config
    const slugLength = 6;
    return crypto.randomBytes(slugLength).toString('hex');
  }
}
