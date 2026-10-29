import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PRODUCT_PAGES, ProductPage } from './product-pages.data';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly contactLink = '/contact';

  readonly page: ProductPage | undefined = PRODUCT_PAGES.find(
    (p) => p.slug === this.route.snapshot.data['slug'],
  );
}
