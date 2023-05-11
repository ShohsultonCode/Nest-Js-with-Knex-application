import { PartialType } from '@nestjs/swagger';
import { registerDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(registerDto) {}
