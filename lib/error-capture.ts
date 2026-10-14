// Browser environment window stubs / polyfills for window.scrollTo and window.matchMedia
if (typeof window !== 'undefined') {
  if (!window.scrollTo) {
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: () => {},
    });
  }

  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
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
  }
}
