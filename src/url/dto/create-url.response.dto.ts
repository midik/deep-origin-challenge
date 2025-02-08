import { Url } from '../entities/url.entity';
import { Expose } from 'class-transformer';

export class UrlResponseDto extends Url {
  // control visibility here
  // @Expose()
  // @Exclude()

  @Expose()
  id: string;

  constructor(partial: Partial<UrlResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
