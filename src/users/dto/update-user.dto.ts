import { OmitType } from '@nestjs/mapped-types';
import mongoose from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  _id: mongoose.Schema.Types.ObjectId;
}
