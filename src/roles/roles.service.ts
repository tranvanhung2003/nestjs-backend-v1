import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schema/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { _id, email } = user;

    const isExist = await this.roleModel.findOne({
      name: createRoleDto.name,
    });

    if (isExist) {
      throw new BadRequestException(
        `Role với name=${createRoleDto.name} đã tồn tại`,
      );
    }

    const newRole = await this.roleModel.create({
      ...createRoleDto,
      createdBy: {
        _id,
        email,
      },
    });

    return {
      _id: newRole?._id,
      createdAt: newRole?.createdAt,
    };
  }

  async findAll(qs: string) {
    const {
      filter: { current, pageSize = 10, ...restFilter },
      sort,
      projection,
      population,
    } = aqp(qs);
    const offset = (current - 1) * pageSize;
    const totalItems = (await this.roleModel.find(restFilter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.roleModel
      .find(restFilter)
      .skip(offset)
      .limit(pageSize)
      .sort(sort as any)
      .select(projection)
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
      throw new BadRequestException('Not found role');
    }

    return (await this.roleModel.findById(id)).populate({
      path: 'permissions',
      select: { _id: 1, apiPath: 1, name: 1, method: 1 },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found role');
    }

    const isExist = await this.roleModel.findOne({ name: updateRoleDto.name });

    if (isExist) {
      throw new BadRequestException(
        `Role với name=${updateRoleDto.name} đã tồn tại`,
      );
    }

    return await this.roleModel.updateOne(
      { _id: id },
      {
        ...updateRoleDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found role');
    }

    await this.roleModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return await this.roleModel.softDelete({ _id: id });
  }
}
