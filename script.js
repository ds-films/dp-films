document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('nav ul');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Dynamic Year in Footer
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
