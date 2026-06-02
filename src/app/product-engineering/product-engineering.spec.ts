import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEngineering } from './product-engineering';

describe('ProductEngineering', () => {
  let component: ProductEngineering;
  let fixture: ComponentFixture<ProductEngineering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEngineering]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEngineering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
