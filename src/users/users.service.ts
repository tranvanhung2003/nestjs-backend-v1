import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { IUser } from './users.interface';

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

  async create(createUserDto: CreateUserDto, user: IUser) {
    const isExist = await this.findOneByUsername(createUserDto.email);

    if (isExist) {
      throw new BadRequestException(
        `Email ${createUserDto.email} already exists. Please use a different email.`,
      );
    }

    const hashPassword = this.getHashPassword(createUserDto.password);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    const { _id, createdAt } = newUser;

    return {
      _id,
      createdAt,
    };
  }

  async findAll(qs: string) {
    const {
      filter: { current, pageSize = 10, ...restFilter },
      sort,
      population,
    } = aqp(qs);
    const offset = (current - 1) * pageSize;
    const totalItems = (await this.userModel.find(restFilter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.userModel
      .find(restFilter)
      .skip(offset)
      .limit(pageSize)
      .sort(sort as any)
      .select('-password')
      .populate(population);

    return {
      meta: {
        current,
        pageSize,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid user ID format';
    }

    return await this.userModel.findOne({ _id: id }).select('-password');
  }

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({ email: username });
  }

  isValidPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    const { _id, ...updateData } = updateUserDto;

    return await this.userModel.updateOne(
      { _id },
      {
        ...updateData,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid user ID format';
    }

    const { _id, email } = user;

    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id,
          email,
        },
      },
    );

    return await this.userModel.softDelete({ _id: id });
  }

  async register(registerUserDto: RegisterUserDto) {
    const isExist = await this.findOneByUsername(registerUserDto.email);

    if (isExist) {
      throw new BadRequestException(
        `Email ${registerUserDto.email} already exists. Please use a different email.`,
      );
    }

    const hashPassword = this.getHashPassword(registerUserDto.password);
    const newRegister = await this.userModel.create({
      ...registerUserDto,
      password: hashPassword,
      role: 'USER',
    });

    const { _id, createdAt } = newRegister;

    return {
      _id,
      createdAt,
    };
  }

  async updateUserToken(id: string, refreshToken: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    return await this.userModel.updateOne(
      { _id: id },
      {
        refreshToken,
      },
    );
  }

  async findUserByToken(refreshToken: string) {
    return await this.userModel.findOne({ refreshToken });
  }
}
