import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmarttableComponent } from './smarttable.component';

describe('SmarttableComponent', () => {
  let component: SmarttableComponent;
  let fixture: ComponentFixture<SmarttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmarttableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmarttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
