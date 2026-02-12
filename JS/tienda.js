// ============================================================
// Spider-Shop - Taller JS + DOM
// Requisitos:
// 1) Agregar productos al carrito (sumar cantidad si existe)
// 2) Mostrar carrito al hacer hover del ícono (ya lo hace CSS)
// 3) Vaciar carrito (HTML + JS)
// 4) Agregar nuevo artículo desde formulario (mín 6 atributos)
// 5) Validar precio >= 1000
// ============================================================

// ---------------- CAPTURAR ELEMENTOS DEL DOM ----------------
const productsGrid = document.getElementById("productsGrid");

// Carrito
const cartTbody = document.getElementById("cartTbody");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");
const cartEmptyMsg = document.getElementById("cartEmptyMsg");
const emptyCartBtn = document.getElementById("emptyCartBtn");

// Formulario
const addProductForm = document.getElementById("addProductForm");
const nameInput = document.getElementById("nameInput");
const att1Input = document.getElementById("att1Input");
const att2Input = document.getElementById("att2Input");
const att3Input = document.getElementById("att3Input");
const imgInput = document.getElementById("imgInput");
const priceInput = document.getElementById("priceInput");

// ---------------- DATA (productos + carrito) ----------------
// Productos iniciales (puedes cambiarlos a tu gusto)
let products = [
  {
    id: 1,
    name: "Figura Spider-Man",
    price: 25000,
    imageUrl: "https://resources.claroshop.com/medios-plazavip/fotos/productos_sears1/original/4206066.jpg",
    att1: "Material: PVC",
    att2: "Tamaño: 15 cm",
    att3: "Edición: Especial",
  },
  {
    id: 2,
    name: "Camiseta Spider-Man",
    price: 45000,
    imageUrl: "https://otakutienda.com/cdn/shop/files/Spiderman_2.jpg?v=1750604451",
    att1: "Talla: M",
    att2: "Color: Rojo/Azul",
    att3: "Algodón 100%",
  },
  {
    id: 3,
    name: "Póster Coleccionable",
    price: 18000,
    imageUrl: "https://images.cdn2.buscalibre.com/fit-in/360x360/ec/a5/eca5c593de9d0b95c4e9723911bce842.jpg",
    att1: "Medida: 50x70",
    att2: "Acabado: Mate",
    att3: "Incluye marco: No",
  },
];

// Carrito: [{ id, name, price, imageUrl, qty }]
let cart = [];

// ---------------- FUNCIONES (obligatorio usar funciones) ----
function formatCOP(value) {
  // Formato de moneda COP simple
  return "$" + value.toLocaleString("es-CO");
}

function findProductById(productId) {
  return products.find((p) => p.id === productId);
}

function addToCart(productId) {
  const product = findProductById(productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      qty: 1,
    });
  }

  renderCart();
}

function emptyCart() {
  cart = [];
  renderCart();
}

function getCartCount() {
  return cart.reduce((acc, item) => acc + item.qty, 0);
}

function getCartTotal() {
  return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
}

function renderProducts() {
  productsGrid.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";

    // Imagen
    const img = document.createElement("img");
    img.src = p.imageUrl;
    img.alt = p.name;

    // Info
    const info = document.createElement("div");
    info.className = "info";

    const title = document.createElement("h3");
    title.textContent = p.name;

    const list = document.createElement("ul");
    const li1 = document.createElement("li");
    li1.textContent = p.att1;
    const li2 = document.createElement("li");
    li2.textContent = p.att2;
    const li3 = document.createElement("li");
    li3.textContent = p.att3;
    list.append(li1, li2, li3);

    const bottom = document.createElement("div");
    bottom.className = "bottom";

    const price = document.createElement("strong");
    price.textContent = formatCOP(p.price);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Agregar al carrito";
    btn.addEventListener("click", () => addToCart(p.id));

    bottom.append(price, btn);
    info.append(title, list, bottom);

    card.append(img, info);
    productsGrid.appendChild(card);
  });
}

function renderCart() {
  cartTbody.innerHTML = "";

  const count = getCartCount();
  cartBadge.textContent = String(count);

  // Mostrar mensaje "vacío" si no hay items
  if (cart.length === 0) {
    cartEmptyMsg.style.display = "block";
  } else {
    cartEmptyMsg.style.display = "none";
  }

  cart.forEach((item) => {
    const tr = document.createElement("tr");

    const tdImg = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.name;
    img.style.width = "42px";
    img.style.height = "42px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "8px";
    tdImg.appendChild(img);

    const tdName = document.createElement("td");
    tdName.textContent = item.name;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = formatCOP(item.price);

    const tdQty = document.createElement("td");
    tdQty.textContent = String(item.qty);

    tr.append(tdImg, tdName, tdPrice, tdQty);
    cartTbody.appendChild(tr);
  });

  cartTotal.textContent = formatCOP(getCartTotal());
}

function clearForm() {
  addProductForm.reset();
}

function createNewProductFromForm() {
  const name = nameInput.value.trim();
  const att1 = att1Input.value.trim();
  const att2 = att2Input.value.trim();
  const att3 = att3Input.value.trim();
  const imageUrl = imgInput.value.trim();
  const price = Number(priceInput.value);

  // Validación precio
  if (price < 1000) {
    alert("El precio debe ser mínimo 1000.");
    return;
  }

  // Crear ID nuevo
  const nextId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct = {
    id: nextId,
    name,
    price,
    imageUrl,
    att1,
    att2,
    att3,
  };

  products.push(newProduct);
  renderProducts();
  clearForm();
}

// ---------------- EVENTOS -----------------------------------
emptyCartBtn.addEventListener("click", emptyCart);

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewProductFromForm();
});

// ---------------- INIT --------------------------------------
renderProducts();
renderCart();
