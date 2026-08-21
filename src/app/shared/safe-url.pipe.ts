import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true,
})
export class SafeUrlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(url?: string | null): SafeResourceUrl | null {
    if (!url) return null;
    let embedUrl = url;
    if (!embedUrl.includes('/embed/')) {
      const match = embedUrl.match(/urn:li:(share|ugcPost):\d+/);
      if (match) {
        embedUrl = `https://www.linkedin.com/embed/feed/update/${match[0]}`;
      } else {
        return null;
      }
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
