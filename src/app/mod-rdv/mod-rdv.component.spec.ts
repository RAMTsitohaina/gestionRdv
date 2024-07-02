import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRdvComponent } from './mod-rdv.component';

describe('ModRdvComponent', () => {
  let component: ModRdvComponent;
  let fixture: ComponentFixture<ModRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModRdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
