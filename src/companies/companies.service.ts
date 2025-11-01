import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const { _id, email } = user;

    return await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id,
        email,
      },
    });
  }

  async findAll(qs: string) {
    const {
      filter: { current, pageSize = 10, ...restFilter },
      sort,
      projection,
      population,
    } = aqp(qs);
    const offset = (current - 1) * pageSize;
    const totalItems = (await this.companyModel.find(restFilter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.companyModel
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
      throw new BadRequestException(`Not found company with id ${id}`);
    }

    return await this.companyModel.findById(id);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid company ID format';
    }

    const { _id, email } = user;

    await this.companyModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id,
          email,
        },
      },
    );

    return await this.companyModel.softDelete({ _id: id });
  }
}
