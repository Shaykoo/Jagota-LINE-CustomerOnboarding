import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyExistComponent } from './already-exist.component';

describe('AlreadyExistComponent', () => {
  let component: AlreadyExistComponent;
  let fixture: ComponentFixture<AlreadyExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyExistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
