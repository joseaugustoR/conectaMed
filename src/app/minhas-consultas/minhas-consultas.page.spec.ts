import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasConsultasPage } from './minhas-consultas.page';

describe('MinhasConsultasPage', () => {
  let component: MinhasConsultasPage;
  let fixture: ComponentFixture<MinhasConsultasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasConsultasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
