/* Hover, click, touch and keyboard support for the same menu structure. */
(() => {
  'use strict';
  const nav = document.querySelector('.desktop-nav');
  const header = document.querySelector('.site-header');
  const scrim = document.querySelector('.nav-scrim');
  if (!nav || !header || !scrim) return;
  const groups = [...nav.querySelectorAll('.nav-dropdown')];
  const desktop = matchMedia('(min-width: 901px)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  let timer;
  const panel = trigger => document.getElementById(trigger.getAttribute('aria-controls'));
  const children = list => [...list.children].map(li => li.querySelector('a,button')).filter(Boolean);
  function reset(group) {
    group.querySelectorAll('[aria-expanded]').forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
      panel(trigger).hidden = true;
    });
  }
  function close() {
    clearTimeout(timer);
    groups.forEach(reset);
    scrim.hidden = true;
  }
  function openTop(group) {
    if (!desktop.matches) return;
    clearTimeout(timer);
    groups.filter(other => other !== group).forEach(reset);
    const trigger = group.querySelector('.nav-trigger');
    trigger.setAttribute('aria-expanded', 'true');
    panel(trigger).hidden = false;
    scrim.style.top = `${header.getBoundingClientRect().bottom}px`;
    scrim.style.height = `calc(100dvh - ${header.getBoundingClientRect().bottom}px)`;
    scrim.hidden = false;
  }
  function openBranch(trigger) {
    const list = trigger.closest('ul');
    list.querySelectorAll('.flyout-trigger').forEach(other => {
      if (other === trigger) return;
      other.setAttribute('aria-expanded', 'false');panel(other).hidden = true;
    });
    trigger.setAttribute('aria-expanded', 'true');
    const flyout = panel(trigger);
    flyout.hidden = false;
    flyout.classList.remove('opens-left');
    if (flyout.getBoundingClientRect().right > innerWidth - 8) flyout.classList.add('opens-left');
  }
  groups.forEach(group => {
    const trigger = group.querySelector('.nav-trigger');
    group.addEventListener('pointerenter', () => { if (hover.matches) openTop(group); });
    group.addEventListener('pointerleave', () => {
      if (!hover.matches) return;
      clearTimeout(timer);
      timer = setTimeout(() => { if (!group.contains(document.activeElement)) close(); }, 160);
    });
    trigger.addEventListener('click', event => {
      // A fine pointer already opened this menu on hover. Keep that first click open.
      if (hover.matches && event.detail > 0) { openTop(group); return; }
      if (trigger.getAttribute('aria-expanded') === 'true') close(); else openTop(group);
    });
    group.querySelectorAll('.has-flyout').forEach(branch => {
      const branchTrigger = branch.querySelector('.flyout-trigger');
      branch.addEventListener('pointerenter', () => { if (hover.matches) openBranch(branchTrigger); });
      branch.addEventListener('pointerleave', () => {
        if (!hover.matches || branch.contains(document.activeElement)) return;
        branchTrigger.setAttribute('aria-expanded', 'false');panel(branchTrigger).hidden = true;
      });
      branchTrigger.addEventListener('click', event => {
        if (hover.matches && event.detail > 0) { openBranch(branchTrigger); return; }
        if (branchTrigger.getAttribute('aria-expanded') === 'true') {
          branchTrigger.setAttribute('aria-expanded', 'false');panel(branchTrigger).hidden = true;
        } else openBranch(branchTrigger);
      });
    });
  });
  nav.addEventListener('keydown', event => {
    const target = event.target.closest('a,button');
    if (!target) return;
    const group = target.closest('.nav-dropdown');
    const branchTrigger = target.classList.contains('flyout-trigger');
    if (target.classList.contains('nav-trigger') && ['ArrowDown','ArrowUp'].includes(event.key)) {
      event.preventDefault();openTop(group);
      const items = children(panel(target));
      (event.key === 'ArrowDown' ? items[0] : items.at(-1))?.focus();return;
    }
    const list = target.closest('.dropdown-menu,.flyout-menu');
    if (branchTrigger && event.key === 'ArrowRight') {
      event.preventDefault();openBranch(target);children(panel(target))[0]?.focus();return;
    }
    if (list && ['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault();const items = children(list), index = items.indexOf(target);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();return;
    }
    if (list?.classList.contains('flyout-menu') && ['ArrowLeft','Escape'].includes(event.key)) {
      event.preventDefault();event.stopPropagation();
      const owner = list.parentElement.querySelector('.flyout-trigger');
      owner.setAttribute('aria-expanded', 'false');list.hidden = true;owner.focus();return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();close();group?.querySelector('.nav-trigger').focus();
    }
  });
  nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) close(); });
  nav.addEventListener('click', event => {
    const item = event.target.closest('a,button');
    if (item && !item.hasAttribute('aria-expanded')) close();
  });
  document.addEventListener('pointerdown', event => { if (!nav.contains(event.target)) close(); });
  scrim.addEventListener('click', close);
  desktop.addEventListener('change', close);
  window.addEventListener('resize', close, { passive: true });
  window.addEventListener('scroll', close, { passive: true });
  window.SkinMenu = { close };
})();
