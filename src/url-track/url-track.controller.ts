import { Controller, Get, Param } from '@nestjs/common';
import { UrlTrackService } from './url-track.service';

@Controller('url-track')
export class UrlTrackController {
  constructor(private readonly urlTrackService: UrlTrackService) {}

  @Get()
  findAll() {
    return this.urlTrackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlTrackService.findOne(+id);
  }
}
