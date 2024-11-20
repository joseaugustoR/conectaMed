import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultUserPage } from './consult-user.page';

describe('ConsultUserPage', () => {
  let component: ConsultUserPage;
  let fixture: ComponentFixture<ConsultUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
