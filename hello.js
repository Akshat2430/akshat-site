// hello.js — a note for anyone who opens dev tools. Loaded on every page.
(function () {
  if (window.__akshatHello) return;
  window.__akshatHello = true;
  console.log(
    '%cHello, fellow engineer. 👋%c\n' +
    'The best marketer among engineers built this.\n' +
    '(The best engineer among marketers debugged it.)\n' +
    "If you're reading this, we should probably talk: workwithakshatkharbanda@gmail.com",
    'font: 600 16px/1.6 Georgia, serif; color: #B5542A;',
    'font: 13px/1.6 system-ui, sans-serif; color: inherit;'
  );
})();
