import { IsUrl } from 'class-validator';

export class CreateUrlRequestDto {
  @IsUrl()
  url: string;
  userId: string;
}
