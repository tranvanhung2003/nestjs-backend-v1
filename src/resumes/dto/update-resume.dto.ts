import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
import { CreateResumeDto } from './create-resume.dto';

class UpdatedBy {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class History {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  updatedAt: Date;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdatedBy)
  updatedBy: UpdatedBy;
}

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsNotEmpty({ message: 'History không được để trống' })
  @IsArray({ message: 'History phải có định dạng là array' })
  @ValidateNested({ each: true })
  @Type(() => History)
  history: History[];
}
