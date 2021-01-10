import { Component, OnInit } from '@angular/core';
import {
  DeleteStoryDto,
  Stories,
  Story,
  UpdateStoryDto,
} from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';
import { StoryWsDataService } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/state/story';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngrx-data-nestjs-minimal-boilerplate-kanban-board-ws',
  templateUrl: './board-ws.component.html',
  styleUrls: ['./board-ws.component.scss'],
})
export class BoardWsComponent implements OnInit {
  stories$: Observable<Stories[]> = this.storyWsDataService.groupedStories$;

  constructor(private storyWsDataService: StoryWsDataService) {}

  ngOnInit(): void {
    this.storyWsDataService.connect({});
    this.storyWsDataService.getAll();
  }

  add(story: Story): void {
    this.storyWsDataService.add(story, { isOptimistic: false });
  }

  update(story: UpdateStoryDto): void {
    this.storyWsDataService.update(story, { isOptimistic: true });
  }

  loadAll(): void {
    this.storyWsDataService.getAll();
  }

  delete(id: DeleteStoryDto): void {
    this.storyWsDataService.delete(id);
  }
}
