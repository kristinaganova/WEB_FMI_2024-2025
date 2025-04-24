function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const current = localStorage.getItem('theme');
    localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('content-sidebar');

menuIcon.addEventListener('click', function () {
    sidebar.classList.toggle('active');
    menuIcon.classList.toggle('active');
});