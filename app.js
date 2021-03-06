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

const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {};

//Events
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito();
    }
});

cards.addEventListener('click', e => {
    addCarrito(e);
});

items.addEventListener('click', e => { btnAumentarDisminuir(e) })
//Traer productos desde json
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
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl);
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    cards.appendChild(fragment);
}

// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito();
}

const pintarCarrito = () => {
    items.innerHTML = '';

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);

    pintarFooter();

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vac??o - comience a comprar!</th>
        `
        return
    }

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio , 0);
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        carrito = {};
        pintarCarrito();
    })
}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++;
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito();
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--;
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito();
    }

    e.stopPropagation();
}