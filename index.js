// Initialize AOS
AOS.init();

// PROFILE PICTURE UPLOAD
const uploadInput = document.getElementById('upload-picture');
const displayPicture = document.getElementById('display-picture');

uploadInput.addEventListener('change', function() {
    const file = this.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function() {
            displayPicture.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
});

// THEME SWITCH
const themeSelector = document.getElementById('theme-selector');

// Load saved theme
const savedTheme = localStorage.getItem('selectedTheme');
if(savedTheme) {
    document.body.className = savedTheme;
    themeSelector.value = savedTheme;
}

themeSelector.addEventListener('change', () => {
    const theme = themeSelector.value;
    document.body.className = theme;
    localStorage.setItem('selectedTheme', theme);
});

// SMOOTH SCROLLING
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// BACK TO TOP BUTTON
const backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.textContent = '↑';
document.body.appendChild(backToTop);

backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: none;
    padding: 10px 15px;
    font-size: 20px;
    border: none;
    border-radius: 50%;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    z-index: 1000;
`;

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// ACTIVE NAV LINK HIGHLIGHT
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if(scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
