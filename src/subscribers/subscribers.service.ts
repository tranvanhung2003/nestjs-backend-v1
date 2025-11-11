import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private readonly subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    const isExist = await this.subscriberModel.findOne({
      email: createSubscriberDto.email,
    });

    if (isExist) {
      throw new BadRequestException(
        `Email: ${createSubscriberDto.email} đã tồn tại trên hệ thống`,
      );
    }

    const { _id, email } = user;

    const newSubscriber = await this.subscriberModel.create({
      ...createSubscriberDto,
      createdBy: {
        _id,
        email,
      },
    });

    return {
      _id: newSubscriber?._id,
      createdAt: newSubscriber?.createdAt,
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
    const totalItems = (await this.subscriberModel.find(restFilter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.subscriberModel
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
      throw new BadRequestException('Not found subscriber');
    }

    return await this.subscriberModel.findById(id);
  }

  async update(
    id: string,
    updateSubscriberDto: UpdateSubscriberDto,
    user: IUser,
  ) {
    const { _id, email } = user;

    return await this.subscriberModel.updateOne(
      { _id: id },
      {
        ...updateSubscriberDto,
        updatedBy: {
          _id,
          email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found subscriber');
    }

    const { _id, email } = user;

    await this.subscriberModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id,
          email,
        },
      },
    );

    return await this.subscriberModel.softDelete({ _id: id });
  }
}
