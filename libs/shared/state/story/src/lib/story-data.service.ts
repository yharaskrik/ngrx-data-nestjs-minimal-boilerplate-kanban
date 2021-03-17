import { Injectable } from '@angular/core';
import { Story } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select } from '@ngrx/store';
import { selectStories } from './story.selectors';

@Injectable({
  providedIn: 'root',
})
export class StoryDataService extends EntityCollectionServiceBase<Story> {
  groupedStories$ = this.entities$.pipe(select(selectStories));

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Story', serviceElementsFactory);
  }
}
