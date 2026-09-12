// nav.js — shared navigation injected on every page

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/' || path.includes('index')) return '';
  if (path.includes('/method')) return 'method';
  if (path.includes('/work')) return 'work';
  if (path.includes('/resources')) return 'resources';
  if (path.includes('/writing')) return 'writing';
  if (path.includes('/speaking')) return 'speaking';
  if (path.includes('/content')) return 'content';
  if (path.includes('/sidequests')) return 'sidequests';
  if (path.includes('/about')) return 'about';
  return '';
}

function getRoot() {
  const path = window.location.pathname;
  if (path.includes('/work/') || path.includes('/tools/')) return '../';
  return './';
}

function injectNav() {
  const root = getRoot();
  const current = getCurrentPage();
  const links = [
    { href: `${root}work.html`, label: 'Work', key: 'work' },
    { href: `${root}resources.html`, label: 'Free Resources', key: 'resources' },
    { href: `${root}method.html`, label: 'Method', key: 'method' },
    { href: `${root}writing.html`, label: 'Writing', key: 'writing' },
    { href: `${root}speaking.html`, label: 'Speaking', key: 'speaking' },
    { href: `${root}content.html`, label: 'Content', key: 'content' },
    { href: `${root}sidequests.html`, label: 'Side Quests', key: 'sidequests' },
    { href: `${root}about.html`, label: 'About', key: 'about' },
  ];

  const navHTML = `
    <a href="#main-content" class="skip-link">Skip to content</a><nav aria-label="Main navigation">
      <div class="nav-inner">
        <a href="${root}index.html" class="nav-logo">Akshat Kharbanda<small>The Business Backpacker</small></a>
        <ul class="nav-links">
          ${links.map(l => `<li><a href="${l.href}" ${current === l.key ? 'aria-current="page"' : ''} class="${current === l.key ? 'active' : ''}">${l.label}</a></li>`).join('')}
        </ul>
        <button class="nav-mobile-toggle" aria-label="Menu" aria-expanded="false" aria-controls="mobileMenu" onclick="toggleMobileMenu()">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile-menu" id="mobileMenu">
        ${links.map(l => `<a href="${l.href}" ${current === l.key ? 'aria-current="page"' : ''} class="${current === l.key ? 'active' : ''}">${l.label}</a>`).join('')}
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <span class="footer-name"><svg class="footer-route" viewBox="0 0 160 50" aria-hidden="true"><use href="${root}public/images/field-marks.svg#route" /></svg>Akshat Kharbanda &copy; ${new Date().getFullYear()}</span>
        <div class="footer-links">
          <a href="https://linkedin.com/in/akshat-kharbanda" target="_blank">LinkedIn</a>
          <a href="https://www.instagram.com/thebusinessbackpacker/" target="_blank">Instagram</a>
          <a href="https://thebusinessbackpacker.substack.com" target="_blank">Substack</a>
          <a href="mailto:workwithakshatkharbanda@gmail.com" onclick="if(typeof va==='function'){va('event',{name:'mailto_click',data:{location:'footer'}})}">Email</a>
        </div>
      </div>
    </footer>
  `;

  const main = document.querySelector('main');
  if (main) { main.id = 'main-content'; main.tabIndex = -1; main.setAttribute('aria-label', document.title.split(' · ')[0]); }
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.getElementById('mobileMenu').classList.contains('open')) {
      toggleMobileMenu(); document.querySelector('.nav-mobile-toggle').focus();
    }
  });
  document.querySelectorAll('.content-marquee-viewport').forEach(el => {
    el.tabIndex = 0; el.setAttribute('role', 'region');
    el.setAttribute('aria-label', (el.parentElement.querySelector('.content-marquee-label')?.textContent || 'Social posts').trim());
  });
  document.querySelectorAll('[onclick]').forEach(el => {
    if (el.tagName === 'DIV' && el.getAttribute('onclick').includes('window.open')) {
      el.setAttribute('role', 'link'); el.tabIndex = 0;
      el.addEventListener('keydown', event => { if (event.key === 'Enter') el.click(); });
    }
  });
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const open = menu.classList.toggle('open');
  document.querySelector('.nav-mobile-toggle').setAttribute('aria-expanded', String(open));
}

document.addEventListener('DOMContentLoaded', injectNav);
