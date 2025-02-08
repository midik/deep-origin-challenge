import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlRequestDto {
  @IsUrl()
  @ApiProperty()
  url: string;

  @ApiProperty()
  userId: string;
}
