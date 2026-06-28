// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// ===== CURRENT DATE =====
function updateDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('en-IN', options);
}
updateDate();

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}
window.addEventListener('load', animateCounters);

// ===== BAR ANIMATION =====
window.addEventListener('load', () => {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const w = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => bar.style.width = w, 300);
  });
});

// ===== MODAL UTILITY =====
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
  const existing = document.getElementById('toast-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'toast-container';
  container.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#4f46e5'};
    color:#fff; padding:12px 20px; border-radius:10px;
    font-size:0.875rem; font-weight:600;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;
  container.textContent = message;
  document.body.appendChild(container);

  setTimeout(() => container.remove(), 3000);
}

// ===== TABLE SEARCH =====
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    const rows = document.querySelectorAll(`#${tableId} tbody tr`);
    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });
}

// ===== FORM VALIDATION =====
function validateRequired(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  return valid;
}

// ===== MARK ACTIVE NAV =====
document.querySelectorAll('.nav-item').forEach(item => {
  if (item.href === window.location.href) {
    item.classList.add('active');
  } else {
    item.classList.remove('active');
  }
});
