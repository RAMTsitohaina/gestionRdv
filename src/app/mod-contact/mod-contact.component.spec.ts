import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModContactComponent } from './mod-contact.component';

describe('ModContactComponent', () => {
  let component: ModContactComponent;
  let fixture: ComponentFixture<ModContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
