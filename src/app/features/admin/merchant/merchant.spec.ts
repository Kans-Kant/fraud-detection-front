import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Merchant } from './merchant';

describe('Merchant', () => {
  let component: Merchant;
  let fixture: ComponentFixture<Merchant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Merchant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Merchant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
