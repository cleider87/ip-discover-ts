import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ipv4Controller } from './controllers/ip.controller';
import { AsnIpv4, AsnIpv6, CitiesIpv4, CitiesIpv6, Country } from './entities';
import { CountryService } from './services/country.service';
import { Ipv4Service } from './services/ipv4.service';
import { Ipv6Service } from './services/ipv6.service';

const repositories = TypeOrmModule.forFeature([
  Country,
  AsnIpv4,
  CitiesIpv4,
  AsnIpv6,
  CitiesIpv6,
]);

@Module({
  imports: [repositories],
  controllers: [Ipv4Controller],
  providers: [Ipv4Service, Ipv6Service, CountryService],
  exports: [repositories],
})
export class IPModule {}
