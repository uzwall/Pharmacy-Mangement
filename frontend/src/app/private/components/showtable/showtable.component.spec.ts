import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtableComponent } from './showtable.component';

describe('ShowtableComponent', () => {
  let component: ShowtableComponent;
  let fixture: ComponentFixture<ShowtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
