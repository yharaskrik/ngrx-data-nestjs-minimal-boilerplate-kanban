import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { storySchema } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import {
  ApiStoriesModule,
  ApiStoryModule,
  StoryGateway,
} from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/story';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/minimal-kanban'),
    MongooseModule.forFeature([
      {
        schema: storySchema,
        name: 'Story',
      },
    ]),
    ApiStoryModule,
    ApiStoriesModule,
  ],
  providers: [StoryGateway],
})
export class AppModule {}
