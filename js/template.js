function mostrarCard(producto){
    return` <div class="card">
            <div class="card-image">
            <img src="${producto.imagen}">
            </div>
            <div class="card-content">
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            </div>`
}