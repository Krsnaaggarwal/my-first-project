// Global Challenges 2025 - Interactive JavaScript

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeCharts();
    initializeInteractiveElements();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Custom scroll animations for statistics counters
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Counter animation
function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace(/[^\d]/g, ''));
    
    if (isNaN(target)) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current = Math.min(current + step, target);
        
        // Format number with appropriate suffix
        let displayValue = Math.floor(current);
        if (text.includes('M')) {
            displayValue = (displayValue / 1000000).toFixed(1) + 'M';
        } else if (text.includes('B')) {
            displayValue = (displayValue / 1000000000).toFixed(1) + 'B';
        } else if (text.includes('%')) {
            displayValue = displayValue + '%';
        } else if (text.includes('°C')) {
            displayValue = (displayValue / 100).toFixed(2) + '°C';
        }
        
        element.textContent = text.replace(/[\d.,]+/, displayValue);
        
        if (current < target) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    updateCounter();
}

// Initialize animations
function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.overview-card, .stat-card, .solution-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Initialize interactive charts
function initializeCharts() {
    // Chart.js default configuration
    Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#6b7280';

    // Misinformation Chart - Risk Timeline
    const misinformationCtx = document.getElementById('misinformationChart');
    if (misinformationCtx) {
        new Chart(misinformationCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
                datasets: [{
                    label: 'Misinformation Risk Level',
                    data: [3, 4, 5, 6, 7, 8, 9, 10],
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#dc2626',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'Fact-checking Capacity',
                    data: [2, 3, 4, 4.5, 5, 5.2, 5.3, 5.4],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#059669',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Misinformation vs. Fact-checking Capacity (2020-2027)',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937'
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Impact Level (1-10)'
                        },
                        grid: {
                            color: 'rgba(107, 114, 128, 0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        },
                        grid: {
                            color: 'rgba(107, 114, 128, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Climate Chart - Temperature and Events
    const climateCtx = document.getElementById('climateChart');
    if (climateCtx) {
        new Chart(climateCtx, {
            type: 'bar',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'Temperature Anomaly (°C)',
                    data: [1.02, 1.11, 1.15, 1.48, 1.55, 1.6],
                    backgroundColor: 'rgba(220, 38, 38, 0.8)',
                    borderColor: '#dc2626',
                    borderWidth: 2,
                    yAxisID: 'y'
                }, {
                    label: 'Extreme Weather Events',
                    data: [416, 432, 387, 399, 423, 450],
                    type: 'line',
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Climate Crisis Indicators (2020-2025)',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937'
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperature Anomaly (°C)'
                        },
                        grid: {
                            color: 'rgba(107, 114, 128, 0.1)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Extreme Weather Events'
                        },
                        grid: {
                            drawOnChartArea: false,
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        },
                        grid: {
                            color: 'rgba(107, 114, 128, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Inequality Chart - Poverty and Employment
    const inequalityCtx = document.getElementById('inequalityChart');
    if (inequalityCtx) {
        new Chart(inequalityCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Extreme Poverty (800M+)',
                    'Informal Employment (2B)',
                    'Formal Employment (1.5B)',
                    'Unemployed (200M)'
                ],
                datasets: [{
                    data: [800, 2000, 1500, 200],
                    backgroundColor: [
                        '#dc2626',
                        '#f59e0b',
                        '#059669',
                        '#6b7280'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Global Employment & Poverty Distribution (Millions)',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937'
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map(function(label, i) {
                                        const dataset = data.datasets[0];
                                        const value = dataset.data[i];
                                        const percentage = ((value / data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                                        return {
                                            text: `${label} (${percentage}%)`,
                                            fillStyle: dataset.backgroundColor[i],
                                            strokeStyle: dataset.borderColor,
                                            pointStyle: 'circle'
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value}M people (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '40%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000
                }
            }
        });
    }
}

// Interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.overview-card, .stat-card, .solution-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Interactive crisis wheel
    const crisisWheel = document.querySelector('.crisis-wheel');
    if (crisisWheel) {
        let isHovered = false;
        
        crisisWheel.addEventListener('mouseenter', function() {
            isHovered = true;
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.1)';
        });
        
        crisisWheel.addEventListener('mouseleave', function() {
            isHovered = false;
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });

        // Add click handlers to wheel segments
        const segments = crisisWheel.querySelectorAll('.wheel-segment');
        segments.forEach((segment, index) => {
            segment.addEventListener('click', function() {
                const targetSections = ['#misinformation', '#climate', '#inequality'];
                const targetSection = document.querySelector(targetSections[index]);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
            
            segment.style.cursor = 'pointer';
            segment.title = `Click to learn about ${segment.querySelector('span').textContent}`;
        });
    }

    // Add interactive facts popup system
    createFactsPopupSystem();

    // Initialize solution card interactions
    initializeSolutionCards();

    // Add scroll progress indicator
    createScrollProgressIndicator();
}

// Facts popup system
function createFactsPopupSystem() {
    const facts = [
        {
            title: "AI-Generated Misinformation",
            content: "AI can now generate convincing fake content at a scale that human fact-checkers cannot match. A single AI system can produce thousands of misleading articles per day.",
            category: "misinformation",
            source: "AI Safety Research Institute 2025"
        },
        {
            title: "Climate Tipping Points",
            content: "Scientists warn that we're approaching 9 critical climate tipping points simultaneously, including Arctic ice loss and Amazon rainforest dieback.",
            category: "climate",
            source: "Nature Climate Change 2025"
        },
        {
            title: "Digital Divide Impact",
            content: "57.8% of global workers lack access to digital tools and training needed for the green economy transition, potentially leaving 2 billion people behind.",
            category: "inequality",
            source: "International Labour Organization 2025"
        },
        {
            title: "Misinformation Spread Speed",
            content: "False news spreads 6 times faster than true news on social media platforms, and AI-generated content spreads even faster.",
            category: "misinformation",
            source: "MIT Technology Review 2025"
        },
        {
            title: "Extreme Weather Economics",
            content: "Climate-related disasters caused $90 billion in damages in 2024 alone, with costs expected to double by 2030.",
            category: "climate",
            source: "Munich Re Climate Risk Report 2025"
        }
    ];

    // Create facts popup element
    const factsPopup = document.createElement('div');
    factsPopup.className = 'facts-popup';
    factsPopup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 350px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        padding: 20px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 1000;
        border-left: 4px solid #2563eb;
    `;
    document.body.appendChild(factsPopup);

    // Show random facts periodically
    let factIndex = 0;
    setInterval(() => {
        if (factIndex < facts.length) {
            showFact(facts[factIndex], factsPopup);
            factIndex++;
        } else {
            factIndex = 0;
        }
    }, 15000); // Show a new fact every 15 seconds

    function showFact(fact, popup) {
        popup.innerHTML = `
            <div class="fact-header">
                <h4 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px;">${fact.title}</h4>
                <button class="fact-close" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 20px; cursor: pointer; color: #6b7280;">&times;</button>
            </div>
            <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">${fact.content}</p>
            <div class="fact-source" style="font-size: 12px; color: #9ca3af; font-style: italic;">Source: ${fact.source}</div>
        `;

        // Show popup
        popup.style.transform = 'translateX(0)';

        // Add close functionality
        const closeBtn = popup.querySelector('.fact-close');
        closeBtn.addEventListener('click', () => {
            popup.style.transform = 'translateX(400px)';
        });

        // Auto-hide after 10 seconds
        setTimeout(() => {
            popup.style.transform = 'translateX(400px)';
        }, 10000);
    }
}

// Solution cards interactions
function initializeSolutionCards() {
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            // Create modal for solution details
            showSolutionModal(title, description);
        });
        
        card.style.cursor = 'pointer';
        card.title = 'Click to learn more about this solution';
    });
}

// Solution modal
function showSolutionModal(title, description) {
    const modal = document.createElement('div');
    modal.className = 'solution-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        backdrop-filter: blur(5px);
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 16px;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    `;

    modalContent.innerHTML = `
        <h3 style="margin: 0 0 20px 0; color: #1f2937;">${title}</h3>
        <p style="margin: 0 0 30px 0; color: #6b7280; line-height: 1.6;">${description}</p>
        <div style="margin-bottom: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
            <strong style="color: #1f2937;">Implementation Status:</strong> Concept Phase<br>
            <strong style="color: #1f2937;">Target Launch:</strong> 2025-2026<br>
            <strong style="color: #1f2937;">Potential Impact:</strong> Global Scale
        </div>
        <button class="close-modal" style="background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modalContent.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Scroll progress indicator
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Utility functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.solution-modal');
        modals.forEach(modal => modal.remove());
        
        const popups = document.querySelectorAll('.facts-popup');
        popups.forEach(popup => {
            popup.style.transform = 'translateX(400px)';
        });
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault();
        const sections = ['#overview', '#misinformation', '#climate', '#inequality', '#solutions'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (currentIndex < sections.length - 1) {
            const nextSection = document.querySelector(sections[currentIndex + 1]);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    if (e.key === 'ArrowUp' && e.altKey) {
        e.preventDefault();
        const sections = ['#home', '#overview', '#misinformation', '#climate', '#inequality', '#solutions'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (currentIndex > 0) {
            const prevSection = document.querySelector(sections[currentIndex - 1]);
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

function getCurrentSection() {
    const sections = ['#home', '#overview', '#misinformation', '#climate', '#inequality', '#solutions'];
    const scrollY = window.scrollY;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]);
        if (section && scrollY >= section.offsetTop - 100) {
            return sections[i];
        }
    }
    
    return '#home';
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            if (loadTime > 3000) {
                console.warn('Page load time is high:', loadTime, 'ms');
            }
        }, 0);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}