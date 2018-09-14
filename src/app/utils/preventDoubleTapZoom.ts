export function preventDoubleTapZoom() {
  // for iOS
  window.addEventListener('ongesturestart', (e: Event) => {
    e.preventDefault();
  });
}
