import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  @IsNotEmpty({ message: 'ID không được để trống' })
  _id: mongoose.Schema.Types.ObjectId;
}
