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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'administrator',
      database: 'ip-discovery',
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
