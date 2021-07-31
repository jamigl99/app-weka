import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleClusterComponent } from './detalle-cluster.component';

describe('DetalleClusterComponent', () => {
  let component: DetalleClusterComponent;
  let fixture: ComponentFixture<DetalleClusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleClusterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleClusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
