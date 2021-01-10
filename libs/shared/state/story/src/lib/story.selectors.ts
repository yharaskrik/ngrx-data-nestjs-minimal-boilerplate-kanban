import { createSelector } from '@ngrx/store';
import { Stories } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';

export const selectStories = createSelector(
  (stories) => stories,
  (stories: Stories) =>
    stories.reduce<Stories[]>(
      (prev, cur) => {
        prev[cur.column].push(cur);

        prev[cur.column].sort((a, b) => a.order - b.order);

        return prev;
      },
      [[], [], [], []]
    )
);
