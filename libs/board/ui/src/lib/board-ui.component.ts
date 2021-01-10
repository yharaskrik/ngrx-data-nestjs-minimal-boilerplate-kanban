import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DeleteStoryDto,
  Stories,
  Story,
  UpdateStoryDto,
} from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/type/story';

@Component({
  selector: 'ngrx-data-nestjs-minimal-boilerplate-kanban-board-ui',
  templateUrl: './board-ui.component.html',
  styleUrls: ['./board-ui.component.scss'],
})
export class BoardUiComponent {
  @Input() stories: Stories[];

  @Output() loadAll = new EventEmitter<void>();

  @Output() add = new EventEmitter<Story>();

  @Output() delete = new EventEmitter<DeleteStoryDto>();

  @Output() update = new EventEmitter<UpdateStoryDto>();

  addNew(column: number, stories: Stories): void {
    this.add.emit({
      order: stories.length,
      column,
      title: `Order ${stories.length} Column ${column}`,
      description: '',
    });
  }

  dropStory(event: CdkDragDrop<Stories, Story>, column: number): void {
    this.update.emit({
      column,
      order: event.currentIndex,
      id: event.item.data.id,
    });
  }

  updateStory(story: Story, title: string): void {
    this.update.emit({
      id: story.id,
      title,
    });
  }
}
