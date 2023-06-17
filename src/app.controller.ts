import { Controller, Get, Ip } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as ipaddr from 'ipaddr.js';

@ApiTags('API Root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    description: 'Some ELB use this endpoint for enable the instance',
  })
  getRoot(@Ip() ipAddress) {
    return ipaddr.process(ipAddress).toString();
  }
}
