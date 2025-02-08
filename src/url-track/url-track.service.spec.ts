import { Test, TestingModule } from '@nestjs/testing';
import { UrlTrackService } from './url-track.service';

describe('UrlTrackService', () => {
  let service: UrlTrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlTrackService],
    }).compile();

    service = module.get<UrlTrackService>(UrlTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
