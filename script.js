document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('nav ul');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Keičia ikoną iš hamburger į X (pasirinktinai)
            const icon = menuBtn.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dynamic Header Background (Netflix effect)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Year
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
