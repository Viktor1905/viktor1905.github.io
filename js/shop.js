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
function minusCountBasket (){
    let number = +event.target.nextElementSibling.innerText
    if (number > 1){
    number -= 1}
    event.target.nextElementSibling.innerText = number
    let name = event.target.parentElement.previousElementSibling.previousElementSibling.innerText
    for (let obj in Basket.basketGoods){
        if(name == Basket.basketGoods[obj].name){
            Basket.basketGoods[obj].number = number
            Basket.basketGoods[obj].totalCoast = Basket.basketGoods[obj].number * Basket.basketGoods[obj].price
            this.parentElement.nextElementSibling.innerText = `Стоимость: ${Basket.basketGoods[obj].totalCoast}`
        }

     }

        let text = document.querySelector('.total-coast-items-basket')
        let totalCoast = document.createElement('span')
            let totalCoastSum = 0;
            for (let obj of Basket.basketGoods){
                totalCoastSum += obj.totalCoast
            }
        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
}


function plusCountBasket(){
    let number = +event.target.previousElementSibling.innerText
    number += 1
    event.target.previousElementSibling.innerText = number
    console.log(this.parentElement.nextElementSibling)
    let name = event.target.parentElement.previousElementSibling.previousElementSibling.innerText
    for (let obj in Basket.basketGoods){
       if(name == Basket.basketGoods[obj].name){
        Basket.basketGoods[obj].number = number
        Basket.basketGoods[obj].totalCoast = Basket.basketGoods[obj].number * Basket.basketGoods[obj].price
        this.parentElement.nextElementSibling.innerText = `Стоимость: ${Basket.basketGoods[obj].totalCoast}`
       }

    }

        let text = document.querySelector('.total-coast-items-basket')
        let totalCoast = document.createElement('span')
            let totalCoastSum = 0;
            for (let obj of Basket.basketGoods){
                totalCoastSum += obj.totalCoast
            }
        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;

}

const ListInstance  = new GoodsList() ;
const CartInstance = new Basket();




