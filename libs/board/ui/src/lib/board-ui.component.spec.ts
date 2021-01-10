import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUiComponent } from './board-ui.component';

describe('BoardUiComponent', () => {
  let component: BoardUiComponent;
  let fixture: ComponentFixture<BoardUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardUiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
