// ----------------CAPTURAR DATOS DEL DOOM----------------------
// Tienda
const productsGrid = document.getElementById("#productsGrid");
// Carrito
const cartTbody = document.getElementById("#cartTbody");
const cartBadge = document.getElementById("#cartBadge");
const cartTotal = document.getElementById("#cartTotal");
const cartEmptyMsg = document.getElementById("#cartEmptyMsg");

// Formulario
const nameInput = document.getElementById("#nameInput");
const att1Input = document.getElementById("#att1Input");
const att2Input = document.getElementById("#att2Input");
const att3Input = document.getElementById("#att3Input");
const imgInput = document.getElementById("#imgInput");
const priceInput = document.getElementById("#priceInput");

// ----------------PRODEUCTOS----------------------

 const products = [
    {
    id:1,
    name: "Figura Spider-Man",
    price: 1500,
    imageUrl:"imagen.jpg",
    att1:"Material: PVC",
    att2:"Tamaño: 15 cm",
    att3:"Edicion: Especial",
}
]

// ---------------- CREAR PRODEUCTOS----------------------

function rederProducts(){

    productsGrid.innerHTML = "";

    for (producto in products) {

        const card = document.createElement("div");
        card.className = "card"

    }
}

