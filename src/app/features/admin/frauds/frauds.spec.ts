import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frauds } from './frauds';

describe('Frauds', () => {
  let component: Frauds;
  let fixture: ComponentFixture<Frauds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frauds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Frauds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
