import * as request from 'supertest';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { CreateUrlRequestDto } from '../src/url/dto/create-url.request.dto';
import { UrlService } from '../src/url/url.service';
import { UrlModule } from '../src/url/url.module';
import { UrlShortenerModule } from '../src/url-shortener/url-shortener.module';
import { UserModule } from '../src/user/user.module';
import { DbModule } from '../src/prisma-service/db.module';
import { PrismaClient } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { CreateUrlResponseDto } from '../src/url/dto/create-url.response.dto';
import { ThrottlerModule } from '@nestjs/throttler';
import { GetUrlResponseDto } from '../src/url/dto/get-url.response.dto';

describe('e2e / url ', () => {
  let app: INestApplication;

  const userId = 'b9077855-7290-4c63-a13a-33f32f95840e';

  const mockData = {
    url: 'https://google.com',
  } as CreateUrlRequestDto;

  const expectedResponse = {
    baseUrl: 'https://short.ly',
    id: 'cm6wdmmen0001wg2f9dizg82s',
    url: mockData.url,
    userId,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
      imports: [
        UrlShortenerModule,
        UrlModule,
        UserModule,
        DbModule,
        ThrottlerModule.forRoot([
          {
            ttl: 60000,
            limit: 100,
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({}));
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        // hide all response DTO fields by default
        // excludeExtraneousValues: true,
      }),
    );

    await app.init();

    // danger zone :)
    const prisma = new PrismaClient();
    await prisma.url.deleteMany();
  });

  // since we runInBand this, we set our expectations to intermediate states,
  //   so we don't have to rollback / cleanup DB before each test.
  // However, that makes using of .only or .skip for certain tests not always possible.

  // beforeEach(() => {
  //   // instead, we could apply the fixtures between tests...
  // });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /url', () => {
    it('should return no records', async () => {
      const response = await request(app.getHttpServer())
        .get('/url')
        .expect(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /url', () => {
    describe('positive', () => {
      it('should return proper URL', async () => {
        const response = await request(app.getHttpServer())
          .post('/url')
          .send(mockData)
          .expect(201);

        const body = response.body as CreateUrlResponseDto;

        expect(body.id).toEqual(expect.any(String));
        expect(body.url).toEqual(mockData.url);
        expect(body.slug).toEqual(expect.any(String));
        expect(body.baseUrl).toEqual(expectedResponse.baseUrl);
        expect(body.userId).toEqual(userId);
      });
    });

    describe('negative', () => {
      it('should return 400 for non-valid url', async () => {
        await request(app.getHttpServer())
          .post('/url')
          .send({
            ...mockData,
            url: 'not-a-url',
          })
          .expect(400);
      });
    });
  });

  it('should return one record', async () => {
    const response = await request(app.getHttpServer()).get('/url').expect(200);
    const body = response.body as GetUrlResponseDto[];
    const item = body[0];

    expect(item.id).toEqual(expect.any(String));
    expect(item.url).toEqual(mockData.url);
    expect(item.slug).toEqual(expect.any(String));
    expect(item.baseUrl).toEqual(expectedResponse.baseUrl);
    expect(item.userId).toEqual(userId);
  });
});
