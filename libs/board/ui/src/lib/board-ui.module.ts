import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BoardUiComponent } from './board-ui.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    DragDropModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  declarations: [BoardUiComponent],
  exports: [BoardUiComponent],
})
export class BoardUiModule {}
