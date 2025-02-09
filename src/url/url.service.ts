import { Injectable } from '@nestjs/common';
import { CreateUrlRequestDto } from './dto/create-url.request.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { DbService } from '../prisma-service/db.service';
import { UrlShortenerService } from '../url-shortener/url-shortener.service';
import * as process from 'node:process';

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
    // TODO stick to frontend-based redirects for now
    // const baseUrl = 'https://short.ly';
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

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
    return this.dbService.url.findMany({
      include: {
        User: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.dbService.url.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateUrlDto: UpdateUrlDto) {
    return this.dbService.url.update({
      where: {
        id,
      },
      data: updateUrlDto,
    });
  }

  hit(id: string) {
    return this.dbService.url.update({
      where: {
        id,
      },
      data: {
        visits: {
          increment: 1,
        },
        lastVisitedAt: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.dbService.url.delete({
      where: {
        id,
      },
    });
  }
}
