import { Country } from '../entities';

export interface IpResponseDto {
  ip: string;
  asn: string;
  city: {
    name: string;
    latitude: string;
    longitude: string;
  };
  region: string;
  country: Country;
  timezone: string;
}
