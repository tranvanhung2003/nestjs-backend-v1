import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
  ) {}

  getHashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUserDto.password);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid user ID format';
    }

    return await this.userModel.findOne({ _id: id });
  }

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto) {
    const { _id, ...updateData } = updateUserDto;

    return await this.userModel.updateOne({ _id }, updateData);
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid user ID format';
    }

    return await this.userModel.softDelete({ _id: id });
  }
}
