const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const navbar = document.querySelector<HTMLElement>('#navbar');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = document.querySelector<HTMLElement>('#mobile-menu');

function closeMenu(returnFocus = false) {
  if (!menu || !menuButton) return;
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navbar?.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => {
  if (!menu) return;
  const opening = menu.hidden;
  menu.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
  navbar?.classList.toggle('menu-open', opening);
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu && !menu.hidden) closeMenu(true); });
document.addEventListener('click', event => { if (menu && !menu.hidden && !navbar?.contains(event.target as Node)) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Content remains visible if JavaScript or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('motion-enabled');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) document.documentElement.classList.remove('motion-enabled');
  updateScroll();
});

const heroImage = document.querySelector<HTMLElement>('#hero-image');
const floatingNote = document.querySelector<HTMLElement>('.hero-note');
let scrollPending = false;
function updateScroll() {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
  const motionAllowed = !reducedMotion.matches && window.innerWidth > 800;
  const offset = motionAllowed ? Math.min(window.scrollY, 900) : 0;
  if (heroImage) heroImage.style.transform = `translateY(${offset * 0.055}px)`;
  if (floatingNote) floatingNote.style.transform = `translateY(${-offset * 0.022}px)`;
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
}, { passive: true });
window.addEventListener('resize', updateScroll, { passive: true });
updateScroll();

const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>('[role="tab"][data-treatment]'));
const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-explorer-panel]'));
function selectTreatment(id: string, focus = false) {
  tabs.forEach(tab => {
    const selected = tab.dataset.treatment === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  panels.forEach(panel => {
    const selected = panel.dataset.explorerPanel === id;
    panel.hidden = !selected;
    panel.classList.toggle('is-changing', selected && !reducedMotion.matches);
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTreatment(tab.dataset.treatment!));
  tab.addEventListener('keydown', event => {
    let target: number | undefined;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = tabs.length - 1;
    if (target !== undefined) { event.preventDefault(); selectTreatment(tabs[target].dataset.treatment!, true); }
  });
});
document.querySelectorAll<HTMLAnchorElement>('[data-treatment-link]').forEach(link => {
  link.addEventListener('click', () => selectTreatment(link.dataset.treatmentLink!));
});

const contactToast = document.querySelector<HTMLElement>('#contact-toast');
let toastTimer: number | undefined;
function showContactToast() {
  if (!contactToast) return;
  window.clearTimeout(toastTimer);
  contactToast.textContent = 'Demonstração conceitual — agendamento indisponível.';
  contactToast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => {
    contactToast.classList.remove('is-visible');
    contactToast.textContent = '';
  }, 6000);
}
// Preserve the approved Hero/Navbar markup while applying demo behavior to their contact CTAs.
const contactCtaSelector = [
  '[data-demo-contact]',
  '.hero-actions a[href="#contato"]',
  '.nav-cta[href="#contato"]',
  '#mobile-menu a[href="#contato"]',
  '.aurea-section .text-link[href="#contato"]',
  '.final-cta .button[href="#contato"]',
].join(', ');
document.querySelectorAll<HTMLAnchorElement>(contactCtaSelector).forEach(link => {
  link.addEventListener('click', event => {
    if (!contactToast) return;
    event.preventDefault();
    if (menu?.contains(link)) closeMenu(true);
    showContactToast();
  });
});

document.querySelectorAll<HTMLButtonElement>('[data-treatment-step]').forEach(button => {
  button.addEventListener('click', () => {
    const current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    const next = (current + Number(button.dataset.treatmentStep) + tabs.length) % tabs.length;
    if (tabs[next]) selectTreatment(tabs[next].dataset.treatment!);
  });
});
const gallery = document.querySelector<HTMLElement>('[data-treatment-gallery]');
if (gallery && 'IntersectionObserver' in window) {
  const preload = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      gallery.querySelectorAll<HTMLImageElement>('img').forEach(image => image.loading = 'eager');
      preload.disconnect();
    }
  }, { rootMargin: '300px' });
  preload.observe(gallery);
}
