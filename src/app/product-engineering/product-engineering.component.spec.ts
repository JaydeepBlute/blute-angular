import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEngineeringComponent } from './product-engineering.component';

describe('ProductEngineeringComponent', () => {
  let component: ProductEngineeringComponent;
  let fixture: ComponentFixture<ProductEngineeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEngineeringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEngineeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
