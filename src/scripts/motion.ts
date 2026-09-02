/* =========================================================================
   Motion system — one small vocabulary, applied richly to the hero and
   sparingly everywhere else. Built on the already-installed `motion` package.

   Vocabulary
   ----------
   • text      → masked bottom-to-top reveal: translateY(110%) → 0 inside an
                 overflow-hidden `.reveal-mask`. Logical lines, subtle stagger.
                 Never per-character.
   • editorial → directional clip reveal, uncovered from the RIGHT edge toward
                 the left (clip-path inset-left 100% → 0), with a faint scale
                 settle on the image itself.
   • micro     → small controlled transforms (the accent rule drawing in; the
                 CTA arrow nudge, which is pure CSS).

   Easing: [0.22, 1, 0.36, 1] everywhere. Durations are tuned per concept and
   scaled down on tablet/mobile.

   Safety: every "from" state is applied by JS only. With JS disabled or
   prefers-reduced-motion set, the CSS resting state IS the final state —
   nothing stays hidden, clipped, faded or offset.
   ========================================================================= */
import { animate, inView, stagger } from 'motion';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const canMotion = (): boolean =>
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const width = (): number => (typeof window === 'undefined' ? 1280 : window.innerWidth);

/* Tablet keeps the character with slightly shorter time; mobile is quick. */
const timeScale = (): number => (width() <= 768 ? 0.7 : width() <= 1024 ? 0.86 : 1);

const nodes = (t: string | Element | Element[] | NodeListOf<Element>): HTMLElement[] => {
  if (typeof t === 'string') return Array.from(document.querySelectorAll<HTMLElement>(t));
  if (t instanceof Element) return [t as HTMLElement];
  return Array.from(t as ArrayLike<Element>) as HTMLElement[];
};

type Opts = { duration?: number; delay?: number; ease?: unknown; staggerBy?: number };

/* ---------- text: masked bottom-to-top ---------- */
export function maskReveal(
  target: string | Element | Element[],
  { duration = 0.6, delay = 0, ease = EASE, staggerBy = 0 }: Opts = {},
): void {
  if (!canMotion()) return;
  const inners = nodes(target);
  if (!inners.length) return;

  const from = width() <= 768 ? 122 : 110; // % of own height — clipped by the mask
  try {
    animate(
      inners,
      { transform: [`translateY(${from}%)`, 'translateY(0%)'] },
      {
        duration: duration * timeScale(),
        delay: staggerBy
          ? stagger(staggerBy * timeScale(), { startDelay: delay })
          : delay,
        ease: ease as never,
      },
    );
  } catch {
    inners.forEach((el) => {
      el.style.transform = 'translateY(0%)';
    });
  }
}

/* ---------- editorial: clip reveal, right edge → left ---------- */
export function imageRevealRightToLeft(
  target: string | Element | Element[],
  { duration = 0.95, delay = 0, ease = EASE, settle = true }: Opts & { settle?: boolean } = {},
): void {
  if (!canMotion()) return;
  const els = nodes(target);
  if (!els.length) return;

  els.forEach((el) => {
    try {
      animate(
        el,
        { '--reveal': [100, 0] } as never,
        { duration: duration * timeScale(), delay, ease: ease as never },
      );
      if (settle) {
        const img = el.querySelector('img');
        if (img) {
          animate(
            img,
            { scale: [1.06, 1] },
            { duration: (duration + 0.2) * timeScale(), delay, ease: ease as never },
          );
        }
      }
    } catch {
      el.style.setProperty('--reveal', '0');
    }
  });
}

/* ---------- calm scroll entrances (the "rest of site") ----------

   These pre-set the "from" state on ALL targets up front (on script load), then
   animate each to its resting state when it scrolls in. Applying the hidden
   state only at trigger time makes an element blink (visible → hidden → reveal),
   because the trigger fires exactly as the element enters view — so the "from"
   state must be applied before then. */

const clearInline = (els: HTMLElement[]): void => {
  els.forEach((el) => {
    el.style.opacity = '';
    el.style.transform = '';
  });
};

/* Fire `fn` once, the first time `el` enters the viewport; a failsafe timer
   guarantees it also fires if the observer never does. */
