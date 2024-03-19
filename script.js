const menu = document.getElementById("menu")
const modal = document.getElementById("cart-modal")
const cartBtn = document.getElementById("cart-btn")
const address = document.getElementById("address")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const closeModal = document.getElementById("close-model-btn")
const checkOutBtn = document.getElementById("checkout-btn")
const cartCount = document.getElementById("cart-count")
const addressWarn = document.getElementById("address-warn")

let cart = [];

//abrir o modal
cartBtn.addEventListener('click', function() {
    modal.style.display = "flex"
    updateModal()
} )

//fechar o modal
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none"
    }
})

modal.addEventListener("click", function() {
    modal.style.display = "none"
})

menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)
    } 
})

//function pra add no cart

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({
            name, 
            price,
            quantity: 1,
        })
    }

    updateModal()
}

function updateModal() {
    cartItems.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItems.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between" >
                <div>
                    <p class="font-bold" >${item.name}</p>
                    <p class="font-medium" > Quantidade ${item.quantity}</p>
                    <p class="font-medium mt-2" > R$ ${item.price.toFixed(2)}</p>
                </div>

               
                <button class="remove-from-cart-btn"  data-name="${item.name}" >
                    Remover
                </button>
                
            </div>
        `

        total += item.price * item.quantity

        cartItems.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCount.innerHTML = cart.length

}

//função para remover item
cartItems.addEventListener("click", function (event){
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name") 

        removeItemCart()
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if (index !== -1) {
        const item = cart[index]

        if (item.quantity > 1) {
            item.quantity -= 1
            updateModal()
            return;
        }

        cart.splice(index, 1)
        updateModal()
    }
}


//pegar o endereço

address.addEventListener("input", function(event) {
    let inputValue = event.target.value

    if (inputValue !== "") {
        address.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    } else {
        
    }
})

//finalizar o carrinho
checkOutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        return;
    }

    if (address.value === "") {
        addressWarn.classList.remove("hidden")
        address.classList.add("border-red-500")
        return
    }
})