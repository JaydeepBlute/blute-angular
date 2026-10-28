import { Component, ElementRef, OnDestroy, computed, effect, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import lottie, { AnimationItem } from 'lottie-web';
import { CRM_FLOWS, CRM_GUIDES, CrmFlow, CrmGuide } from './arlikat-crm-flows.data';
import { FlowScene } from './arlikat-crm-flow-scene';
import { GuideScene } from './arlikat-crm-guide-scene';

const SPEAK_DELAY_MS = 900;

@Component({
  selector: 'app-arlikat-crm-flow',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './arlikat-crm-flow.component.html',
  styleUrls: ['./arlikat-crm-flow.component.scss'],
})
export class ArlikatCrmFlowComponent implements OnDestroy {
  readonly overviewLink = '/products/arlikat-crm';
  readonly contactLink = '/contact';
  readonly flows = CRM_FLOWS;

  readonly flow = toSignal(
    inject(ActivatedRoute).paramMap.pipe(
      map((params): CrmFlow | undefined => CRM_FLOWS.find((f) => f.slug === params.get('slug')))
    )
  );
  readonly activeIndex = signal(0);
  readonly speaking = signal(false);
  readonly voiceOn = signal(false);
  readonly guide = computed((): CrmGuide | undefined => CRM_GUIDES[this.flow()?.slug ?? '']);

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('flowCanvas');
  private readonly guideCanvasRef = viewChild<ElementRef<HTMLCanvasElement>>('guideCanvas');
  private readonly dotsRef = viewChild<ElementRef<HTMLElement>>('typingDots');
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private scene?: FlowScene;
  private guideScene?: GuideScene;
  private dots?: AnimationItem;
  private speakTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const flow = this.flow();
      const canvas = this.canvasRef()?.nativeElement;
      this.scene?.dispose();
      this.scene = undefined;
      this.activeIndex.set(0);
      if (!flow || !canvas) return;
      this.scene = new FlowScene(canvas, flow.steps, this.reducedMotion, (i) => this.select(i));
    });

    effect(() => {
      const guide = this.guide();
      const canvas = this.guideCanvasRef()?.nativeElement;
      this.guideScene?.dispose();
      this.guideScene = undefined;
      if (!guide || !canvas) return;
      this.guideScene = new GuideScene(canvas, guide, this.reducedMotion);
    });

    effect(() => {
      const container = this.dotsRef()?.nativeElement;
      this.dots?.destroy();
      this.dots = container
        ? lottie.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: true, path: '/lottie/typing.json' })
        : undefined;
    });
  }

  select(index: number): void {
    this.activeIndex.set(index);
    this.scene?.setActive(index);
    const steps = this.flow()?.steps ?? [];
    clearTimeout(this.speakTimer);
    window.speechSynthesis?.cancel();
    this.speaking.set(!this.reducedMotion);
    this.speakTimer = setTimeout(() => {
      this.speaking.set(false);
      this.speakAloud(steps[index]?.detail);
    }, SPEAK_DELAY_MS);
  }

  toggleVoice(): void {
    this.voiceOn.update((on) => !on);
    window.speechSynthesis?.cancel();
  }

  private speakAloud(text: string | undefined): void {
    if (!this.voiceOn() || !text || !window.speechSynthesis) return;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }

  step(delta: number, count: number): void {
    this.select(Math.min(count - 1, Math.max(0, this.activeIndex() + delta)));
  }

  ngOnDestroy(): void {
    clearTimeout(this.speakTimer);
    window.speechSynthesis?.cancel();
    this.dots?.destroy();
    this.guideScene?.dispose();
    this.scene?.dispose();
  }
}
