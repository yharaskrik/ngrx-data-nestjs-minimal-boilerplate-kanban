import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { StoryDocument } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import {
  CreateStoryDto,
  DeleteStoryDto,
  UpdateStoryDto,
} from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { ApiStoryService } from './api-story.service';

@Controller('story')
export class ApiStoryController {
  constructor(private apiStoryService: ApiStoryService) {}

  @Post('')
  add(@Body() story: CreateStoryDto): Promise<StoryDocument> {
    return this.apiStoryService.add(story);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() story: UpdateStoryDto
  ): Promise<StoryDocument> {
    return this.apiStoryService.update({
      ...story,
      id,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: DeleteStoryDto): Promise<string> {
    return this.apiStoryService.delete(id);
  }
}
