import { Get, Post, Body, Patch, Param, Delete, Query, UsePipes } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { QueryPipe } from '@/base/pipes/query.pipe';
import { QueryTagDto } from './dto/query-tag.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
  @Get()
  findAll(@Query(new QueryPipe<Tag>(Tag)) queryPaginatedDto: QueryTagDto) {
    return this.tagsService.findAll(queryPaginatedDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateTagDto) {
    return this.tagsService.update(id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
  @Get('/test')
  test() {
    return this.tagsService.test();
  }
}
