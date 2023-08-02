import { ApiProperty } from '@nestjs/swagger';

export class AuthGoogleLoginDto {
  @ApiProperty({ example: 'abc' })
  idToken: string;
}
