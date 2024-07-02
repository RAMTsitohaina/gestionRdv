import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvManageComponent } from './rdv-manage.component';

describe('RdvManageComponent', () => {
  let component: RdvManageComponent;
  let fixture: ComponentFixture<RdvManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
