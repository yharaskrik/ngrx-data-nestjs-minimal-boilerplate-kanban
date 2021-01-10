import { Component } from '@angular/core';
import {
  DeleteStoryDto,
  Stories,
  Story,
  UpdateStoryDto,
} from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { StoryDataService } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/state/story';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngrx-data-nestjs-minimal-boilerplate-kanban-board-rest',
  templateUrl: './board-rest.component.html',
  styleUrls: ['./board-rest.component.scss'],
})
export class BoardRestComponent {
  stories$: Observable<Stories[]> = this.storyDataService.groupedStories$;

  constructor(private storyDataService: StoryDataService) {
    this.storyDataService.getAll();
  }

  add(story: Story): void {
    this.storyDataService.add(story, { isOptimistic: false });
  }

  update(story: UpdateStoryDto): void {
    this.storyDataService.update(story, { isOptimistic: true });
  }

  loadAll(): void {
    this.storyDataService.getAll();
  }

  delete(id: DeleteStoryDto): void {
    this.storyDataService.delete(id);
  }
}
