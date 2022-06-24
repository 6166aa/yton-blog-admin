import { Get, Post, Body, Patch, Param, Delete, Query, UsePipes } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { QueryPipe } from '@/base/pipes/query.pipe';
import { QueryArticleDto } from './dto/query-article.dto';
@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly categoriesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.categoriesService.create(createArticleDto);
  }

  @Get()
  findAll(@Query(new QueryPipe<Article>(Article)) queryPaginatedDto: QueryArticleDto) {
    return this.categoriesService.findAll(queryPaginatedDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateArticleDto) {
    return this.categoriesService.update(id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
