import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitiesIpv4 } from '../entities';
import { AsnIpv4 } from '../entities/asn-ipv4.entity';

@Injectable()
export class Ipv4Service {
  constructor(
    @InjectRepository(AsnIpv4)
    private asnIpv4Repository: Repository<AsnIpv4>,
    @InjectRepository(CitiesIpv4)
    private citiesIpv4Repository: Repository<CitiesIpv4>,
  ) {}

  async findASN(ipv4: string) {
    return this.asnIpv4Repository
      .createQueryBuilder('asn_ipv4')
      .select()
      .where(':ipv4 BETWEEN ip_range_start AND ip_range_end', { ipv4 })
      .getOne();
  }

  async findCity(ipv4: string) {
    return this.citiesIpv4Repository
      .createQueryBuilder('cities_ipv4')
      .select()
      .where(':ipv4 BETWEEN ip_range_start AND ip_range_end', { ipv4 })
      .getOne();
  }
}
