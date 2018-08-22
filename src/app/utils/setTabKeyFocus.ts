import { resetInputFocus } from 'app/styles';
import { css } from 'emotion';

export const focusFree = css({
  '*': resetInputFocus
});

function addFocusOnTabKeyup(element: HTMLElement) {
  window.addEventListener('keyup', (event) => {
    const code = event.keyCode || event.which;
    if (Number(code) === 9) {
      element.classList.remove(focusFree);
    }
  });
}

function removeFocusOnMouseDown(element: HTMLElement) {
  window.addEventListener('mousedown', () => {
    element.classList.add(focusFree);
  });
}

export function setTabKeyFocus() {
  window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }
    body.classList.add(focusFree);
    addFocusOnTabKeyup(body);
    removeFocusOnMouseDown(body);
  });
}
