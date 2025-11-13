import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { JobsService } from 'src/jobs/jobs.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { MailService } from './mail.service';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mailerService: MailerService,
    private readonly subscribersService: SubscribersService,
    private readonly jobsService: JobsService,
  ) {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async testCron() {
  //   console.log('>>> call me every 30 seconds');
  // }

  @Get()
  @Public()
  @ResponseMessage('Test email')
  // cron job run every sunday at 00:00 AM
  @Cron('0 0 0 * * 0')
  async handleTestEmail() {
    const subscribers = await this.subscribersService.find();

    for (const subscriber of subscribers) {
      const subscriberSkills = subscriber.skills;
      const jobsWithMatchingSkills =
        await this.jobsService.findJobsWithMatchingSkills(subscriberSkills);

      if (jobsWithMatchingSkills?.length) {
        const jobs = jobsWithMatchingSkills.map((job) => ({
          name: job.name,
          company: job.company.name,
          salary: `${job.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
          skills: job.skills,
        }));

        await this.mailerService.sendMail({
          to: subscriber.email,
          from: '"Support Team" <support@example.com>', // override default from
          subject: 'Welcome to Nice App! Confirm your Email',
          template: 'new-job',
          context: {
            receiver: subscriber.name,
            jobs,
          },
        });
      }
    }
  }
}
