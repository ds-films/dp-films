document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu & Header Logic (Jau turi šitą, palik)
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('nav ul');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // FAQ Accordion Logic (NAUJA DALIS)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Uždaro kitus atidarytus (jei nori, kad tik vienas būtų atviras)
            const currentlyActive = document.querySelector('.faq-question.active');
            if(currentlyActive && currentlyActive !== question) {
                currentlyActive.classList.remove('active');
                currentlyActive.nextElementSibling.style.maxHeight = null;
            }

            // Atidaro/Uždaro paspaustą
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Copyright Metai
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
