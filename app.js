// const parrafo = document.getElementById('parrafo');

// parrafo.textContent = 'texto desde JS'; //textContent cambia el texto del elemento

// parrafo.innerHTML = '<b>Texto con innerHTML</b>'; //innerHTML puede modificar el html, agregarle por ej <b>

// parrafo.classList.add('p1'); //classList.add agrega una clase


const lista = document.getElementById('lista');
console.log(lista);

const li = document.createElement('li');
li.textContent = 'primer elemento de lista';

lista.appendChild(li);
