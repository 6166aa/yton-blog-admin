import { Module } from '@nestjs/common';
import { BaseModule } from './base/base.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    BaseModule,
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('dbConfig'),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
