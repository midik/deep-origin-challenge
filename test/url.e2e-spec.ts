import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { CreateUrlDto } from '../src/url/dto/create-url.dto';
import { UrlService } from '../src/url/url.service';
import { UrlModule } from '../src/url/url.module';
import { UrlShortenerModule } from '../src/url-shortener/url-shortener.module';
import { UserModule } from '../src/user/user.module';
import { UrlTrackModule } from '../src/url-track/url-track.module';
import { DbModule } from '../src/prisma-service/db.module';

describe('e2e / url ', () => {
  let app: INestApplication;

  const mockData = {
    url: 'https://google.com',
  } as CreateUrlDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
      imports: [
        UrlShortenerModule,
        UrlModule,
        UserModule,
        UrlTrackModule,
        DbModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
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
      expect(response.body).toEqual(`This action returns all url`);
    });
  });

  describe('POST /url', () => {
    describe('positive', () => {
      it('should return proper URL', async () => {
        const response = await request(void app.getHttpServer())
          .post('/url')
          .send(mockData)
          .expect(200);

        expect(response.body).toEqual({
          id: expect.any(String) as string,
          ...mockData,
        });
      });
    });

    describe.skip('negative', () => {
      it('should return 400 on empty slug', async () => {
        await request(void app.getHttpServer())
          .post('/url')
          .send({
            ...mockData,
            slug: '',
          })
          .expect(400);
      });
    });
  });

  it('should return one record', async () => {
    const response = await request(void app.getHttpServer())
      .get('/url')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: expect.any(String) as string,
        ...mockData,
      },
    ]);
  });
});
