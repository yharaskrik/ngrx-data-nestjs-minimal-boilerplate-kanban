import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { storySchema } from './api-shared-story';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: storySchema,
        name: 'Story',
      },
    ]),
  ],
})
export class ApiSharedStoryModule {}
