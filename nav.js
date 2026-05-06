// nav.js — shared navigation injected on every page

function getCurrentPage() {
  const path = window.location.pathname;
  if (path === '/' || path.includes('index')) return 'work';
  if (path.includes('/work')) return 'work';
  if (path.includes('/writing')) return 'writing';
  if (path.includes('/speaking')) return 'speaking';
  if (path.includes('/content')) return 'content';
  if (path.includes('/sidequests')) return 'sidequests';
  if (path.includes('/about')) return 'about';
  return '';
}

function getRoot() {
  const path = window.location.pathname;
  if (path.includes('/work/')) return '../';
  return './';
}

function injectNav() {
  const root = getRoot();
  const current = getCurrentPage();
  const links = [
    { href: `${root}work.html`, label: 'Work', key: 'work' },
    { href: `${root}writing.html`, label: 'Writing', key: 'writing' },
    { href: `${root}speaking.html`, label: 'Speaking', key: 'speaking' },
    { href: `${root}content.html`, label: 'Content', key: 'content' },
    { href: `${root}sidequests.html`, label: 'Side Quests', key: 'sidequests' },
    { href: `${root}about.html`, label: 'About', key: 'about' },
  ];

  const navHTML = `
    <nav>
      <div class="nav-inner">
        <a href="${root}index.html" class="nav-logo">Akshat Kharbanda</a>
        <ul class="nav-links">
          ${links.map(l => `<li><a href="${l.href}" class="${current === l.key ? 'active' : ''}">${l.label}</a></li>`).join('')}
        </ul>
        <a href="mailto:workwithakshatkharbanda@gmail.com" class="nav-cta">Get in touch</a>
        <button class="nav-mobile-toggle" aria-label="Menu" onclick="toggleMobileMenu()">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile-menu" id="mobileMenu">
        ${links.map(l => `<a href="${l.href}" class="${current === l.key ? 'active' : ''}">${l.label}</a>`).join('')}
        <a href="mailto:workwithakshatkharbanda@gmail.com" class="nav-mobile-cta">Get in touch</a>
      </div>
    </nav>
  `;

  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <span class="footer-name">Akshat Kharbanda &copy; ${new Date().getFullYear()}</span>
        <div class="footer-links">
          <a href="https://linkedin.com/in/akshat-kharbanda" target="_blank">LinkedIn</a>
          <a href="https://www.instagram.com/thebusinessbackpacker/" target="_blank">Instagram</a>
          <a href="https://thebusinessbackpacker.substack.com" target="_blank">Substack</a>
          <a href="mailto:workwithakshatkharbanda@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', injectNav);
