// Font Awesome fallback check
document.addEventListener('DOMContentLoaded', function() {
    const testIcon = document.createElement('i');
    testIcon.className = 'fas fa-heart';
    testIcon.style.display = 'none';
    document.body.appendChild(testIcon);
    
    // Check if Font Awesome loaded
    setTimeout(() => {
        const computed = window.getComputedStyle(testIcon, ':before');
        if (computed.content === 'none' || computed.content === '') {
            console.warn('Font Awesome may not have loaded properly');
        }
        document.body.removeChild(testIcon);
    }, 100);
});

// Enhanced mobile menu with modern animations
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
let isMenuOpen = false;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
            line2.style.opacity = '0';
            line3.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            mobileMenu.style.maxHeight = '0';
            line1.style.transform = 'none';
            line2.style.opacity = '1';
            line3.style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on links
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        if (mobileMenu) {
            mobileMenu.style.maxHeight = '0';
            line1.style.transform = 'none';
            line2.style.opacity = '1';
            line3.style.transform = 'none';
        }
    });
});

// Header scroll effect - solid background only
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (header) {
            header.classList.add('scrolled');
        }
    } else {
        if (header) {
            header.classList.remove('scrolled');
        }
    }
});

// Enhanced typing effect for hero
const typingText = document.getElementById('typingText');
const messages = [
    'ASN Berdedikasi 🇮🇩',
    'Laravel Specialist 🚀',
    'Digital Transformation Expert 💡',
    'PHP Developer Profesional ⚡'
];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!typingText) return;
    
    const currentMessage = messages[messageIndex];
    
    if (isDeleting) {
        typingText.textContent = currentMessage.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentMessage.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentMessage.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing effect after loading
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeWriter, 1000);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Advanced Intersection Observer for section reveals
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe sections for reveal animations
document.querySelectorAll('.section-reveal').forEach(el => {
    revealObserver.observe(el);
});

// Stagger animation observer
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe stagger elements
document.querySelectorAll('.stagger-animation').forEach(el => {
    staggerObserver.observe(el);
});

// Magnetic effect for buttons
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

// 3D card effect
document.querySelectorAll('.skill-card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        const inner = card.querySelector('.skill-card-inner');
        if (inner) {
            inner.style.transform = 
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const inner = card.querySelector('.skill-card-inner');
        if (inner) {
            inner.style.transform = 
                'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    });
});

// Particles animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'fixed w-1 h-1 bg-blue-400 rounded-full pointer-events-none z-0';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.opacity = '0.6';
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.6 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach((element, index) => {
        const speed = scrolled * (0.2 + index * 0.1);
        element.style.transform = `translateY(${speed}px)`;
    });
});

// Enhanced hover effects
document.querySelectorAll('.hover-lift').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerBtn = document.getElementById('mobileMenuBtn');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    
    if (mobileMenu && mobileMenu.style.maxHeight === '100vh') {
        // Close menu
        mobileMenu.style.maxHeight = '0';
        if (line1) line1.style.transform = 'rotate(0deg)';
        if (line2) line2.style.opacity = '1';
        if (line3) line3.style.transform = 'rotate(0deg)';
        document.body.style.overflow = 'auto';
    } else if (mobileMenu) {
        // Open menu
        mobileMenu.style.maxHeight = '100vh';
        if (line1) line1.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (line2) line2.style.opacity = '0';
        if (line3) line3.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        document.body.style.overflow = 'hidden';
    }
}

// Add event listener to mobile menu button
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('#mobileMenu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(toggleMobileMenu, 200);
        });
    });
});

// Page transition effect
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Form submission with enhanced UX
document.addEventListener('submit', function(e) {
    if (e.target.matches('.contact-form')) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Terkirim!';
                submitBtn.classList.add('bg-green-500');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-green-500');
                    e.target.reset();
                }, 2000);
            }, 1500);
        }
    }
});

// Smooth reveal on scroll
const scrollReveal = () => {
    const elements = document.querySelectorAll('.opacity-0');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.remove('opacity-0');
            element.classList.add('animate-fadeInUp');
        }
    });
};

window.addEventListener('scroll', scrollReveal);

// Initial scroll reveal check
document.addEventListener('DOMContentLoaded', function() {
    scrollReveal();
});

// Enhanced magnetic effect for buttons with mouse tracking
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        // Mouse tracking effect
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `scale(1.05) translate(${x * 0.15}px, ${y * 0.15 - 2}px)`;
        });
    });
});

// Tech particles interactive effects
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tech-particle').forEach(particle => {
        particle.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.3) rotate(0deg)';
            this.style.zIndex = '100';
        });
        
        particle.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.zIndex = '10';
        });

        // Add click effect
        particle.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'techFloat 8s ease-in-out infinite';
            }, 100);
        });
    });
});

