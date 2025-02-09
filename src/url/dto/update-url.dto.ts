import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  slug: string;
}
