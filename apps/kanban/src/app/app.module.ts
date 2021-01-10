import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardRestModule } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/board/rest';
import { BoardWsModule } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/board/ws';
import { storyEntityMetadata } from '@ngrx-data-nestjs-minimal-boilerplate-kanban/shared/state/story';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgrxDataWebsocketClientModule } from '@trellisorg/ngrx-data-websocket-client';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    HttpClientJsonpModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({
      entityMetadata: {
        Story: storyEntityMetadata,
      },
      pluralNames: {
        Story: 'stories',
      },
    }),
    NgrxDataWebsocketClientModule.forRoot({
      host: 'http://localhost:80',
    }),
    BoardRestModule,
    BoardWsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
