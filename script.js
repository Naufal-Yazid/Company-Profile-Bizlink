document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SET CURRENT YEAR IN FOOTER ---
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- 2. STICKY NAVBAR EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. MOBILE MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navIcon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            navIcon.classList.replace('bx-x', 'bx-menu');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navIcon.classList.replace('bx-x', 'bx-menu');
        });
    });

    // --- 4. BACKGROUND HERO IMAGE SLIDER LOGIC ---
    const slides = document.querySelectorAll('.hero-bg-slider .slide');
    const dots = document.querySelectorAll('.dot-nav');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // 5 Detik

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            goToSlide(nextIndex);
        }

        let sliderTimer = setInterval(nextSlide, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                clearInterval(sliderTimer);
                sliderTimer = setInterval(nextSlide, slideInterval);
            });
        });
    }

    // --- 5. SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.fade-up');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 6. NUMBER COUNTER ANIMATION ---
    const counters = document.querySelectorAll('.counter');
    let isCounted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100; 
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isCounted) {
                runCounters();
                isCounted = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // --- 7. FAQ ACCORDION LOGIC ---
    const accordions = document.querySelectorAll('.accordion-btn');

    accordions.forEach(btn => {
        btn.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            document.querySelectorAll('.accordion-btn').forEach(b => {
                b.classList.remove('active');
                b.nextElementSibling.style.maxHeight = null;
            });

            if (!isActive) {
                this.classList.add('active');
                const content = this.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- 8. PORTFOLIO IMAGE SLIDER LOGIC ---
    const portSlides = document.querySelectorAll('.portfolio-slider .port-slide');
    
    if (portSlides.length > 0) {
        let currentPortSlide = 0;
        const portSlideInterval = 4000; // 4 Detik

        function nextPortSlide() {
            portSlides[currentPortSlide].classList.remove('active');
            currentPortSlide = (currentPortSlide + 1) % portSlides.length;
            portSlides[currentPortSlide].classList.add('active');
        }

        setInterval(nextPortSlide, portSlideInterval);
    }

    // --- 9. INTERACTIVE STAR RATING LOGIC ---
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('fbRating');

    if (stars.length > 0) {
        stars.forEach(star => {
            
            // Efek Hover
            star.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.classList.replace('bx-star', 'bxs-star'); // Solid star
                        s.classList.add('hovered');
                    } else {
                        s.classList.replace('bxs-star', 'bx-star'); // Outline star
                        s.classList.remove('hovered');
                    }
                });
            });

            // Efek Hapus Hover
            star.addEventListener('mouseout', function() {
                const selectedValue = ratingInput.value;
                stars.forEach(s => {
                    s.classList.remove('hovered');
                    if (selectedValue && s.getAttribute('data-value') <= selectedValue) {
                        s.classList.replace('bx-star', 'bxs-star');
                        s.classList.add('active');
                    } else {
                        s.classList.replace('bxs-star', 'bx-star');
                        s.classList.remove('active');
                    }
                });
            });

            // Efek Klik
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                ratingInput.value = value;
                
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.classList.replace('bx-star', 'bxs-star');
                        s.classList.add('active');
                    } else {
                        s.classList.replace('bxs-star', 'bx-star');
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    // --- 10. FEEDBACK FORM SUBMISSION VIA MAILTO ---
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Ambil data input
            const name = document.getElementById('fbName').value.trim();
            const email = document.getElementById('fbEmail').value.trim();
            const rating = document.getElementById('fbRating').value;
            const message = document.getElementById('fbMessage').value.trim();
            
            // Validasi Rating Bintang
            if (!rating) {
                alert('Mohon pilih rating layanan terlebih dahulu (klik ikon bintang).');
                return;
            }
            
            const targetEmail = "hansci78@gmail.com";
            const subject = `Feedback Layanan BizLink dari ${name}`;
            
            const bodyMessage = `Halo Tim BizLink,\n\nBerikut adalah feedback pelayanan dari form website:\n\nNama Lengkap: ${name}\nAlamat Email: ${email}\nRating Layanan: ${rating} Bintang\n\nIsi Feedback:\n${message}\n\nTerima kasih.`;
            
            const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyMessage)}`;
            
            window.location.href = mailtoLink;
        });
    }

});