// --- Blog feed preview (fetch RSS/Atom and render previews) ---
document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('blog-posts');
    if (!postsContainer) return;

    const feedUrl = 'https://blog.azharazziz.my.id/feed';
    const rss2json = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedUrl);
    const maxPosts = 6;

    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html || '';
        return tmp.textContent || tmp.innerText || '';
    }

    function renderPosts(items) {
        if (!items || !items.length) {
            postsContainer.innerHTML = `
                <div class="bg-white p-6 rounded-2xl shadow border border-gray-100 text-center">
                    <p class="text-gray-600">Belum ada postingan yang dapat ditampilkan. Anda dapat mengunjungi blog secara langsung.</p>
                    <a href="https://blog.azharazziz.my.id" target="_blank" rel="noopener" class="inline-block mt-4 px-5 py-2 bg-teal-600 text-white rounded-lg">Buka Blog</a>
                </div>`;
            return;
        }

        const cards = items.slice(0, maxPosts).map(item => {
            const title = item.title || 'Untitled';
            const link = item.link || item.url || '#';
            const rawDate = item.pubDate || item.isoDate || item.published || '';
            const pubDate = rawDate ? new Date(rawDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
            const contentHtml = item.content || item.description || item.summary || '';
            const text = stripHtml(contentHtml).trim();
            const excerpt = text.slice(0, 160) + (text.length > 160 ? '…' : '');

            return `
                <article class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-200 border border-gray-100 flex flex-col h-full">
                    <div class="flex-1">
                        <a href="${link}" target="_blank" rel="noopener" class="text-lg font-bold text-gray-900 hover:text-teal-600 transition-colors">${title}</a>
                        <div class="text-sm text-gray-500 mt-1">${pubDate}</div>
                        <p class="text-gray-600 mt-3">${excerpt}</p>
                    </div>
                    <div class="mt-4">
                        <a href="${link}" target="_blank" rel="noopener" class="inline-block text-sm font-semibold text-teal-600 hover:underline">Baca selengkapnya →</a>
                    </div>
                </article>`;
        }).join('\n');

        postsContainer.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${cards}</div>`;
    }

    function showLoading() {
        const skeleton = Array.from({ length: maxPosts }).map(() => `
            <div class="bg-white p-5 rounded-2xl shadow border border-gray-100 animate-pulse h-40"></div>
        `).join('\n');
        postsContainer.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${skeleton}</div>`;
    }

    function showError() {
        postsContainer.innerHTML = `
            <div class="bg-white p-6 rounded-2xl shadow border border-gray-100 text-center">
                <p class="text-gray-600">Tidak dapat memuat preview postingan saat ini. Silakan kunjungi blog secara langsung.</p>
                <a href="https://blog.azharazziz.my.id" target="_blank" rel="noopener" class="inline-block mt-4 px-5 py-2 bg-teal-600 text-white rounded-lg">Buka Blog</a>
            </div>`;
    }

    // Start loading UI
    showLoading();

    // Try rss2json proxy first (CORS-friendly). If it fails, try fetching feed directly.
    fetch(rss2json).then(res => res.json()).then(data => {
        if (data && (data.status === 'ok' || data.items)) {
            renderPosts(data.items || data.feed && data.feed.entries || []);
        } else {
            throw new Error('Invalid RSS response');
        }
    }).catch(() => {
        // Fallback: try to fetch the feed directly (may fail due to CORS)
        fetch(feedUrl).then(res => {
            if (!res.ok) throw new Error('Network response not ok');
            return res.text();
        }).then(xmlText => {
            // Parse XML and extract items
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'application/xml');
            const items = Array.from(xml.querySelectorAll('item, entry')).map(node => {
                return {
                    title: (node.querySelector('title') && node.querySelector('title').textContent) || '',
                    link: (node.querySelector('link') && (node.querySelector('link').getAttribute('href') || node.querySelector('link').textContent)) || '',
                    pubDate: (node.querySelector('pubDate') && node.querySelector('pubDate').textContent) || (node.querySelector('updated') && node.querySelector('updated').textContent) || '',
                    description: (node.querySelector('description') && node.querySelector('description').textContent) || (node.querySelector('content\:encoded') && node.querySelector('content\:encoded').textContent) || (node.querySelector('summary') && node.querySelector('summary').textContent) || ''
                };
            });

            renderPosts(items);
        }).catch(err => {
            // Final fallback: show simple CTA
            console.warn('Failed to load blog feed:', err);
            showError();
        });
    });
});

