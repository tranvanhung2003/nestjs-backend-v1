import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { CreateUserCvDto } from './dto/create-resume.dto';
import { Resume, ResumeDocument } from './schema/resume.schema';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private readonly resumeModel: SoftDeleteModel<ResumeDocument>,
  ) {}

  async create(createUserCvDto: CreateUserCvDto, user: IUser) {
    const { _id, email } = user;

    const newResume = await this.resumeModel.create({
      ...createUserCvDto,
      email,
      userId: _id,
      status: 'PENDING',
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          updatedBy: {
            _id,
            email,
          },
        },
      ],
      createdBy: {
        _id,
        email,
      },
    });

    return {
      _id: newResume?._id,
      createdAt: newResume?.createdAt,
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
    const totalItems = (await this.resumeModel.find(restFilter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.resumeModel
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
      throw new BadRequestException('Not found resume');
    }

    return await this.resumeModel.findById(id);
  }

  async findByUser(user: IUser) {
    return await this.resumeModel.find({
      userId: user._id,
    });
  }

  async updateStatus(id: string, status: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found resume');
    }

    const updatedResume = await this.resumeModel.updateOne(
      { _id: id },
      {
        status,
        $push: {
          history: {
            status,
            updatedAt: new Date(),
            updatedBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return updatedResume;
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Not found resume');
    }

    const { _id, email } = user;

    await this.resumeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id,
          email,
        },
      },
    );

    return await this.resumeModel.softDelete({ _id: id });
  }
}
