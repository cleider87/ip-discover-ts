import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { Ipv4Service } from '../services/ipv4.service';
import { RealIP } from 'nestjs-real-ip';

@ApiTags('IPv4')
@Controller({
  path: 'ip',
})
export class Ipv4Controller {
  constructor(private readonly ipv4Service: Ipv4Service) {}

  @Get(':ip')
  async findOne(@RealIP() ipAddress: string) {
    console.log(ipAddress);
    return {
      asn: await this.ipv4Service.findASN(ipAddress),
      city: await this.ipv4Service.findCity(ipAddress),
    };
  }
}
