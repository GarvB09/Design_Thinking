// === CHART: Inventory Performance ===
document.addEventListener('DOMContentLoaded', function () {

  const ctx = document.getElementById('perfChart');
  if (!ctx) return;

  const labels = ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'];
  const actual = [8.1, 8.4, 8.9, 9.2, 9.8, 10.1, 10.6, 11.0, 11.4, 11.8, 12.1, 12.4];
  const target = [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Actual',
          data: actual,
          borderColor: '#1a3a5c',
          backgroundColor: 'rgba(26,58,92,0.06)',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#1a3a5c',
          fill: true
        },
        {
          label: 'Target',
          data: target,
          borderColor: '#c8522a',
          borderWidth: 1.5,
          borderDash: [5, 4],
          tension: 0,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { font: { size: 11 }, color: '#888' }
        },
        y: {
          min: 6,
          max: 14,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { font: { size: 11 }, color: '#888' }
        }
      }
    }
  });

  // === Chart tab switching ===
  window.setTab = function (el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  };

  // === Smooth nav scroll ===
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // === Animate stats on scroll ===
  const statVals = document.querySelectorAll('.stat-val');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.3 });

  statVals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // === CTA button ===
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function () {
      const name = document.querySelector('.cta-input[placeholder="Your name"]').value;
      const email = document.querySelector('.cta-input[type="email"]').value;
      if (!name || !email) {
        alert('Please fill in your name and email to proceed.');
        return;
      }
      alert('Thank you, ' + name + '! We\'ll be in touch within 1 business day.');
    });
  }

});
