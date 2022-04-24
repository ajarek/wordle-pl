"use strict";
const items = document.querySelectorAll('.item');
const keys = document.querySelectorAll('.key');
const del = document.querySelector('#del');
const ent = document.querySelector('#ent');
const info = document.querySelector('.title>h4');
let arrLetters = [];
let arrCorrect = [];
let arrWords = [
    "głowa", "wyraz", "taśma", "wafel", "ramka", "karta", "kwiat", "sufit", "ogień", "jedza", "super", "linka", "łyżka", "pudło", "szafa", "mięso", "obraz", "język", "włosy", "pomoc", "wieża", "bluza", "płyta", "gumka", "kości", "głowa", "sklep", "kubek", "nożyk", "deska", "ławka", "szyba", "niebo", "dzień", "pasja", "dział", "temat", "autor", "oczko", "ramka", "karta", "baton", "trawa", "lampa", "konto", "cytat", "głowa", "łóżko", "drzwi", "zegar", "klasa", "worek", "śledź", "ogród", "kreda", "balon", "okrąg", "żabka", "budka", "żurek", "kabel", "nauka", "karma", "kefir", "konie", "komin", "lilia", "świat", "laska", "życie", "atlas", "komar", "sosna", "czapa", "górka", "babka", "droga", "miska", "domek", "autko", "linia", "tarka", "ulica", "kotek", "lisek", "pajac", "łezka", "wiatr", "ferie", "lanie", "honor", "motyl", "fotka", "tubka", "patyk", "tarło", "masło", "miara", "rosół", "serce", "wiara", "konik", "suseł", "wieko",
];
let randomWord = arrWords[Math.floor(Math.random() * arrWords.length)];
let password = randomWord.toUpperCase().split('');
//console.log(password.join(''))
function displayLetter(e) {
    const ev = e.target;
    const textkeys = ev.innerText;
    if (textkeys !== '⇽' && textkeys !== 'ENTER') {
        arrLetters.push(textkeys);
        ev.classList.add('correct');
    }
    for (let i = 0; i < arrLetters.length; i++) {
        items[i].innerText = arrLetters[i];
    }
}
function deleteLetter() {
    const len = arrLetters.length;
    if (len === 0) {
        del.removeEventListener('click', deleteLetter);
        return;
    }
    let text = items[len - 1].innerText;
    arrLetters.pop();
    items[len - 1].innerText = "";
    keys.forEach(key => {
        if (key.innerText === text) {
            key.classList.remove('correct');
        }
    });
}
function checkPassword() {
    for (let i = 0; i < arrLetters.length; i++) {
        if (password.includes(arrLetters[i])) {
            items[i].classList.add('maybe');
        }
        if (arrLetters[i] == password[i % 5]) {
            items[i].classList.remove('maybe');
            items[i].classList.add('correct');
            arrCorrect.push(arrLetters[i]);
        }
        else {
            items[i].classList.add('wrong');
        }
        checkIfWin();
    }
    checkIfLose();
}
function checkIfWin() {
    if (arrCorrect.slice(-5).join('') === password.join('')) {
        info.innerText = 'Wygrałeś ,tak hasło to: ' + password.join('');
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}
function checkIfLose() {
    if (arrLetters.length === 30 && arrCorrect.slice(-5).join('') !== password.join('')) {
        info.innerText = 'Przegrałeś, hasło to: ' + password.join('');
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}
//event listener
keys.forEach(key => key.addEventListener('click', displayLetter));
ent.addEventListener('click', checkPassword);
del.addEventListener('click', deleteLetter);
