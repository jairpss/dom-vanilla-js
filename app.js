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

//Counter
// const btnAumentar = document.querySelector('.btn-info');
// const btnDisminuir = document.querySelector('.btn-danger');
// const span = document.getElementById('resultado');
// let contador = 0;

// btnAumentar.addEventListener('click', () => {
//     contador++;
//     span.textContent = contador;
// })

// btnDisminuir.addEventListener('click', () => {
//     contador--;
//     span.textContent = contador;
// })

const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCards(data);
    } catch (error) {
        console.log(error);
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
}