function onceInView(el: HTMLElement, fn: () => void, failMs = 2600): void {
  let done = false;
  let stop: VoidFunction | undefined;
  const run = () => {
    if (done) return;
    done = true;
    window.clearTimeout(timer);
    stop?.();
    fn();
  };
  const timer = window.setTimeout(run, failMs);
  stop = inView(el, run, { amount: 0.2, margin: '0px 0px -12% 0px' as never });
}

const prepHide = (els: HTMLElement[], dist: number): void => {
  els.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = `translateY(${dist}px)`;
  });
};

function animateIn(
  els: HTMLElement[],
  dist: number,
  { duration = 0.6, staggerBy = 0 }: { duration?: number; staggerBy?: number } = {},
): void {
  try {
    animate(
      els,
      { opacity: [0, 1], transform: [`translateY(${dist}px)`, 'translateY(0px)'] },
      {
        duration: duration * timeScale(),
        delay: staggerBy ? stagger(staggerBy * timeScale()) : 0,
        ease: EASE as never,
      },
    );
  } catch {
    clearInline(els);
  }
}

/** Whole group reveals together (subtle stagger) when the first item scrolls in. */
export function revealItemsOnScroll(
  selector: string,
  { staggerBy = 0.07, y = 12 }: { staggerBy?: number; y?: number } = {},
): void {
  if (!canMotion()) return;
  const els = nodes(selector);
  if (!els.length) return;

  const dist = width() <= 768 ? Math.min(y, 9) : y;
  try {
    prepHide(els, dist);
    onceInView(els[0], () => animateIn(els, dist, { staggerBy }));
  } catch {
    clearInline(els);
  }
}

/** Each item reveals individually as it scrolls in — for items spread down a
    tall section (ProfilSection). Smooth, no blink: all hidden up front. */
export function revealEachOnScroll(
  selector: string,
  { y = 12, duration = 0.6 }: { y?: number; duration?: number } = {},
): void {
  if (!canMotion()) return;
  const els = nodes(selector);
  if (!els.length) return;

  const dist = width() <= 768 ? Math.min(y, 9) : y;
  try {
    prepHide(els, dist);
    els.forEach((el) => onceInView(el, () => animateIn([el], dist, { duration })));
  } catch {
    clearInline(els);
  }
}

/** Editorial image: directional clip reveal when it scrolls in (pre-clipped). */
export function revealImageOnScroll(selector: string): void {
  if (!canMotion()) return;
  const els = nodes(selector);
  if (!els.length) return;

  try {
    els.forEach((el) => el.style.setProperty('--reveal', '100'));
    els.forEach((el) =>
      onceInView(el, () => imageRevealRightToLeft(el, { duration: 0.9 })),
    );
  } catch {
    els.forEach((el) => el.style.setProperty('--reveal', '0'));
  }
}

/* ---------- the hero: a deliberate, overlapping sequence ---------- */
export function revealHero(): void {
  if (!canMotion()) return;
  const s = timeScale();

  // 1 · header settles in
  const header = document.querySelector<HTMLElement>('.site-header');
  if (header) {
    try {
      animate(
        header,
        { opacity: [0, 1], transform: ['translateY(-8px)', 'translateY(0px)'] },
        { duration: 0.42 * s, ease: EASE as never },
      );
    } catch {
      header.style.opacity = '1';
    }
  }

  // 2 · bronze accent rule draws in from the left
  try {
    animate(
      '.hero__rule',
      { transform: ['scaleX(0)', 'scaleX(1)'], opacity: [0, 1] },
      { duration: 0.5 * s, delay: 0.14, ease: EASE as never },
    );
  } catch {
    /* CSS resting state = drawn */
  }

  // 3 · hero copy lines rise through their masks (slight stagger)
  maskReveal('[data-hero-copy] .reveal-mask__inner', {
    duration: 0.58,
    delay: 0.22,
    staggerBy: 0.085,
  });

  // 4 · hero image is uncovered from the right edge toward the left (overlaps the
  //     copy; kept early so it doesn't hold back LCP)
  imageRevealRightToLeft('.hero__media', { duration: 0.85, delay: 0.2 });

  // 5 · CTA rises into place
  maskReveal('[data-hero-cta] > a', { duration: 0.54, delay: 0.48 });

  // 6 · the large statement rises through its mask
  maskReveal('[data-hero-statement-inner]', { duration: 0.8, delay: 0.52 });
}
