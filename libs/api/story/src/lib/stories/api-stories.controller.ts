import { Controller, Get, Query } from '@nestjs/common';
import { Story } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { StoryDocument } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import { ApiStoriesService } from './api-stories.service';

@Controller('stories')
export class ApiStoriesController {
  constructor(private apiStoriesService: ApiStoriesService) {}

  @Get('')
  query(@Query() query: Partial<Story>): Promise<StoryDocument[]> {
    if (Object.keys(query || {}).length === 0) {
      return this.apiStoriesService.getAll();
    }

    return this.apiStoriesService.getWithQuery(query);
  }
}
