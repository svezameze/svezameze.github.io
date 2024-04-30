let checkboxes = document.querySelectorAll(".checkbox");
let total = document.getElementById('total');
let articleprices = [2500, 2000, 2000, 2000, 2700, 1800];
let prices = [0, 0, 0, 0, 0, 0]
let price = 0
let button = document.getElementById('orderbutton')

button.setAttribute('disabled', 'true')
document.getElementById('ordertext').setAttribute('disabled', 'true')

function ukupno(){
    price = 0
    prices.forEach((e) => {
        price += e;
    })
    total.innerText = "Ukupna cena: " + price + " dinara"
}


function writeorder(){
    let order = "Naručeni artikli: \n"
    checkboxes.forEach(e => {
        if (e.checked) {
            order += document.getElementById('label' + e.id.substring(15)).innerText
            order += " (komada: "
            order += document.getElementById('productquantity' + e.id.substring(15)).value
            order += "); \n"
        }
    });
    order += "\n \n"
    order += "Vrednost narudžbine: " + price + " dinara"
    document.getElementById("ordertext").value = order

    if (price == 0) button.setAttribute('disabled', 'true')
    else button.removeAttribute('disabled')
}

ukupno()

checkboxes.forEach(e => {
    e.addEventListener('change', () => {
        if (e.checked) {
            document.getElementById('productquantity' + e.id.substring(15)).removeAttribute("disabled")
            document.getElementById('productquantity' + e.id.substring(15)).value = 1;
        }
        else {
            document.getElementById('productquantity' + e.id.substring(15)).setAttribute("disabled", "true")
            document.getElementById('productquantity' + e.id.substring(15)).value = 0;
        }
        prices[Number(e.id.substring(15)) - 1] = articleprices[Number(e.id.substring(15)) - 1] * document.getElementById('productquantity' + e.id.substring(15)).value
        ukupno()
        writeorder()
    })
});

document.querySelectorAll(".numberinput").forEach(e => {
    e.addEventListener('change', () => {
        prices[Number(e.id.substring(15)) - 1] = articleprices[Number(e.id.substring(15)) - 1] * e.value
        ukupno()
        writeorder()
    })
})

button.addEventListener('click', () => {
    document.getElementById('ordertext').removeAttribute('disabled')
})