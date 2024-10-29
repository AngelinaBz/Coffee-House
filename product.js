const root = document.querySelector('.menu_main');
const coffeeBtn = document.querySelector('.coffee');
const teaBtn = document.querySelector('.tea');
const dessertBtn = document.querySelector('.dessert');
const moreBtn = document.querySelector('.more');
const body = document.body;

const response = await fetch('./products.json');
const data = await response.json();

function createCatalog(category) {
    root.innerHTML = "";
    let products = data.filter(function(card) {
        return card.category === category;
    });
    products.forEach((value, key) => {
        let newCard = document.createElement('div');
        newCard.classList.add('menu_card');
        newCard.innerHTML = `
                <div class="menu_pic">
                    <img src="assets/${value.images}"/>
                </div>
                <div class="menu_description">
                    <div class="description_block">
                        <p class="description_title">${value.name}</p>
                        <p class="description_text">${value.description}</p>
                    </div>
                    <p class="description_price">${"$"}${value.price}</p>
                </div>
        `;
        newCard.addEventListener('click', () => openModal(value.name, value.images, value.description, value.price, value.sizes, value.additives));
        root.appendChild(newCard);
        if (window.innerWidth <= 768) {
            moreBtn.style.display = 'flex';
        };
            moreBtn.addEventListener('click', function() {
            moreBtn.style.display = 'none';
            newCard.style.display = 'flex';
        })
    });
}
createCatalog("coffee");
function activeButton(button) {
    const buttons = document.querySelectorAll('.tabs_button');
    buttons.forEach(btn => {
        btn.classList.remove('active_tab');
        btn.querySelector('.menu_icon').classList.remove('active_icon');
        btn.querySelector('.tabs_text').classList.remove('active_text');
    });
    button.classList.add('active_tab');
    button.querySelector('.menu_icon').classList.add('active_icon');
    button.querySelector('.tabs_text').classList.add('active_text');
};
coffeeBtn.addEventListener('click', function() {
    createCatalog("coffee");
    activeButton(coffeeBtn);
});
teaBtn.addEventListener('click', function() {
    createCatalog("tea");
    activeButton(teaBtn);
    moreBtn.style.display = 'none';
});
dessertBtn.addEventListener('click', function() {
    createCatalog("dessert");
    activeButton(dessertBtn);
});


//Modal

const modalElem = document.querySelector('.modal');
async function openModal(name, images, description, price, sizes, additives) {
    modalElem.style.visibility ='visible';
    modalElem.style.opacity = 1;
    modalElem.innerHTML = `
        <div class="modal_main">
            <div class="modal_pic">
                <img src="assets/${images}"/>
            </div>
            <div class="modal_text">
                <div class="modal_name">
                    <p class="modal_title">${name}</p>
                    <p class="modal_description">${description}</p>
                </div>
                <div class="modal_choose">
                    <p class="choose_text">Size</p>
                    <div class="choose_button_block">
                        <div class="choose_button active_tab sizeBtn">
                            <p class="choose_icon active_icon sizeIcon">S</p>
                            <p class="choose_button_text active_text sizeText">${sizes.s.size}</p>
                        </div>
                        <div class="choose_button sizeBtn id="sizes">
                            <p class="choose_icon sizeIcon">M</p>
                            <p class="choose_button_text sizeText">${sizes.m.size}</p>
                        </div>
                        <div class="choose_button sizeBtn">
                            <p class="choose_icon sizeIcon">L</p>
                            <p class="choose_button_text sizeText">${sizes.l.size}</p>
                        </div>
                    </div>
                </div>
                <div class="modal_choose">
                    <p class="choose_text">Additives</p>
                    <div class="choose_button_block">
                        <div class="choose_button additivesBtn">
                            <p class="choose_icon addIcon">1</p>
                            <p class="choose_button_text addText">${additives[0].name}</p>
                        </div>
                        <div class="choose_button additivesBtn id="additives">
                            <p class="choose_icon addIcon">2</p>
                            <p class="choose_button_text addText">${additives[1].name}</p>
                        </div>
                        <div class="choose_button additivesBtn">
                            <p class="choose_icon addIcon">3</p>
                            <p class="choose_button_text addText">${additives[2].name}</p>
                        </div>
                    </div>
                </div>
                <div class="modal_total">
                    <p class="total">Total:</p>
                    <p class="total_price">${"$"}${price}</p>
                </div>
                <div class="info">
                    <div class="info_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <g clip-path="url(#clip0_268_12877)">
                              <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_268_12877">
                                <rect width="16" height="16" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                    </div>
                    <p class="info_text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
                </div>
                <div class="close">Close</div>
            </div>
        </div>
        `;
        body.classList.add('lock');
        modalElem.addEventListener('click', changeColorAdd);
        modalElem.addEventListener('click', changeColorSize);
        // modalElem.addEventListener('click', changeColor);
        modalElem.addEventListener('click', closeModal);
}
function closeModal(event) {
    const target = event.target;
        if (target === modalElem || target.closest(`.close`)) {
            modalElem.style.visibility ='hidden';
            modalElem.style.opacity = 0;
        }
    body.classList.remove('lock');
};
function changeColorSize(event) {
    const target = event.target;
    const closestSize = target.closest('.sizeBtn');
    const buttonGroup = closestSize.parentNode;
    const sizeButtons = Array.from(buttonGroup.querySelectorAll('.sizeBtn'));
    sizeButtons.forEach(button => {
        button.classList.remove('active_tab');
        button.querySelector('.sizeIcon').classList.remove('active_icon');
        button.querySelector('.sizeText').classList.remove('active_text');
    });
    closestSize.classList.add('active_tab');
    closestSize.querySelector('.sizeIcon').classList.add('active_icon');
    closestSize.querySelector('.sizeText').classList.add('active_text');
};
function changeColorAdd(event) {
    const target = event.target;
    const closestAdd = target.closest('.additivesBtn');
    closestAdd.classList.toggle('active_tab');
    closestAdd.querySelector('.addIcon').classList.toggle('active_icon');
    closestAdd.querySelector('.addText').classList.toggle('active_text');
};