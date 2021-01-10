import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { storySchema } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import { ApiStoriesController } from './api-stories.controller';
import { ApiStoriesService } from './api-stories.service';

@Module({
  controllers: [ApiStoriesController],
  providers: [ApiStoriesService],
  imports: [
    MongooseModule.forFeature([
      {
        schema: storySchema,
        name: 'Story',
      },
    ]),
  ],
})
export class ApiStoriesModule {}
