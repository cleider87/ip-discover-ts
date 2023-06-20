import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { GlobalModule } from './common/global.module';
import { IPModule } from './ip/ip.module';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'administrator',
      database: process.env.DB_SCHEMA || 'ip-discovery',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrationsRun: false,
      autoLoadEntities: true,
    }),
    IPModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
