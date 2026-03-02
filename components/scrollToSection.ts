/**
 * scrollToSection.ts
 *
 * @react-three/drei's <ScrollControls> captures scroll inside its own
 * internal <div style="overflow-y: scroll"> container — NOT the browser window.
 *
 * Calling element.scrollIntoView() or window.scrollTo() completely bypasses
 * that container, desynchronising scroll.offset (used by the 3D scene) from
 * the HTML content position — causing the model to appear in the wrong place.
 *
 * This utility scrolls the ScrollControls container directly, keeping the
 * 3D model and HTML content in perfect sync at all times.
 */

/** Find the ScrollControls scroll div (the one that is overflow: scroll/auto) */
/**
 * scrollToSection.ts
 */

export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  const container = (window as any).__SCROLL_EL__;
  if (container) {
    // getBoundingClientRect().top gives position relative to viewport.
    // By adding container.scrollTop and subtracting container's own top, 
    // we get the absolute correct scroll position within the Drei container.
    const targetTop = target.getBoundingClientRect().top + container.scrollTop - container.getBoundingClientRect().top;
    
    // Smooth scroll the internal Drei container, NOT the browser window
    container.scrollTo({ top: targetTop, behavior: 'smooth' });
  } else {
    console.warn("Drei scroll container not found on window.__SCROLL_EL__");
  }
}

export function scrollToTop(): void {
  const container = (window as any).__SCROLL_EL__;
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
