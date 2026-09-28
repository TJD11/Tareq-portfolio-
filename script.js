document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const circleProgress = document.querySelectorAll('.circle-progress');

    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });

        circleProgress.forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            const progressBar = circle.querySelector('.progress-bar');
            progressBar.style.setProperty('--percent', percent);
        });
    }

    // Intersection Observer for skills animation
    const skillsSection = document.querySelector('.skills');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Contact form submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // تغيير نص الزر أثناء الإرسال
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const serviceID = 'service_vwvai8q';
            const templateID = 'template_h0vhcvf';
            const publicKey = 'zFpZcdIAFUz-0OLgM';

            emailjs.sendForm(serviceID, templateID, this, publicKey)
                .then(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset(); // تفريغ الحقول بعد الإرسال
                })
                .catch((error) => {
                    console.error('FAILED...', error);
                    alert('Oops! Something went wrong. Please try again later.');
                })
                .finally(() => {
                    // إعادة الزر لحالته الطبيعية
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});