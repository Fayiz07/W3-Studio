// Cursor ambient glow follower
const cursorFollower = document.querySelector('.cursor-follower');

if (cursorFollower) {
  window.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = `${e.clientX}px`;
    cursorFollower.style.top = `${e.clientY}px`;
  });
}

// Live Link Manager (Allows Fayiz to easily test or customize his live link anytime)
const DEFAULT_PROJECT_URL = "https://www.instagram.com/w3.studi0"; // Exact Instagram profile project link

function getSavedProjectUrl() {
  return localStorage.getItem('w3_featured_project_url') || DEFAULT_PROJECT_URL;
}

function updateProjectLinkButtons() {
  const currentUrl = getSavedProjectUrl();
  const launchBtns = document.querySelectorAll('.launch-project-btn');
  launchBtns.forEach(btn => {
    btn.href = currentUrl;
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateProjectLinkButtons();

  // Project URL modal handlers
  const editUrlBtn = document.getElementById('editUrlBtn');
  const modal = document.getElementById('urlModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const saveUrlBtn = document.getElementById('saveUrlBtn');
  const projectUrlInput = document.getElementById('projectUrlInput');

  if (editUrlBtn && modal) {
    editUrlBtn.addEventListener('click', (e) => {
      e.preventDefault();
      projectUrlInput.value = getSavedProjectUrl();
      modal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    saveUrlBtn.addEventListener('click', () => {
      let val = projectUrlInput.value.trim();
      if (!val) {
        val = DEFAULT_PROJECT_URL;
      }
      if (!/^https?:\/\//i.test(val)) {
        val = 'https://' + val;
      }
      localStorage.setItem('w3_featured_project_url', val);
      updateProjectLinkButtons();
      modal.classList.remove('active');
      showNotification('Project link successfully updated!');
    });
  }

  // Contact form submission handler (Interactive feedback)
  const contactForm = document.getElementById('inquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Inquiry...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>✓ Message Received!</span>`;
        showNotification('Thank you! W3 Studio will connect with you shortly.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 4000);
      }, 900);
    });
  }
});

// Toast Notification Helper
function showNotification(msg) {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(13, 17, 23, 0.95);
      border: 1px solid #38bdf8;
      box-shadow: 0 10px 30px rgba(56, 189, 248, 0.3);
      color: #fff;
      padding: 14px 22px;
      border-radius: 9999px;
      z-index: 10000;
      font-size: 0.95rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> ${msg}`;
  
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 4000);
}
