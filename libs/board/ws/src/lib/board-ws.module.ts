import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardUiModule } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/board/ui';
import { BoardWsComponent } from './board-ws.component';

@NgModule({
  imports: [CommonModule, BoardUiModule],
  declarations: [BoardWsComponent],
  exports: [BoardWsComponent],
})
export class BoardWsModule {}
