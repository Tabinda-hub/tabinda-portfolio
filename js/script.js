// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav a, .hero a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 2. Contact Form Handling & Validation
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name').value.trim();
            const emailInput = document.getElementById('email').value.trim();
            const messageInput = document.getElementById('message').value.trim();

            if (!nameInput || !emailInput || !messageInput) {
                alert('Please fill in all required fields.');
                return;
            }

            // Success feedback
            alert(`Thank you, ${nameInput}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }

    // 3. Fallback Image Error Handler (Auto-fix missing images)
    const projectImages = document.querySelectorAll('.project-card img');

    projectImages.forEach(img => {
        img.addEventListener('error', () => {
            if (!img.dataset.fallbackTried) {
                img.dataset.fallbackTried = 'true';
                img.src = 'https://via.placeholder.com/400x250?text=Project+Preview';
            }
        });
    });

});