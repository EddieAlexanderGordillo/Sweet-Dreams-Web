// materialize
// texto animado con typed
const typed = new Typed('.typed', {
  strings: [
    '<i>Pijamas Dama</i>',
    '<i>Pijamas Caballero</i>',
    '<i>Pijamas Niños/as</i>',
    '<i>Pijamas térmicas</i>',
    '<i>Pijamas Personalizadas<i>',
    '<i>Babuchas</i>',
    '<i>Accesorios</i>',
  ],

  //configuracion typed
  typeSpeed: 75,
  startDelay: 300,
  backSpeed: 75,
  smartBackspace: true,
  shuffle: false,
  backDelay: 1500,
  loop: true,
  loopCount: false,
  showCursor: false,
  cursorChar: '|',
  contentType: 'html',
});

// filtrar y mostrar productos
const cardListaProductos = document.querySelector('.lista-productos');
const seleccionCategoria = document.querySelector('#categoria');
const getInfoProducto = async () => {
  const response = await fetch('../db.json');
  return response.json();
};

const iniciarApp = async () => {
  renderizarProductosPorCategoria();
};
const crearCard = (data) => {
  const { descripcion, referencia, imagen, categoria } = data;
  const cardTemplate = `
  <div class="producto ">
    <div class="material-placeholder">
      <img
        class="materialboxed"
        src="${imagen}"
        alt=""
      />
      <h2 data-categoria${categoria}>Ref: ${referencia}</h2>
      <p>${descripcion}</p>
     </div>
  </div>
            `;
  cardListaProductos.insertAdjacentHTML('beforeend', cardTemplate);
};
const renderizarProductos = (cardsInfo) => {
  for (var i = 0; i < cardsInfo.length; i++) {
    crearCard(cardsInfo[i]);
  }

  M.AutoInit();
};
let opcionEligida = seleccionCategoria.addEventListener('change', (e) => {
  opcionEligida = e.target.value;
  // console.log(opcionEligida);
  renderizarProductosPorCategoria();
  return opcionEligida;
});
console.log(seleccionCategoria.value);
// console.log(seleccionCategoria);

function filtrarProductosCategoria({ productos, categoria }) {
  let productosFiltrados = [];
  if (categoria !== 'todo') {
    productosFiltrados = productos.filter(
      (producto) => producto.categoria === categoria
    );
  } else {
    productosFiltrados = productos;
  }
  return productosFiltrados;
}
async function renderizarProductosPorCategoria() {
  cardListaProductos.innerHTML = '';
  const productos = await getInfoProducto();
  const productosFiltrados = filtrarProductosCategoria({
    productos,
    categoria: seleccionCategoria.value,
  });
  // console.log(cardsInfo);
  renderizarProductos(productosFiltrados);
}
iniciarApp();