// Enhanced scroll indicator interaction
document.addEventListener('DOMContentLoaded', function() {
    const mouseContainer = document.querySelector('.mouse-container');
    if (mouseContainer) {
        mouseContainer.addEventListener('click', function() {
            // Smooth scroll to about section
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        // Add hover effect
        mouseContainer.addEventListener('mouseenter', function() {
            this.querySelector('.mouse-scroll').style.animationDuration = '0.8s';
        });

        mouseContainer.addEventListener('mouseleave', function() {
            this.querySelector('.mouse-scroll').style.animationDuration = '2s';
        });
    }
});

// Tech cards stagger animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const techCards = document.querySelectorAll('.tech-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    techCards.forEach(card => {
        techObserver.observe(card);
    });
});

// Removed old project filtering - using new implementation below

// Add CSS animation classes for project filtering
const filterStyles = document.createElement('style');
filterStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    /* Smooth transitions for project cards */
    .grid.lg\\:grid-cols-2.xl\\:grid-cols-3.gap-8 > div {
        transition: all 0.3s ease-in-out;
    }
    
    /* Hover effects for filter buttons */
    .flex.flex-wrap.justify-center.gap-3.mt-8 button {
        transition: all 0.2s ease-in-out;
        position: relative;
        overflow: hidden;
    }
    
    .flex.flex-wrap.justify-center.gap-3.mt-8 button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .flex.flex-wrap.justify-center.gap-3.mt-8 button:active {
        transform: translateY(0);
    }
