import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClient } from './update-client';

describe('UpdateClient', () => {
  let component: UpdateClient;
  let fixture: ComponentFixture<UpdateClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
