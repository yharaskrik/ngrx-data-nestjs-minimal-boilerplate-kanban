import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoryDocument } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/api/shared/story';
import {
  CreateStoryDto,
  DeleteStoryDto,
  UpdateStoryDto,
} from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { Model } from 'mongoose';

@Injectable()
export class ApiStoryService {
  constructor(@InjectModel('Story') private storyModel: Model<StoryDocument>) {}

  add(story: CreateStoryDto): Promise<StoryDocument> {
    return this.storyModel.create({ ...story, id: Date.now().toString() });
  }

  update(story: UpdateStoryDto): Promise<StoryDocument> {
    return this.storyModel
      .findOneAndUpdate({ id: story.id }, story, { new: true })
      .exec();
  }

  async delete(id: DeleteStoryDto): Promise<string> {
    const deleted = await this.storyModel.findOneAndDelete({ id });

    if (deleted) {
      return id;
    }

    throw new NotFoundException();
  }
}
