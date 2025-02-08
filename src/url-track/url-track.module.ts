import { Module } from '@nestjs/common';
import { UrlTrackService } from './url-track.service';
import { UrlTrackController } from './url-track.controller';

@Module({
  controllers: [UrlTrackController],
  providers: [UrlTrackService],
})
export class UrlTrackModule {}
