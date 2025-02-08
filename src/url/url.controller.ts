import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create({
      ...createUrlDto,
      userId: 'b9077855-7290-4c63-a13a-33f32f95840e',
    });
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(+id, updateUrlDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urlService.remove(+id);
  // }
}
