import { Url } from '../entities/url.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetUrlResponseDto extends Url {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  baseUrl: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  userId: string;

  constructor(partial: Partial<GetUrlResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
