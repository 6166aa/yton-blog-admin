import { Get, Post, Body, Patch, Param, Delete, Query, UsePipes } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { QueryPipe } from '@/base/pipes/query.pipe';
import { QueryCategoryDto } from './dto/query-tag.dto';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query(new QueryPipe<Category>(Category)) queryPaginatedDto: QueryCategoryDto) {
    return this.categoriesService.findAll(queryPaginatedDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