`;

document.head.appendChild(filterStyles);

// Project Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projects-grid');

    console.log('Filter buttons found:', filterButtons.length);
    console.log('Project cards found:', projectCards.length);

    // Initialize filter functionality
    if (filterButtons.length > 0 && projectCards.length > 0) {
        
        // Add click event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                console.log('Filter clicked:', filter);
                
                // Update active button state
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-teal-100', 'text-teal-700', 'active');
                    btn.classList.add('bg-gray-100', 'text-gray-600');
                });
                
                this.classList.remove('bg-gray-100', 'text-gray-600');
                this.classList.add('bg-teal-100', 'text-teal-700', 'active');
                
                // Filter projects with smooth animation
                filterProjects(filter);
            });
        });
        
        // Project filtering function
        function filterProjects(filter) {
            console.log('Filtering projects by:', filter);
            
            projectCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category');
                console.log('Card categories:', categories);
                
                if (!categories) {
                    console.warn('Card missing data-category attribute:', card);
                    return;
                }
                
                const categoryList = categories.split(' ');
                const shouldShow = filter === 'all' || categoryList.includes(filter);
                
                console.log('Should show card:', shouldShow, 'for filter:', filter, 'categories:', categoryList);
                
                if (shouldShow) {
                    // Show the card with animation
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    // Animate in with staggered delay
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                } else {
                    // Hide the card with animation
                    card.style.transition = 'all 0.3s ease-out';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update projects grid layout
            setTimeout(() => {
                if (projectsGrid) {
                    projectsGrid.style.transition = 'all 0.3s ease-out';
                }
            }, 100);
        }
        
        // Add hover effects to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                }
            });
        });
        
        // Keyboard navigation support
        filterButtons.forEach(button => {
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Add ARIA attributes for accessibility
        filterButtons.forEach(button => {
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
        });
        
        if (projectsGrid) {
            projectsGrid.setAttribute('role', 'tabpanel');
            projectsGrid.setAttribute('aria-live', 'polite');
        }
        
        console.log('Project filtering initialized successfully!');
    } else {
        console.error('Filter buttons or project cards not found!');
    }
});

// Scroll to Top Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        function toggleScrollButton() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            if (scrollTop > windowHeight * 0.3) { // Show after scrolling 30% of viewport height
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
        
        // Smooth scroll to top function
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Event listeners
        window.addEventListener('scroll', toggleScrollButton);
        scrollToTopBtn.addEventListener('click', scrollToTop);
        
        // Keyboard accessibility
        scrollToTopBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
        
        // Initial check
        toggleScrollButton();
        
        console.log('Scroll to top button initialized successfully!');
    } else {
        console.warn('Scroll to top button not found!');
    }
});

// Layout Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const layoutToggleBtn = document.getElementById('layoutToggle');
    const mobileLayoutToggleBtn = document.getElementById('mobileLayoutToggle');
    const body = document.body;
    
    // Check for saved layout preference or set default to full-width
    const savedLayout = localStorage.getItem('layoutPreference');
    let isFullWidth = savedLayout ? savedLayout === 'full-width' : false; // Default to full-width
    
    // Initialize layout based on preference (default is full-width)
    if (isFullWidth) {
        body.classList.add('full-width-layout');
        updateToggleSwitches(true);
    }
    
    // Update toggle switch states and labels
    function updateToggleSwitches(isActive) {
        const switches = [layoutToggleBtn, mobileLayoutToggleBtn].filter(btn => btn);
        
        switches.forEach(switchEl => {
            if (isActive) {
                switchEl.classList.add('active');
                switchEl.classList.add('transitioning');
                
                // Update icon
                const icon = switchEl.querySelector('.toggle-icon');
                if (icon) {
                    icon.className = 'fas fa-compress-arrows-alt toggle-icon';
                }
                
                // Remove transitioning class after animation
                setTimeout(() => {
                    switchEl.classList.remove('transitioning');
                }, 600);
                
            } else {
                switchEl.classList.remove('active');
                switchEl.classList.add('transitioning');
                
                // Update icon
                const icon = switchEl.querySelector('.toggle-icon');
                if (icon) {
                    icon.className = 'fas fa-expand-arrows-alt toggle-icon';
                }
                
                // Remove transitioning class after animation
                setTimeout(() => {
                    switchEl.classList.remove('transitioning');
                }, 600);
            }
        });
        
        // Update labels
        updateLabels(isActive);
    }
    
    // Update label states
    function updateLabels(isFullWidth) {
        // Desktop labels
        const desktopContainer = layoutToggleBtn?.closest('.layout-toggle-container');
        if (desktopContainer) {
            const labels = desktopContainer.querySelectorAll('span');
            labels.forEach((label, index) => {
                label.classList.remove('active');
                if ((index === 0 && !isFullWidth) || (index === 1 && isFullWidth)) {
                    label.classList.add('active');
                }
            });
        }
        
        // Mobile labels
        const mobileContainer = mobileLayoutToggleBtn?.closest('.layout-toggle-container');
        if (mobileContainer) {
            const labels = mobileContainer.querySelectorAll('span:not(:first-child)');
            labels.forEach((label, index) => {
                label.classList.remove('active');
                if ((index === 0 && !isFullWidth) || (index === 1 && isFullWidth)) {
                    label.classList.add('active');
                }
            });
        }
    }
    
    // Toggle layout function
    function toggleLayout(event) {
        isFullWidth = !isFullWidth;
        
        if (isFullWidth) {
            body.classList.add('full-width-layout');
            localStorage.setItem('layoutPreference', 'full-width');
        } else {
            body.classList.remove('full-width-layout');
            localStorage.setItem('layoutPreference', 'contained');
        }
        
        updateToggleSwitches(isFullWidth);
        
        // Add tactile feedback
        const activeSwitch = event.target.closest('.layout-toggle-switch');
        if (activeSwitch) {
            activeSwitch.style.transform = 'scale(0.98)';
            setTimeout(() => {
                activeSwitch.style.transform = '';
            }, 150);
        }
        
        // Trigger scroll event to refresh any scroll-based animations
        window.dispatchEvent(new Event('scroll'));
        
        // Add haptic feedback for mobile (if supported)
        if (navigator.vibrate && window.innerWidth <= 768) {
            navigator.vibrate(50);
        }
        
        console.log(`Layout switched to: ${isFullWidth ? 'Full Width' : 'Contained'}`);
    }
    
    // Event listeners for switches
    if (layoutToggleBtn) {
        layoutToggleBtn.addEventListener('click', toggleLayout);
        
        // Keyboard accessibility
        layoutToggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLayout(e);
            }
        });
        
        // Add ARIA attributes
        layoutToggleBtn.setAttribute('role', 'switch');
        layoutToggleBtn.setAttribute('aria-checked', isFullWidth ? 'true' : 'false');
    }
    
    if (mobileLayoutToggleBtn) {
        mobileLayoutToggleBtn.addEventListener('click', toggleLayout);
        
        // Keyboard accessibility
        mobileLayoutToggleBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLayout(e);
            }
        });
        
        // Add ARIA attributes
        mobileLayoutToggleBtn.setAttribute('role', 'switch');
        mobileLayoutToggleBtn.setAttribute('aria-checked', isFullWidth ? 'true' : 'false');
    }
    
    // Update tooltips and ARIA attributes
    function updateAccessibility() {
        const tooltip = isFullWidth ? 'Switch to Contained Layout' : 'Switch to Full Width Layout';
        
        if (layoutToggleBtn) {
            layoutToggleBtn.title = tooltip;
            layoutToggleBtn.setAttribute('aria-checked', isFullWidth ? 'true' : 'false');
        }
        if (mobileLayoutToggleBtn) {
            mobileLayoutToggleBtn.title = tooltip;
            mobileLayoutToggleBtn.setAttribute('aria-checked', isFullWidth ? 'true' : 'false');
        }
    }
    
    updateAccessibility();
    
    // Update accessibility when layout changes
    const observer = new MutationObserver(() => {
        updateAccessibility();
    });
    
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    
    // Add smooth animation for initial state
    setTimeout(() => {
        updateLabels(isFullWidth);
    }, 100);
    
    console.log('Layout toggle switches initialized successfully!');
    console.log(`Current layout: ${isFullWidth ? 'Full Width' : 'Contained'}`);
});
