const inputToDo = document.querySelector('input');
const likeUl = document.querySelector('.like-list');
const hateUl = document.querySelector('.hate-list');

let likes = [];
let hates = [];

function handleSubmit (e) {
    if (e.keyCode !== 13) return;
    const crrValue = inputToDo.value;
    paintLikes(crrValue);
    inputToDo.value = '';
}

function paintLikes (text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const switchBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    
    likeUl.appendChild(li);
    li.appendChild(span);
    li.appendChild(switchBtn);
    li.appendChild(delBtn);

    span.innerText = text;
    switchBtn.innerText = '💔';
    delBtn.innerText = '❌';

    switchBtn.classList.add('switch-btn');
    delBtn.classList.add('del-btn');

    switchBtn.addEventListener('click', handleSwitch);
    delBtn.addEventListener('click', handleDelete);

    likes.push(text);
    saveLikes();
}

function saveLikes () {
    localStorage.setItem('likes', JSON.stringify(likes));
}

function loadLikes () {
    const loadedLikes = localStorage.getItem('likes');
    if (loadedLikes !== null) {
        const parsedLikes = JSON.parse(loadedLikes);
        for (let i = 0; i < parsedLikes.length; i++) {
            paintLikes(parsedLikes[i]);    
        }
    }
}

function paintHates (text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const switchBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    
    hateUl.appendChild(li);
    li.appendChild(span);
    li.appendChild(switchBtn);
    li.appendChild(delBtn);

    span.innerText = text;
    switchBtn.innerText = '💖';
    delBtn.innerText = '❌';

    switchBtn.classList.add('switch-btn');
    delBtn.classList.add('del-btn');

    switchBtn.addEventListener('click', handleSwitch);
    delBtn.addEventListener('click', handleDelete);

    hates.push(text);
    saveHates();

}

function saveHates () {
    localStorage.setItem('hates', JSON.stringify(hates));
}

function loadHates () {
    const loadedHates = localStorage.getItem('hates');
    if (loadedHates !== null) {
        const parsedHates = JSON.parse(loadedHates);
        for (let i = 0; i < parsedHates.length; i++) {
            paintHates(parsedHates[i]);
        }
    }
}

function handleSwitch (e) {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const crrValue = e.target.parentNode.querySelector('span').innerText;
    
    if (ul.classList.contains('like-list')) {
        paintHates(crrValue);
    }
    if (ul.classList.contains('hate-list')) {
        paintLikes(crrValue)
    }
    handleDelete(e);
}

function handleDelete (e) {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    if (ul.classList.contains('like-list')) {
        likeUl.removeChild(li);        
        const likeIndex = likes.indexOf(li.querySelector('span').innerText);
        likes.splice(likeIndex,1);
    }
    if (ul.classList.contains('hate-list')) {
        hateUl.removeChild(li);        
        const hateIndex = hates.indexOf(li.querySelector('span').innerText);
        hates.splice(hateIndex,1);
    }
    localStorage.setItem('likes',JSON.stringify(likes));
    localStorage.setItem('hates',JSON.stringify(hates))
}

function init() {
    loadLikes();
    loadHates();
    inputToDo.addEventListener('keydown', handleSubmit);
}

init()