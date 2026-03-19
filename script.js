document.addEventListener('DOMContentLoaded', () => {
    const washForm = document.getElementById('washForm');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Smooth Scroll Offset for Sticky Header
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetPosition = document.querySelector(targetId).offsetTop;
            window.scrollTo({
                top: targetPosition - 80, // Adjust for sticky nav height
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    // Form Submission Handling
    if (washForm) {
        washForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Form Data
            const name = document.getElementById('custName').value;
            const packageName = document.getElementById('package').value;
            const washDate = document.getElementById('date').value;
            const address = document.getElementById('address').value;
            const pincode = document.getElementById('pincode').value;
            
            // Construct WhatsApp Message
            const whatsappNumber = "918848900790";
            const message = `*ShineXpress Booking* 🚗✨\n\n` +
                          `*Package:* ${packageName}\n` +
                          `*Customer:* ${name}\n` +
                          `*Date:* ${washDate}\n` +
                          `*Address:* ${address}\n` +
                          `*Pincode:* ${pincode}`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
            
            washForm.reset();
        });
    }

    // Scroll Header Style
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(13, 13, 13, 0.95)';
            nav.style.padding = '12px 0';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(13, 13, 13, 0.8)';
            nav.style.padding = '20px 0';
            nav.style.boxShadow = 'none';
        }
    });
});
