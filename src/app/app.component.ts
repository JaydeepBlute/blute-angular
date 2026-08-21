import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { FooterComponent } from './footer/footer.component';
import { Navbar } from './navbar/navbar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { GlobalParticlesComponent } from './global-particles/global-particles.component';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, Navbar, ChatbotComponent, GlobalParticlesComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-chatbot></app-chatbot>
    <app-global-particles></app-global-particles>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private doc: Document,
    private analyticsService: AnalyticsService,
  ) {}

  ngOnInit(): void {
    this.analyticsService.init();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const path = e.urlAfterRedirects.split('?')[0].split('#')[0];
        this.setCanonical(`https://blute.org${path}`);
      });
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
