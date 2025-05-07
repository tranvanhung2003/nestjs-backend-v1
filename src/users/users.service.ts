import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...restCreateUserDto } = createUserDto;
    const hashPassword = this.getHashPassword(password);

    return await this.userModel.create({
      ...restCreateUserDto,
      password: hashPassword,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('id không hợp lệ', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findOne({ _id: id });

    if (!user) {
      throw new HttpException('không tìm thấy user', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      updateUserDto,
    );
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('id không hợp lệ', HttpStatus.BAD_REQUEST);
    }

    return await this.userModel.deleteOne({ _id: id });
  }
}
