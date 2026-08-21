// analytics.service.ts — Google Analytics (GA4) & Search Keyword Tracking Service for Angular SPA.
import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

declare const gtag: Function | undefined;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly trackingId = 'G-5DZTL5Y8RS';

  /** Initialize automatic SPA page view tracking on router events */
  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const pagePath = event.urlAfterRedirects;
        const pageTitle = this.titleService.getTitle() || document.title;
        this.trackPageView(pagePath, pageTitle);
      });
  }

  /** Send a page_view event to Google Analytics */
  trackPageView(pagePath: string, pageTitle: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', this.trackingId, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  }

  /** Track search keywords and query terms */
  trackSearch(searchTerm: string, resultsCount?: number): void {
    if (typeof gtag !== 'undefined' && searchTerm.trim()) {
      gtag('event', 'search', {
        search_term: searchTerm.trim(),
        results_count: resultsCount,
      });
    }
  }

  /** Track custom user interaction events (CTAs, form submissions, clicks) */
  trackEvent(
    action: string,
    category: string,
    label?: string,
    value?: number,
    additionalParams?: Record<string, unknown>
  ): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...additionalParams,
      });
    }
  }
}
