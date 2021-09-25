// const parrafo = document.getElementById('parrafo');

// parrafo.textContent = 'texto desde JS'; //textContent cambia el texto del elemento

// parrafo.innerHTML = '<b>Texto con innerHTML</b>'; //innerHTML puede modificar el html, agregarle por ej <b>

// parrafo.classList.add('p1'); //classList.add agrega una clase

// const lista = document.getElementById('lista');

// const arr = ['primer elemento', 'segundo', 'tercero'];

// //Primera opcion

// // arr.forEach(item => {
// //     const li = document.createElement('li');  //createElement: crea un elemento html, por ej: li
// //     li.textContent = item;
// //     lista.appendChild(li); //crea un li dentro de la lista 
// // })

// //Segunda opcion con template literals
// arr.forEach(item => {
//     lista.innerHTML += `<li>${item}</li>`;
// })

const btnAumentar = document.querySelector('.btn-info');
const btnDisminuir = document.querySelector('.btn-danger');
const span = document.getElementById('resultado');
let contador = 0;

btnAumentar.addEventListener('click', () => {
    contador++;
    span.textContent = contador;
})

btnDisminuir.addEventListener('click', () => {
    contador--;
    span.textContent = contador;
})