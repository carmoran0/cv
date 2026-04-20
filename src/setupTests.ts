import "@testing-library/jest-dom/vitest";
import "./i18n/i18n";

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
