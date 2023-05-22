import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'asn_ipv4' })
export class AsnIpv4 {
  //ip_range_start,ip_range_end,as_number,as_organization
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'inet', name: 'ip_range_start' })
  ipRangeStart: string;

  @Column({ type: 'inet', name: 'ip_range_end' })
  ipRangeEnd: string;

  @Column({ type: 'int', name: 'as_number' })
  asNumber: number;

  @Column({ type: 'varchar', name: 'as_organization' })
  asOrganization: string;
}
