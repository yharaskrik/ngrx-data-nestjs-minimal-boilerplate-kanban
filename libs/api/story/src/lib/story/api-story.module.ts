import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { storySchema } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import { ApiStoryController } from './api-story.controller';
import { ApiStoryService } from './api-story.service';

@Module({
  controllers: [ApiStoryController],
  providers: [ApiStoryService],
  imports: [
    MongooseModule.forFeature([
      {
        schema: storySchema,
        name: 'Story',
      },
    ]),
  ],
})
export class ApiStoryModule {}
