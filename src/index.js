// materialize
document.addEventListener('DOMContentLoaded', function () {
  M.AutoInit();
});
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

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
const getInfoProducto = async () => {
  const response = await fetch('../db.json');
  return response.json();
};

const iniciarApp = async () => {
  const cardsInfo = await getInfoProducto();
  console.log(cardsInfo);
  // filtarCategoria(cardsInfo);
  // filtarProductoCategoria(cardsInfo);
  renderCards(cardsInfo);
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
      <h2>Ref: ${referencia}</h2>
      <p>${descripcion}</p>
     </div>
  </div>
            `;
  const cardListaProductos = document.querySelector('.lista-productos');
  cardListaProductos.insertAdjacentHTML('beforeend', cardTemplate);
};
const renderCards = (cardsInfo) => {
  for (var i = 0; i < cardsInfo.length; i++) {
    crearCard(cardsInfo[i]);
  }
};
const seleccionCategoria = document.querySelector('#categoria');
let opcionEligida = seleccionCategoria.addEventListener('change', (e) => {
  opcionEligida = e.target.value;
  // console.log(opcionEligida);
  return opcionEligida;
});
iniciarApp();
console.log(opcionEligida);
// console.log(seleccionCategoria);

// function filtarProductoCategoria(arrayProducto) {
//   let productoFiltrado = arrayProducto.filter(
//     (producto) => producto.categoria === 'pijamas'
//   );
//   renderCards(productoFiltrado);
//   console.log(productoFiltrado);
// }

// function filtarProductoCategoria(arrayProducto) {
//   switch (opcionEligida) {
//     case 'personalizadas':
//       let productoFiltrado = arrayProducto.filter(
//         (producto) => producto.categoria === 'personalizadas'
//       );
//       console.log(productoFiltrado);
//       break;

//     default:
//       break;
//   }
//   let productoFiltrado = arrayProducto.filter(
//     (producto) => producto.categoria === opcionSelect
//   );
//   console.log(productoFiltrado);
// }
