import { Test, TestingModule } from '@nestjs/testing';
import { UrlTrackController } from './url-track.controller';
import { UrlTrackService } from './url-track.service';

describe('UrlTrackController', () => {
  let controller: UrlTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlTrackController],
      providers: [UrlTrackService],
    }).compile();

    controller = module.get<UrlTrackController>(UrlTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
