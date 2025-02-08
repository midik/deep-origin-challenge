import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { DbService } from '../prisma-service/db.service';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';

@Injectable()
export class UrlService {
  constructor(
    private readonly dbService: DbService,
    private readonly urlShortenerService: UrlShortenerService,
  ) {}

  async create(data: CreateUrlDto) {
    // todo move to config
    const baseUrl = 'https://short.ly';

    const randomSlug = this.urlShortenerService.getRandomSlug();

    await this.dbService.url.create({
      data: {
        url: data.url,
        slug: randomSlug,
        baseUrl,
        userId: data.userId,
      },
    });

    return {
      url: `${baseUrl}/${randomSlug}`,
    };
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
