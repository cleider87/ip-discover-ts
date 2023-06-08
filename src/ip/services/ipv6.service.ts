import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitiesIpv6 } from '../entities';
import { AsnIpv6 } from '../entities/asn-ipv6.entity';

@Injectable()
export class Ipv6Service {
  constructor(
    @InjectRepository(AsnIpv6)
    private asnIpv6Repository: Repository<AsnIpv6>,
    @InjectRepository(CitiesIpv6)
    private citiesIpv6Repository: Repository<CitiesIpv6>,
  ) {}

  async findASN(ipv6: string) {
    return this.asnIpv6Repository
      .createQueryBuilder('asn_ipv6')
      .select()
      .where(':ipv6 BETWEEN ip_range_start AND ip_range_end', { ipv6 })
      .getOne();
  }

  async findCity(ipv6: string) {
    return this.citiesIpv6Repository
      .createQueryBuilder('cities_ipv6')
      .select()
      .where(':ipv6 BETWEEN ip_range_start AND ip_range_end', { ipv6 })
      .getOne();
  }
}
