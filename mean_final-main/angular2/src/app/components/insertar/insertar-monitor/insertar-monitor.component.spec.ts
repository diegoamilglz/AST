import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarMonitorComponent } from './insertar-monitor.component';

describe('InsertarMonitorComponent', () => {
  let component: InsertarMonitorComponent;
  let fixture: ComponentFixture<InsertarMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertarMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertarMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
