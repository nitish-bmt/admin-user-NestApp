  import { Controller, Get, UseGuards, Version } from '@nestjs/common';
  import { AppService } from './app.service';
  import { Public } from './utils/customDecorator/custom.decorator';
  import { Verify } from 'crypto';
import { RolesGuard } from './auth/roles.guard';

  // @Controller({version: '1'})
  // export class AppController {
  //   constructor(private readonly appService: AppService) {}

  //   @Public()
  //   @Get()
  //   getHello(): string {
  //     return this.appService.getHello();
  //   }
  // }

  // @Controller({version: '2'})
  @UseGuards(RolesGuard)
  @Controller()
  export class AppV2Controller {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    getHelloV2(): string {
      return this.appService.getHelloV2();
    }
  }

  // @Controller({ version: '2' })
  // export class AppV2Controller {
  //   constructor(private readonly appService: AppService) {}

  //   @Public()
  //   @Get()
  //   getHelloV2(): string {
  //     return this.appService.getHelloV2();
  //   }
  // }
