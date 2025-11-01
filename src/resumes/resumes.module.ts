import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { Resume, ResumeSchema } from './schema/resume.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resume.name, schema: ResumeSchema }]),
  ],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}
