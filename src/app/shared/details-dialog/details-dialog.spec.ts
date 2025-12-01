import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDialog } from './details-dialog';

describe('DetailsDialog', () => {
  let component: DetailsDialog;
  let fixture: ComponentFixture<DetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
