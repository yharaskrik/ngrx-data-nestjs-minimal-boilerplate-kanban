import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRestComponent } from './board-rest.component';
import { BoardUiModule } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/board/ui';

@NgModule({
  imports: [CommonModule, BoardUiModule],
  declarations: [BoardRestComponent],
  exports: [BoardRestComponent],
})
export class BoardRestModule {}
