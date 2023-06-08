import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Ip,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as ipaddr from 'ipaddr.js';
import { IpResponseDto } from '../dtos/ip-response.dto';
import { CountryService } from '../services/country.service';
import { Ipv4Service } from '../services/ipv4.service';
import { Ipv6Service } from '../services/ipv6.service';

@ApiTags('IP')
@Controller({
  path: 'ip',
})
export class Ipv4Controller {
  constructor(
    private readonly ipv4Service: Ipv4Service,
    private readonly ipv6Service: Ipv6Service,
    private readonly countryService: CountryService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Ip() ipAddress: string): Promise<IpResponseDto> {
    const ip = '188.80.46.81';
    const realIP = ipaddr.process(ip || ipAddress).toString();
    const add = ipaddr.parse(realIP);

    console.log(realIP);
    if (add.kind() === 'ipv4') {
      const asn = await this.ipv4Service.findASN(realIP);
      const city = await this.ipv4Service.findCity(realIP);
      const country = await this.countryService.getCountryByCode(
        city.countryCode,
      );
      return {
        ip: realIP,
        asn: asn.asOrganization,
        city: {
          name: city.city,
          latitude: city.latitude,
          longitude: city.longitude,
        },
        region: city.state1,
        country: country,
        timezone: city.timezone,
      };
    }
    const asn = await this.ipv6Service.findASN(realIP);
    const city = await this.ipv6Service.findCity(realIP);
    const country = await this.countryService.getCountryByCode(
      city.countryCode,
    );
    return {
      ip: realIP,
      asn: asn.asOrganization,
      city: {
        name: city.city,
        latitude: city.latitude,
        longitude: city.longitude,
      },
      region: city.state1,
      country: country,
      timezone: city.timezone,
    };
  }
}
