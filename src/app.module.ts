import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { UrlShortenerService } from './url-shortener/url-shortener.service';
import { UrlModule } from './url/url.module';
import { UserModule } from './user/user.module';
import { UrlTrackModule } from './url-track/url-track.module';

@Module({
  imports: [UrlShortenerModule, UrlModule, UserModule, UrlTrackModule],
  controllers: [AppController],
  providers: [AppService, UrlShortenerService],
})
export class AppModule {}
