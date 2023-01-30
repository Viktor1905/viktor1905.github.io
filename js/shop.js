function minusCount(){
    let number = +event.target.nextElementSibling.innerText
    if (number > 1){
        number -= 1}
    event.target.nextElementSibling.innerText = number

}

function plusCount(){
    let number = +event.target.previousElementSibling.innerText
    number += 1
    event.target.previousElementSibling.innerText = number

}

const ListInstance  = new GoodsList() ;
const CartInstance = new Basket();




