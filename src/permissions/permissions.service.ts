import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schema/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { _id, email } = user;

    const isExist = await this.permissionModel.findOne({
      apiPath: createPermissionDto.apiPath,
      method: createPermissionDto.method,
    });

    if (isExist) {
      throw new BadRequestException(
        `Permission với apiPath=${createPermissionDto.apiPath}, method=${createPermissionDto.method} đã tồn tại`,
      );
    }

    const newPermission = await this.permissionModel.create({
      ...createPermissionDto,
      createdBy: {
        _id,
        email,
      },
    });

    return {
      _id: newPermission?._id,
      createdAt: newPermission?.createdAt,
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
    const totalItems = (await this.permissionModel.find(restFilter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.permissionModel
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
      throw new BadRequestException('Not found permission');
    }

    return await this.permissionModel.findById(id);
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: IUser,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found permission');
    }

    return await this.permissionModel.updateOne(
      {
        _id: id,
      },
      {
        ...updatePermissionDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found permission');
    }

    await this.permissionModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return await this.permissionModel.softDelete({ _id: id });
  }
}
