import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    return await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
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

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
