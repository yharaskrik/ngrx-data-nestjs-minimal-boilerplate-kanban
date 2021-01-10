import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoryDocument } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import { Story } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { Model } from 'mongoose';

@Injectable()
export class ApiStoriesService {
  constructor(@InjectModel('Story') private storyModel: Model<StoryDocument>) {}

  getAll(): Promise<StoryDocument[]> {
    return this.storyModel.find().exec();
  }

  getWithQuery(query: Partial<Story>): Promise<StoryDocument[]> {
    return this.storyModel.find(query).exec();
  }
}
