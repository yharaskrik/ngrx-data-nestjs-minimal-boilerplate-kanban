import { Injectable } from '@angular/core';
import { Story } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { select } from '@ngrx/store';
import {
  SocketCollectionServiceBase,
  SocketServiceElementsFactory,
} from '@trellisorg/ngrx-data-websocket-client';
import { selectStories } from './story.selectors';

@Injectable({
  providedIn: 'root',
})
export class StoryWsDataService extends SocketCollectionServiceBase<Story> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    socketServiceElementsFactory: SocketServiceElementsFactory<Story>
  ) {
    super('Story', serviceElementsFactory, socketServiceElementsFactory);
  }

  groupedStories$ = this.entities$.pipe(select(selectStories));
}
