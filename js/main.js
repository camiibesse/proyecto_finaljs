let productos = [];
const URL = '../js/productos.json';
fetch(URL)
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");





function cargarProductos(productosElegidos) {
    productosElegidos.forEach(producto => {contenedorProductos.innerHTML += mostrarCard(producto)})
    actualizarBotonesAgregar();
}


// botonesCategorias.forEach(boton => {
//     boton.addEventListener("click", (e) => {

//         botonesCategorias.forEach(boton => boton.classList.remove("active"));
//         e.currentTarget.classList.add("active");

//         if (e.currentTarget.id != "todos") {
//             const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
//             tituloPrincipal.innerText = productoCategoria.categoria.nombre;
//             const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
//             cargarProductos(productosBoton);
//         } else {
//             tituloPrincipal.innerText = "Todos los productos";
//             cargarProductos(productos);
//         }

//     })
// });

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Se agregó el producto al carrito',
        showConfirmButton: false,
        timer: 1500
      });
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}