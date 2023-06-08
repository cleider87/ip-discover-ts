import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cities_ipv6' })
export class CitiesIpv6 {
  //ip_range_start, ip_range_end, country_code, state1, state2, city, postcode, latitude, longitude, timezone
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'inet', name: 'ip_range_start' })
  ipRangeStart: string;

  @Column({ type: 'inet', name: 'ip_range_end' })
  ipRangeEnd: string;

  @Column({ type: 'varchar', length: 2, name: 'country_code' })
  countryCode: string;

  @Column({ type: 'varchar', nullable: true })
  state1: string;

  @Column({ type: 'varchar', nullable: true })
  state2: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  postcode: string;

  @Column({ type: 'varchar', nullable: true })
  latitude: string;

  @Column({ type: 'varchar', nullable: true })
  longitude: string;

  @Column({ type: 'varchar' })
  timezone: string;
}
