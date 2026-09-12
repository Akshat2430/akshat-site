// contact-form.js — self-mounting contact form, POSTs to Web3Forms.
// Mounts into every <div class="contact-form-mount" data-location="..."> found on the page.

(function () {
  const WEB3FORMS_ACCESS_KEY = '85710a83-f3ae-4ef7-96d3-231b04ac4047';

  function trackEvent(name, data) {
    if (typeof window.va === 'function') {
      window.va('event', { name, data });
    }
  }

  function renderForm(mount) {
    const location = mount.dataset.location || 'unknown';

    mount.innerHTML = `
      <form class="contact-form">
        <input type="text" name="botcheck" class="form-hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <div class="form-row">
          <label class="form-label" for="cf-name-${location}">Name</label>
          <input class="form-input" type="text" id="cf-name-${location}" name="name" required />
        </div>
        <div class="form-row">
          <label class="form-label" for="cf-email-${location}">Email</label>
          <input class="form-input" type="email" id="cf-email-${location}" name="email" required />
        </div>
        <div class="form-row">
          <label class="form-label" for="cf-message-${location}">What's the project?</label>
          <textarea class="form-textarea" id="cf-message-${location}" name="message" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary form-submit">Send →</button>
      </form>
      <p class="form-status" role="status" aria-live="polite"></p>
    `;

    const form = mount.querySelector('form');
    const submitBtn = mount.querySelector('.form-submit');
    const statusEl = mount.querySelector('.form-status');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (form.querySelector('[name="botcheck"]').value) return; // honeypot tripped, silently drop

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      statusEl.textContent = '';
      statusEl.className = 'form-status';

      const formData = new FormData(form);
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', `New inquiry from akshatkharbanda.com (${location})`);
      formData.append('from_name', 'akshatkharbanda.com contact form');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });
        const result = await res.json();

        if (!result.success) throw new Error(result.message || 'Submission failed');

        form.hidden = true;
        statusEl.textContent = "Sent — I'll get back to you soon.";
        statusEl.className = 'form-status form-status-success';
        trackEvent('form_submit', { location });
      } catch (err) {
        statusEl.textContent = 'Something went wrong — try emailing workwithakshatkharbanda@gmail.com directly.';
        statusEl.className = 'form-status form-status-error';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send →';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.contact-form-mount').forEach(renderForm);
  });
})();
