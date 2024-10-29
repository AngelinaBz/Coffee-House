const menu = document.querySelector('.nav');
const menuBtn = document.querySelector('.hamburger');
const body = document.body;

if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })
    menu.querySelectorAll('.menu_item').forEach(linker => {
        linker.addEventListener('click', () => {
        menu.classList.remove('active')
        menuBtn.classList.remove('active')
        body.classList.remove('lock')
        })
    })
}