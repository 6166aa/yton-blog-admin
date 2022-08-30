import { Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { QueryPipe } from '@/base/pipes/query.pipe';
import { QueryUserDto } from './dto/query-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query(new QueryPipe<User>(User)) queryUserDto: QueryUserDto) {
    return this.usersService.findAll(queryUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnUserDto> {
    const res = await this.usersService.findOne({ id });
    return plainToClass(ReturnUserDto, res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
