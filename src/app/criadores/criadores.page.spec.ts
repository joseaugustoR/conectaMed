import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriadoresPage } from './criadores.page';

describe('CriadoresPage', () => {
  let component: CriadoresPage;
  let fixture: ComponentFixture<CriadoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
