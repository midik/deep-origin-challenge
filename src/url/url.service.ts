import { Injectable } from '@nestjs/common';
import { CreateUrlRequestDto } from './dto/create-url.request.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { DbService } from '../prisma-service/db.service';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';
import { GetUrlResponseDto } from './dto/get-url.response.dto';

@Injectable()
export class UrlService {
  constructor(
    private readonly dbService: DbService,
    private readonly urlShortenerService: UrlShortenerService,
  ) {
    // // @ts-ignore
    // dbService.$on<any>('query', (event) => console.log(event));
  }

  async create(data: CreateUrlRequestDto) {
    // todo move to config
    const baseUrl = 'https://short.ly';

    const randomSlug = this.urlShortenerService.getRandomSlug();

    return this.dbService.url.create({
      data: {
        url: data.url,
        slug: randomSlug,
        baseUrl,
        userId: data.userId,
      },
    });
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
