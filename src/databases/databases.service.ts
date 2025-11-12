import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Permission,
  PermissionDocument,
} from 'src/permissions/schema/permission.schema';
import { Role, RoleDocument } from 'src/roles/schema/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteModel<PermissionDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT') === 'true';

    if (!isInit) {
      return;
    }

    const countUser = await this.userModel.countDocuments();
    const countPermission = await this.permissionModel.countDocuments();
    const countRole = await this.roleModel.countDocuments();

    // create permissions
    if (countPermission === 0) {
      await this.permissionModel.insertMany(INIT_PERMISSIONS);
    }

    // create roles
    if (countRole === 0) {
      const permissions = await this.permissionModel.find().select('_id');
      await this.roleModel.insertMany([
        {
          name: ADMIN_ROLE,
          description: 'Admin thì full quyền',
          isActive: true,
          permissions,
        },
        {
          name: USER_ROLE,
          description: 'Người dùng/ứng viên sử dụng hệ thống',
          isActive: true,
          permissions: [], // không set quyền, chỉ cần add role
        },
      ]);
    }

    // create users
    if (countUser === 0) {
      const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
      const userRole = await this.roleModel.findOne({ name: USER_ROLE });

      await this.userModel.insertMany([
        {
          name: "I'm admin",
          email: 'admin@gmail.com',
          password: this.usersService.getHashPassword(
            this.configService.get<string>('INIT_PASSWORD'),
          ),
          age: 22,
          gender: 'MALE',
          address: 'VietNam',
          role: adminRole?._id,
        },
        {
          name: "I'm Trần Văn Hưng",
          email: 'tranvanhung@gmail.com',
          password: this.usersService.getHashPassword(
            this.configService.get<string>('INIT_PASSWORD'),
          ),
          age: 22,
          gender: 'MALE',
          address: 'VietNam',
          role: adminRole?._id,
        },
        {
          name: "I'm normal user",
          email: 'user@gmail.com',
          password: this.usersService.getHashPassword(
            this.configService.get<string>('INIT_PASSWORD'),
          ),
          age: 22,
          gender: 'MALE',
          address: 'VietNam',
          role: userRole?._id,
        },
      ]);
    }

    if (countUser > 0 && countRole > 0 && countPermission > 0) {
      this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
    }
  }
}
