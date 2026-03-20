document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    // Initial state: body should not scroll
    document.body.classList.add('preloader-active');

    // Page Load Handler
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
                document.body.classList.remove('preloader-active');
            }
        }, 2200); // Increased to allow the roll-zoom animation to finish
    });

    const washForm = document.getElementById('washForm');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.getElementById('navbar');

    // Smooth Scroll Offset for Sticky Header
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            const targetPosition = targetElement.offsetTop;
            window.scrollTo({
                top: targetPosition - 80,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Target inner cards if visible
                const animateElements = entry.target.querySelectorAll('.animate');
                animateElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('is-visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Form Submission Handling
    if (washForm) {
        washForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Data
            const name = document.getElementById('custName').value;
            const packageName = document.getElementById('package').value;
            const washDate = document.getElementById('date').value;
            const address = document.getElementById('address').value;
            
            // Construct WhatsApp Message
            const whatsappNumber = "918848900790";
            const message = `*ShineXpress Booking* 🚗✨\n\n` +
                          `*Package:* ${packageName}\n` +
                          `*Customer:* ${name}\n` +
                          `*Date:* ${washDate}\n` +
                          `*Address:* ${address}\n\n` +
                          `_Sent via ShineXpress Website_`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
            
            washForm.reset();
        });
    }

    // Scroll Header Styling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
