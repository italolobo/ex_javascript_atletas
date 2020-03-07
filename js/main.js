console.dir(document);

// writing
document.write('hello world');

// find elements
let ul = document.getElementById('list');
console.log(document.getElementsByTagName('ul'));
console.log(document.getElementsByClassName('myclass'));

// generate content
ul.innerHTML = '<li>new li</li>';
// ul.innerText = '<li>new li</li>';
console.dir(ul);
console.log(ul);


// add css class (include bootstrap from cdn)
let btnMinus = document.querySelector('[name="minus"]');
btnMinus.classList.add('btn', 'btn-primary');
// btnMinus.style.height = "80px";
// btnMinus.style['background-color'] = 're d';
btnMinus.addEventListener('click', clickHandler);
function clickHandler(event) {
    console.log('event triggered');
    console.log('event => ', event);
    console.log('context => ', this);
//    this.removeEventListener('click', clickHandler);
}

// read values (create a new element)
let input = document.getElementsByName('random-input')[0]; // why is it an array?
console.log(input.value, input.value + 1);

// what will be the result of typeof of the value of an input? And if the input type is numeric?
console.log(typeof input.value);

// exercise: do a calculator with 4 buttons for operators and equal for the result!
console.log(parseInt(input.value));

function plus() {
    console.log('plus');
}

// incorporate PEG.js