import 'normalize.css';
import './index.less';

let idCard = -1;

class Card{
    constructor(name, link, description, code, provider) {
        this.name = name;
        this.link = link;
        this.description = description;
        this.code = code;
        this.provider = provider;
    }

}

function setupCards() {
    const lemon = new Card(
        'Лэмон',
        'https://avatars.dzeninfra.ru/get-zen_doc/44645/pub_59ca7fd977d0e6cec96d88fb_59ca805a57906a990a0c0840/scale_1200',
        'Кислый',
        '228322',
        'Лэмонелло'
    );
    const watermellon = new Card(
        'Мистер Арбуз',
        'https://masterpiecer-images.s3.yandex.net/992b7a7073d311ee94a42ab2a9c6ab46:upscaled',
        'Арбузный',
        '228323',
        'Жорданчик'
    );
    const salak = new Card(
        'Салак',
        'https://frutsnab.ru/wa-data/public/shop/products/19/15/1519/images/3610/3610.970.jpg',
        'Не знаю что писать',
        '123456',
        'Нет'
    );

    const cards = [lemon, watermellon, salak];

    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function getCards() {
    const cards = JSON.parse(window.localStorage.getItem('cards'));
    for(let i = 0; i < cards.length; ++i){
        const card = cards[i];

        const sCardItem = document.createElement('div');
        sCardItem.id = `item${i}`;
        sCardItem.setAttribute('class', 'form-card__item');
        document.getElementsByClassName('form-card__list_item')[0].appendChild(sCardItem);

        const sCardCode = document.createElement('div');
        sCardCode.id = `code${i}`
        sCardCode.setAttribute('class', 'form-card__code');
        sCardCode.textContent = `Код товара: ${card.code}`;
        document.getElementById(`item${i}`).appendChild(sCardCode);

        const sCardRow = document.createElement('div');
        sCardRow.id = `row${i}`;
        sCardRow.setAttribute('class', 'form-card__row');
        document.getElementById(`item${i}`).appendChild(sCardRow)

        const sCardImage = document.createElement('img');
        sCardImage.setAttribute('class', 'form-card__img');
        sCardImage.src = card.link;
        document.getElementById(`row${i}`).appendChild(sCardImage);

        const sCardName = document.createElement('div');
        sCardName.setAttribute('class', 'form-card__name')
        sCardName.textContent = `Название товара: ${card.name}`;
        document.getElementById(`row${i}`).appendChild(sCardName);

        const sCardProvider = document.createElement('div');
        sCardProvider.setAttribute('class', 'form-card__provider');
        sCardProvider.textContent = `Поставщик: ${card.provider}`;
        document.getElementById(`item${i}`).appendChild(sCardProvider);

        const sCardDescription = document.createElement('div');
        sCardDescription.setAttribute('class', 'form-card__description');
        sCardDescription.textContent = `Описание: ${card.description}`;
        document.getElementById(`item${i}`).appendChild(sCardDescription);

        const sCardButtonsRow = document.createElement('div');
        sCardButtonsRow.id = `buttons-row${i}`;
        sCardButtonsRow.setAttribute('class', 'form-card__row');
        document.getElementById(`item${i}`).appendChild(sCardButtonsRow);

        const sCardEditButton = document.createElement('button');
        sCardEditButton.id = `edit-card${i}`;
        sCardEditButton.setAttribute('class', 'form-card__edit-button');
        sCardEditButton.textContent = 'Редактировать';
        sCardEditButton.addEventListener('click', editCard);
        sCardEditButton.pos = i;
        document.getElementById(`buttons-row${i}`).appendChild(sCardEditButton);

        const sCardDeleteButton = document.createElement('button');
        sCardDeleteButton.id = `delete-card${i}`;
        sCardDeleteButton.setAttribute('class', 'form-card__delete-button');
        sCardDeleteButton.textContent = 'Удалить';
        sCardDeleteButton.addEventListener('click', deleteCard);
        sCardDeleteButton.pos = i;
        document.getElementById(`buttons-row${i}`).appendChild(sCardDeleteButton);
    }
}

function createCard() {
    const card = getFormData(form);

    if(card.name === '' || card.link === '' || card.description === '' || card.code === '' || card.provider === ''){
        alert('Не все поля были заполнены. Для того, чтобы продолжить необходимо заполнить все поля.');
        throw new Error();
    }

    let cards = JSON.parse(window.localStorage.getItem('cards'));
    const idCardForUpdate = cards.findIndex(el => el.code === card.code);

    if(idCard >= 0) {
        cards[idCard] = card;
    } else if(idCardForUpdate >= 0) {
        cards[idCardForUpdate] = card;
    } else {
        if(cards){
            cards.push(card);
        } else{
            cards = [card]
        }
    }

    const createButton = document.getElementById('create-card');
    createButton.textContent = 'Создать';

    idCard = -1;

    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function editCard(){
    const cards = JSON.parse(window.localStorage.getItem('cards'));
    idCard = event.target.pos;

    const card = cards[idCard];

    const formInputName = document.getElementById('input-name');
    formInputName.value = card.name;

    const formInputLink = document.getElementById('input-link');
    formInputLink.value = card.link;

    const formInputDescription = document.getElementById('input-desc');
    formInputDescription.value = card.description;

    const formInputCode = document.getElementById('input-code');
    formInputCode.value = card.code;

    const formInputProvider = document.getElementById('input-provider');
    formInputProvider.value = card.provider;

    const createButton = document.getElementById('create-card');
    createButton.textContent = 'Подтвердить';
}

function deleteCard(){
    const cards = JSON.parse(window.localStorage.getItem('cards'));
    cards.splice(event.target.pos, 1);
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function getFormData(form) {
    validateForm();
    const data = Array.from((new FormData(form)).entries());
    const card = new Card();
    for(let i = 0; i < data.length; ++i){
        let [key, value] = data[i];
        card[`${key}`] = value;
    }
    return card;
}

function validateForm(){

    function removeError(input){
        const parent = input.parentNode;
        if(parent.classList.contains('form__error')){
            parent.querySelector('.form__error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text){
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');
        errorLabel.classList.add('form__error-label');
        errorLabel.textContent = text;
        parent.classList.add('form__error');

        input.classList.add('form__error-border')
        parent.append(errorLabel);
    }

    let result = true;
    const inputs = form.querySelectorAll('input');

    for(const input of inputs){

        removeError(input);

        if(input.dataset.maxLength){
            if(input.value.length > input.dataset.maxLength){
                createError(input, 'Поле не заполнено')
                result = false;
            }
        }

        if(input.dataset.required === "true"){
            if(input.value === ""){
                createError(input, 'Поле не заполнено')
                result = false;
            }
        }
    }

    const textAreas = form.querySelectorAll('textarea');

    for(const textArea of textAreas){

        removeError(textArea);

        if(textArea.dataset.maxLength){
            if(textArea.value.length > textArea.dataset.maxLength){
                createError(textArea, 'Поле не заполнено')
                result = false;
            }
        }

        if(textArea.dataset.required === "true"){
            if(textArea.value === ""){
                createError(textArea, 'Поле не заполнено')
                result = false;
            }
        }
    }

    return result;
}


const createButton = document.getElementById('create-card');
const setupButton = document.getElementById('setup-cards');
const form = document.getElementById('input-form')
createButton.addEventListener('click', createCard);
setupButton.addEventListener('click', setupCards);

window.onload = getCards