import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CommonExceptionsFilter } from './common/filters/common-exceptions.filter';
import { CommonResponseInterceptor } from './common/interceptors/common-response.interceptor';
import { ArticlesModule } from './articles/articles.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('dbConfig'),
      inject: [ConfigService],
    }),
    UsersModule,
    CategoriesModule,
    TagsModule,
    ArticlesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CommonResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CommonExceptionsFilter,
    },
  ],
})
export class AppModule {}
