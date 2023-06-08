import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async getCountryByCode(countryCode: string): Promise<Country> {
    return this.countryRepository.findOneBy({
      country: countryCode,
    });
  }
}
