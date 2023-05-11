import { IsNotEmpty, IsString } from 'class-validator';

export class registerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class loginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
 @IsNotEmpty()
  password: string;
}
