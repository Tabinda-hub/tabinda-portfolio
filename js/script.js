document.addEventListener('DOMContentLoaded', () => {
    
    // Canvas Background Animation
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 60;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
// Add this inside your existing DOMContentLoaded event listener

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.skill-card, .project-card, .cert-glass, .about-glass-card, .section-title, .contact-card');

// Add the base class to target elements dynamically
revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    
    // Assign staggered delays to grid items for a wave effect
    const delayClass = `delay-${(index % 4) + 1}`;
    el.classList.add(delayClass);
});

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Un-comment the next line if you want the animation to trigger only once:
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealOnScroll.observe(el));
// Render Dynamically Added Admin Projects with Gallery Support
// Render Dynamically Added Admin Projects with Uploaded Gallery Images
// Render Dynamically Added Projects and Galleries
// Dynamic Projects Renderer (Handles Admin Subfolder Paths & File Uploads)
// Render Projects function update
function renderProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;

    // LocalStorage se dynamically added projects fetch karein
    const customProjects = JSON.parse(localStorage.getItem('customProjects')) || [];
    
    // Static Projects List
    let allProjects = [
        {
            id: 'pharmacy',
            title: 'Pharmacy & Healthcare Platform',
            tag: 'WordPress / WooCommerce',
            mainImg: 'images/Medicine/Medicine 1.png',
            bullets: [
                'Custom e-commerce store with medical inventory categories.',
                'Fully responsive product cards & secure checkout flow.',
                'Optimized layout for pharmaceutical visual identity.'
            ]
        },
        {
            id: 'velora',
            title: 'Velora Apparel & Fashion Store',
            tag: 'WordPress / Elementor',
            mainImg: 'images/Velora/Velora 1.png',
            bullets: [
                'Modern apparel storefront with neutral color palettes.',
                'Dynamic hero sections and featured collection grids.',
                'Optimized for desktop and mobile shopping user experience.'
            ]
        },
        {
            id: 'cyberdashboard',
            title: 'Cyber Threat Intelligence Dashboard',
            tag: 'Power BI / Cybersecurity',
            mainImg: 'images/Cyber powerBI dashboard/power bi 1.png',
            bullets: [
                'Real-time network traffic & threat analytics monitoring.',
                'Interactive data visualizer for attack vectors & risk scores.',
                'Security metrics summary for incident response teams.'
            ]
        },
        ...customProjects
    ];

    projectsContainer.innerHTML = '';

    allProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card';
        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${project.mainImg}" alt="${project.title}" class="project-main-img">
            </div>
            <div class="card-header"><span class="tag">${project.tag}</span></div>
            <h3>${project.title}</h3>
            <ul class="project-bullets">
                ${project.bullets ? project.bullets.map(b => `<li><i class="fa-solid fa-angle-right"></i> ${b}</li>`).join('') : ''}
            </ul>
            <a href="project-details.html?id=${project.id}" class="btn-view-project">View Project Details <i class="fa-solid fa-arrow-right"></i></a>
        `;
        projectsContainer.appendChild(card);
    });
}

// Call function on page load
document.addEventListener('DOMContentLoaded', renderProjects);
function loadAdminProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const customProjects = JSON.parse(localStorage.getItem('custom_projects')) || [];

    if (projectsGrid && customProjects.length > 0) {
        customProjects.forEach((proj, projIndex) => {
            // Determine path (If Base64 data upload OR relative subfolder path)
            const coverSrc = proj.image.startsWith('data:image') 
                ? proj.image 
                : (proj.image.startsWith('images/') ? proj.image : `images/${proj.image}`);

            let galleryHtml = '';
            if (proj.gallery && proj.gallery.length > 0) {
                galleryHtml = `<div class="card-gallery" style="display: flex; gap: 8px; margin-bottom: 1rem; overflow-x: auto;">`;
                galleryHtml += `<img src="${coverSrc}" onclick="switchProjectImage('admin-${projIndex}', '${coverSrc}')" style="width: 50px; height: 35px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 1px solid #00f2fe;">`;
                
                proj.gallery.forEach(img => {
                    const galSrc = img.startsWith('data:image') 
                        ? img 
                        : (img.startsWith('images/') ? img : `images/${img}`);
                    galleryHtml += `<img src="${galSrc}" onclick="switchProjectImage('admin-${projIndex}', '${galSrc}')" style="width: 50px; height: 35px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 1px solid rgba(255,255,255,0.2);">`;
                });
                galleryHtml += `</div>`;
            }

            const cardHtml = `
                <div class="project-card glass-card reveal active">
                    <img id="main-img-admin-${projIndex}" src="${coverSrc}" alt="${proj.title}" style="width:100%; aspect-ratio: 16/9; object-fit: cover; border-radius:12px; margin-bottom:0.8rem; transition: all 0.3s ease;">
                    ${galleryHtml}
                    <div class="card-header"><span class="tag">${proj.tag}</span></div>
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                </div>
            `;
            projectsGrid.insertAdjacentHTML('afterbegin', cardHtml);
        });
    }
}

// Switch Image Function for Dynamic Projects
function switchProjectImage(cardIndex, newSrc) {
    const mainImg = document.getElementById(`main-img-${cardIndex}`);
    if (mainImg) { mainImg.src = newSrc; }
}

// Dynamic Certifications Renderer
function loadAdminCertifications() {
    const certList = document.querySelector('.cert-glass ul');
    const customCerts = JSON.parse(localStorage.getItem('custom_certs')) || [];

    if (certList && customCerts.length > 0) {
        customCerts.forEach(cert => {
            const certHtml = `
                <li><i class="fa-solid fa-certificate" style="color: #00f2fe;"></i> <strong>${cert.title}</strong> — <span style="color: #94a3b8;">${cert.status}</span></li>
            `;
            certList.insertAdjacentHTML('beforeend', certHtml);
        });
    }
}

// Run functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadAdminProjects();
    loadAdminCertifications();
});
// Call function on page load
loadAdminProjects();
// Interactive image switcher for gallery
function switchProjectImage(cardIndex, newSrc) {
    const mainImg = document.getElementById(`main-img-${cardIndex}`);
    if (mainImg) {
        mainImg.src = newSrc;
    }
}

loadAdminProjects();
// Background Stars Engine Fix
const canvas = document.getElementById('bg-canvas') || document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
// Baqi purana JS code (smooth scroll, mobile navbar, etc.)...

// -------------------------------------------------------------
// DYNAMIC PROJECTS RENDER FROM LOCALSTORAGE
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const customProjects = JSON.parse(localStorage.getItem('customProjects')) || [];
    const projectsContainer = document.getElementById('projects-container');

    if (projectsContainer && customProjects.length > 0) {
        customProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            card.innerHTML = `
                <div class="project-img-wrapper">
                    <img src="${project.mainImg || project.image}" alt="${project.title}" class="project-main-img">
                </div>
                <div class="card-header"><span class="tag">${project.tag}</span></div>
                <h3>${project.title}</h3>
                <p class="project-desc">${project.description || ''}</p>
                
                <a href="project-details.html?id=${project.id}" class="btn-view-project">
                    View Details <i class="fa-solid fa-arrow-right"></i>
                </a>
            `;

            projectsContainer.appendChild(card);
        });
    }
});