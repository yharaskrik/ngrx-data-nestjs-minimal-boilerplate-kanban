export interface Story {
  id?: string;
  order: number;
  column: number;
  title: string;
  description: string;
}

export type Stories = Story[];

export type CreateStoryDto = Partial<Omit<Story, 'id'>>;

export type UpdateStoryDto = Required<Pick<Story, 'id'>> &
  Partial<Omit<Story, 'id'>>;

export type DeleteStoryDto = string;
