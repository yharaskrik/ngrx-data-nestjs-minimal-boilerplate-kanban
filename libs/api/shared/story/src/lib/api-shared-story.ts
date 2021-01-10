import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Story } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { Document } from 'mongoose';

export type StoryDocument = Story & Document;

@Schema()
export class StorySchema {
  @Prop({ default: () => Date.now().toString() })
  id: string;

  @Prop({ default: '' })
  title: string;

  @Prop()
  column: number;

  @Prop()
  order: number;

  @Prop({ default: '' })
  description: string;
}

export const storySchema = SchemaFactory.createForClass(StorySchema);
