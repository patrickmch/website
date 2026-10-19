/* Progressive enhancement. SVGs and their text descriptions work without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('enhanced');
  const dialog = document.querySelector('#diagram-dialog');
  const mount = dialog.querySelector('.dialog-content');
  let opener;
  let previousOverflow;
  function setup(figure, expanded = false) {
    const viewport = figure.querySelector('.diagram-viewport');
    const stage = figure.querySelector('.diagram-stage');
    const width = Number(figure.dataset.width);
    const output = figure.querySelector('output');
    const minus = figure.querySelector('[data-action="out"]');
    const plus = figure.querySelector('[data-action="in"]');
    let scale = viewport.clientWidth >= 700 ? Math.min(1, viewport.clientWidth / width) : 1;
    function draw(next, preserve = true) {
      const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / scale;
      const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / scale;
      scale = Math.max(.15, Math.min(2, next));
      stage.style.width = `${Math.round(width * scale)}px`;
      output.textContent = `${Math.round(scale * 100)}%`;
      minus.disabled = scale <= .15;
      plus.disabled = scale >= 2;
      if (preserve) {
        viewport.scrollLeft = centerX * scale - viewport.clientWidth / 2;
        viewport.scrollTop = centerY * scale - viewport.clientHeight / 2;
      } else { viewport.scrollLeft = 0; viewport.scrollTop = 0; }
    }
    draw(scale, false);
    figure.querySelector('.diagram-tools').addEventListener('click', event => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      switch (button.dataset.action) {
        case 'in': draw(scale + .2); break;
        case 'out': draw(scale - .2); break;
        case 'actual': draw(1); break;
        case 'fit': draw(Math.min(1, viewport.clientWidth / width), false); break;
        case 'expand': {
          if (expanded) return;
          opener = button;
          const clone = figure.cloneNode(true);
          // The expanded copy must not duplicate IDs or reference the original caption.
          clone.querySelectorAll('[id]').forEach(el => { el.id = `expanded-${el.id}`; });
          clone.querySelectorAll('[aria-labelledby],[aria-describedby]').forEach(el => {
            ['aria-labelledby','aria-describedby'].forEach(attr => {
              if (el.hasAttribute(attr)) el.setAttribute(attr, el.getAttribute(attr).split(' ').map(id => `expanded-${id}`).join(' '));
            });
          });
          clone.querySelectorAll('[marker-end]').forEach(el => el.setAttribute('marker-end', el.getAttribute('marker-end').replace('url(#','url(#expanded-')));
          clone.removeAttribute('aria-labelledby');
          mount.replaceChildren(clone);
          dialog.querySelector('#dialog-title').textContent = figure.querySelector('.diagram-title').textContent;
          previousOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
          dialog.showModal();
          setup(clone, true);
          dialog.querySelector('.dialog-close').focus();
          break;
        }
      }
    });
  }
  document.querySelectorAll('main .figure').forEach(figure => setup(figure));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const stops = [...dialog.querySelectorAll('button:not(:disabled), [tabindex="0"]')]
      .filter(element => element.getClientRects().length > 0);
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    mount.replaceChildren();
    opener?.focus();
  });
})();
