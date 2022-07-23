import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductnavComponent } from './addproductnav.component';

describe('AddproductnavComponent', () => {
  let component: AddproductnavComponent;
  let fixture: ComponentFixture<AddproductnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductnavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
