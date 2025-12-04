import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEventosComponent } from './detalles-eventos.component';

describe('DetallesEventosComponent', () => {
  let component: DetallesEventosComponent;
  let fixture: ComponentFixture<DetallesEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
