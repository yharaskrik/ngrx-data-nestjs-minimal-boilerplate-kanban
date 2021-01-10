import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardRestComponent } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/board/rest';
import { BoardWsComponent } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/board/ws';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'rest',
          component: BoardRestComponent,
        },
        {
          path: 'ws',
          component: BoardWsComponent,
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
