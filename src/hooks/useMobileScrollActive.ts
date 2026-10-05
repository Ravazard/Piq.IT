import { useState, useEffect, useRef, type RefObject } from 'react';

export interface UseMobileScrollActiveOptions {
  disabled?: boolean;
  minPercent?: number;
  maxPercent?: number;
}

export function useMobileScrollActive(
  ref: RefObject<HTMLElement | null>,
  options: UseMobileScrollActiveOptions = {}
): boolean {
  const { disabled = false, minPercent = 0.22, maxPercent = 0.78 } = options;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') {
      setIsActive(false);
      return;
    }

    let ticking = false;

    const checkActive = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const elCenter = rect.top + rect.height / 2;

      const centerInBand = elCenter >= vh * minPercent && elCenter <= vh * maxPercent;
      const spansCenter = rect.top <= vh * 0.45 && rect.bottom >= vh * 0.55;

      const active = centerInBand || spansCenter;
      setIsActive(active);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    checkActive();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref, disabled, minPercent, maxPercent]);

  return isActive;
}

export interface UseMobileCardStateOptions {
  disabled?: boolean;
  minPercent?: number;
  maxPercent?: number;
  initialActive?: boolean;
  isHovered?: boolean;
}

export function useMobileCardState(
  ref: RefObject<HTMLElement | null>,
  isMobile: boolean,
  options: UseMobileCardStateOptions = {}
) {
  const {
    disabled = false,
    minPercent = 0.22,
    maxPercent = 0.78,
    initialActive = false,
    isHovered = false,
  } = options;

  const isScrollActive = useMobileScrollActive(ref, {
    disabled: !isMobile || disabled,
    minPercent,
    maxPercent,
  });

  const [manualOverride, setManualOverride] = useState<boolean | null>(null);
  const prevScrollActiveRef = useRef(isScrollActive);

  useEffect(() => {
    if (!isMobile) {
      setManualOverride(null);
      return;
    }
    if (prevScrollActiveRef.current !== isScrollActive) {
      setManualOverride(null);
      prevScrollActiveRef.current = isScrollActive;
    }
  }, [isScrollActive, isMobile]);

  const isActive = isMobile
    ? (manualOverride !== null ? manualOverride : isScrollActive)
    : (isHovered || (manualOverride !== null ? manualOverride : initialActive));

  const toggle = () => {
    if (isMobile) {
      const current = manualOverride !== null ? manualOverride : isScrollActive;
      setManualOverride(!current);
    } else {
      const current = manualOverride !== null ? manualOverride : initialActive;
      setManualOverride(!current);
    }
  };

  const reset = () => {
    setManualOverride(null);
  };

  return {
    isActive,
    isScrollActive,
    toggle,
    reset,
    setManualActive: setManualOverride,
  };
}
