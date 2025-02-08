import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';
import { DbModule } from '../prisma-service/db.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlShortenerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [DbModule],
})
export class UrlModule {}
