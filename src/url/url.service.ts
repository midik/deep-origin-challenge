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
  ) {
    // // @ts-ignore
    // dbService.$on<any>('query', (event) => console.log(event));
  }

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
    return this.dbService.url.findMany();
  }

  findOne(id: string) {
    return this.dbService.url.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: string) {
    return `This action removes a #${id} url`;
  }
}
