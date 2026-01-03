document.addEventListener('DOMContentLoaded', () => {
    
    // --- PRELOADER (SU LAIKMAČIU) ---
    const preloader = document.getElementById('preloader');
    if(preloader) {
        const hidePreloader = () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        };
        // Slepiame kai užsikrauna
        window.addEventListener('load', hidePreloader);
        // Arba slepiame priverstinai po 1 sek. (jei kažkas stringa)
        setTimeout(hidePreloader, 1000);
    }

    // --- BURGER MENU ---
    const burger = document.querySelector('.burger');
    const body = document.body;
    if (burger) {
        burger.addEventListener('click', () => { body.classList.toggle('nav-active'); });
    }

    // --- HEADER SCROLL ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // --- ANIMACIJA SLENKANT ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.gallery-item, .album-card').forEach(item => observer.observe(item));

    // --- HERO SLIDER ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // --- LIGHTBOX ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lb-close">&times;</div>
            <div class="lb-counter"></div>
            <button class="lb-btn lb-prev">&#10094;</button>
            <img src="" alt="Full screen view">
            <button class="lb-btn lb-next">&#10095;</button>
        `;
        document.body.appendChild(lightbox);

        const lbImg = lightbox.querySelector('img');
        const lbCounter = lightbox.querySelector('.lb-counter');
        const closeBtn = lightbox.querySelector('.lb-close');
        const prevBtn = lightbox.querySelector('.lb-prev');
        const nextBtn = lightbox.querySelector('.lb-next');
        let index = 0;

        const open = (i) => {
            index = i;
            lbImg.src = galleryItems[index].src;
            lbCounter.innerText = `${index + 1} / ${galleryItems.length}`;
            lightbox.classList.add('active');
            body.style.overflow = 'hidden';
        };
        const close = () => { lightbox.classList.remove('active'); body.style.overflow = 'auto'; };
        const next = (e) => { if(e) e.stopPropagation(); index = (index + 1) % galleryItems.length; open(index); };
        const prev = (e) => { if(e) e.stopPropagation(); index = (index - 1 + galleryItems.length) % galleryItems.length; open(index); };

        galleryItems.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));
        closeBtn.addEventListener('click', close);
        nextBtn.addEventListener('click', next);
        prevBtn.addEventListener('click', prev);
        lightbox.addEventListener('click', (e) => { if(e.target === lightbox) close(); });
        
        // Touch support
        let touchStart = 0;
        lightbox.addEventListener('touchstart', e => touchStart = e.changedTouches[0].screenX, {passive: true});
        lightbox.addEventListener('touchend', e => {
            if (touchStart - e.changedTouches[0].screenX > 50) next();
            if (e.changedTouches[0].screenX - touchStart > 50) prev();
        }, {passive: true});
    }
});
