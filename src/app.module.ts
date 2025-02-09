import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { UrlTrackModule } from './url-track/url-track.module';
import { DbModule } from './prisma-service/db.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    DbModule,
    UrlShortenerModule,
    UrlModule,
    UserModule,
    UrlTrackModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
