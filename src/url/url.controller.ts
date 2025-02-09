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
import { CreateUrlRequestDto } from './dto/create-url.request.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { CreateUrlResponseDto } from './dto/create-url.response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Url } from './entities/url.entity';
import { GetUrlResponseDto } from './dto/get-url.response.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiOperation({ summary: 'Create (shorten) an URL' })
  @ApiResponse({
    status: 201,
    type: CreateUrlResponseDto,
  })
  async create(@Body() createUrlDto: CreateUrlRequestDto) {
    const url = await this.urlService.create({
      ...createUrlDto,
      userId: 'b9077855-7290-4c63-a13a-33f32f95840e', // default user :)
    });

    return new CreateUrlResponseDto(url);
  }

  @Get()
  @ApiOperation({ summary: 'Get all URLs' })
  @ApiResponse({
    status: 200,
    type: GetUrlResponseDto,
    isArray: true,
  })
  async findAll() {
    const items = await this.urlService.findAll();
    return items.map((url: Url) => new GetUrlResponseDto(url));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(id, updateUrlDto);
  }

  @Patch(':id/hit')
  hit(@Param('id') id: string) {
    return this.urlService.hit(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(id);
  }
}
