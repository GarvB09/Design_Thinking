document.addEventListener('DOMContentLoaded', function () {

  // === MOBILE MENU ===
  window.toggleMenu = function () {
    document.getElementById('nav-menu').classList.toggle('open');
  };

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = 'true';
        const target = parseInt(entry.target.dataset.target);
        const prefix = entry.target.dataset.prefix || '';
        const suffix = entry.target.dataset.suffix || '';
        let current = 0;
        const duration = 1600;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = prefix + Math.floor(current) + suffix;
        }, 16);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // === ANIMATE DIAGNOSTIC BARS ===
  const animBars = document.querySelectorAll('.anim-bar');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.width = entry.target.dataset.width + '%';
        }, 100);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  animBars.forEach(b => barObserver.observe(b));

  // === FADE-IN ON SCROLL ===
  const fadeEls = document.querySelectorAll('.svc, .case-card, .fw-item, .stat');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.07}s, transform 0.5s ease ${(i % 6) * 0.07}s`;
    fadeObserver.observe(el);
  });

  // === CHART DATA ===
  const chartDatasets = {
    '90d': { actual: [8.1,8.4,8.9,9.2,9.8,10.1,10.6,11.0,11.4,11.8,12.1,12.4], target: 11, labels: ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'] },
    'ytd': { actual: [7.2,7.8,8.5,9.0,9.6,10.2,10.8,11.3,11.9,12.2,12.4,12.6], target: 10.5, labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
    '1y': { actual: [6.8,7.1,7.6,8.0,8.5,9.1,9.8,10.4,11.0,11.5,12.0,12.4], target: 10, labels: ['Q1W1','Q1W4','Q1W8','Q1W12','Q2W4','Q2W8','Q2W12','Q3W4','Q3W8','Q3W12','Q4W8','Q4W12'] }
  };

  const ctx = document.getElementById('perfChart');
  let perfChart;
  if (ctx) {
    const d = chartDatasets['90d'];
    perfChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          { label:'Actual', data: d.actual, borderColor:'#1a3a5c', backgroundColor:'rgba(26,58,92,0.06)', borderWidth:2, tension:0.4, pointRadius:3, pointBackgroundColor:'#1a3a5c', fill:true },
          { label:'Target', data: new Array(12).fill(d.target), borderColor:'#c8522a', borderWidth:1.5, borderDash:[5,4], tension:0, pointRadius:0, fill:false }
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ display:false } },
        scales:{
          x:{ grid:{ color:'rgba(0,0,0,0.04)' }, ticks:{ font:{ size:10 }, color:'#888' } },
          y:{ min:5, max:14, grid:{ color:'rgba(0,0,0,0.04)' }, ticks:{ font:{ size:10 }, color:'#888' } }
        }
      }
    });
  }

  window.setTab = function (el, key) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    if (perfChart && chartDatasets[key]) {
      const d = chartDatasets[key];
      perfChart.data.labels = d.labels;
      perfChart.data.datasets[0].data = d.actual;
      perfChart.data.datasets[1].data = new Array(d.labels.length).fill(d.target);
      perfChart.update();
    }
  };

  // === CTA FORM ===
  window.submitCTA = function () {
    const name = document.getElementById('cta-name')?.value.trim();
    const email = document.getElementById('cta-email')?.value.trim();
    const company = document.getElementById('cta-company')?.value.trim();
    if (!name || !email) {
      const missing = [];
      if (!name) { missing.push('name'); document.getElementById('cta-name').style.borderColor = '#c8522a'; }
      if (!email) { missing.push('email'); document.getElementById('cta-email').style.borderColor = '#c8522a'; }
      return;
    }
    document.getElementById('cta-success').style.display = 'block';
    document.querySelector('.cta-submit-btn').disabled = true;
    document.querySelector('.cta-submit-btn').textContent = 'Request Sent ✓';
    document.querySelector('.cta-submit-btn').style.background = '#2e7d52';
  };

  // === ACTIVE NAV LINK ===
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav ul li a').forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').includes(currentPage) && currentPage !== '') {
      link.style.color = 'var(--accent)';
    }
  });

});
