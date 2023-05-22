import { Module } from '@nestjs/common';
import { Ipv4Controller } from './controllers/ipv4.controller';
import { Ipv4Service } from './services/ipv4.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsnIpv4 } from './entities/asn-ipv4.entity';
import { CitiesIpv4 } from './entities/city-ipv4.entity';

const repositories = TypeOrmModule.forFeature([AsnIpv4, CitiesIpv4]);

@Module({
  imports: [repositories],
  controllers: [Ipv4Controller],
  providers: [Ipv4Service],
  exports: [repositories],
})
export class IPModule {}
