import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardRestComponent } from './board-rest.component';

describe('BoardRestComponent', () => {
  let component: BoardRestComponent;
  let fixture: ComponentFixture<BoardRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardRestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
