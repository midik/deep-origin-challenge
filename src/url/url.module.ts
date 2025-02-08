import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';
import { DbModule } from '../prisma-service/db.module';

@Module({
  controllers: [UrlController],
  providers: [UrlService, UrlShortenerService],
  imports: [DbModule],
})
export class UrlModule {}
