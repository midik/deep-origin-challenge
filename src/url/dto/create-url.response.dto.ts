import { Url } from '../entities/url.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlResponseDto extends Url {
  // control visibility here
  // @Expose()
  // @Exclude()

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

  constructor(partial: Partial<CreateUrlResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
