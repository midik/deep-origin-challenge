import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;
}
