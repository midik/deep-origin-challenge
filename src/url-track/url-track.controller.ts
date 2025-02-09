import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UrlTrackService } from './url-track.service';

@Controller('url-track')
export class UrlTrackController {
  constructor(private readonly urlTrackService: UrlTrackService) {}

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.urlTrackService.update(id);
  }

  @Get()
  findAll() {
    return this.urlTrackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlTrackService.findOne(id);
  }
}
