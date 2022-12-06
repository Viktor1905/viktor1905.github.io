
class CommonList {
    items = []
    
    fetchGoods (){
        return [
            {name: 'Shirt', price: 150},
            {name: 'Socks', price: 15},
            {name: 'Jacket', price: 50},
            {name: 'Shoes', price: 1500},
            {name: 'Shirt-1', price: 250},
            {name: 'Socks-1', price: 25},
            {name: 'Jacket-1', price: 90},
            {name: 'Shoes-1', price: 1700},
        ]
    }

}

class List extends CommonList {

    constructor () {
        super () 
        let goods = this.fetchGoods()
        goods = goods.map((cur) => { // новый массив нужно создать и присвоить ему результаты
            return new GoodItem(cur) // мы в конструктор передаем поле 14, в поле 33 сразу раскладываем параметры и делаем объект
        }, []) // каждый объект трансформировать под GoodItem
        this.items.push(...goods)// так сделано, чтоб если что то уже лежит - мы добавим еще элементы, а не заменим их. Это спред - выдает как отдельные переменные, а не как один массив (т.е. был бы массив в массиве). 
        this.render()
    } //запрос товаров
    render () {

        this.items.forEach(good => {
            good.render()
        })
    }
}

class GoodItem{
    name = ''
    price = 0
    number = 1
    totalCoast = 0

    constructor({name, price}){
        this.name = name
        this.price = price
    }
    addBasket = (addBasket => {
        this.number = event.target.previousElementSibling.firstElementChild.nextElementSibling.innerText 
        this.totalCoast = this.price * this.number
       return new Basket(this)
    })


    render() {
        let placeToRender = document.querySelector('.goods-list')

        if (placeToRender){
            let block = document.createElement('div')
            let goodName = document.createElement('span')
            let goodPrice = document.createElement('span')
            let goodPicture = document.createElement('img')
            let goodBtn = document.createElement('button')
            let countItems = document.createElement('div')
                let minus = document.createElement('button')
                let itemsNumber = document.createElement('span')
                let plus = document.createElement('button')


            goodName.innerHTML = `${this.name}`
            goodPrice.innerHTML = ` ${this.price}`
            goodPicture.setAttribute('src', `./img/${this.name}.jpg`)
            goodBtn.innerText = 'В корзину' 
            goodBtn.classList = 'basket-btn'
            goodBtn.onclick = this.addBasket;
            minus.innerText= "-"
            minus.onclick = minusCount;
            itemsNumber.innerText = this.number
            plus.innerText= "+"
            
            plus.onclick = plusCount

            block.classList = 'good-item'
            goodName.classList = 'good-name'
            goodPrice.classList = 'good-price'
            goodPicture.classList = 'good-picture'
            countItems.classList = 'count-items'
            minus.classList = 'count-btn'
            plus.classList = 'count-btn'


            placeToRender.appendChild(block)
            block.appendChild(goodPicture)
            block.appendChild(goodName)
            block.appendChild(goodPrice)
            block.appendChild(countItems)
            countItems.appendChild(minus)
            countItems.appendChild(itemsNumber)
            countItems.appendChild(plus)
            block.appendChild(goodBtn)
        }
    }
}
basketGoods = []
class Basket extends CommonList {
    constructor (a){
        super()

        if (basketGoods.find(o => o.name === a.name)){

        } else {
            basketGoods.push(a)
            console.log(basketGoods)
        }
        this.render(a)
        
    }

    render(a){
        let placeToRender = document.querySelector('.cart')
        console.log(placeToRender)
        let check 

/*        basketGoods.forEach(function(obj){
            check = document.getElementById(`item №${basketGoods.indexOf(obj)+1}`)
            console.log(basketGoods.indexOf(obj)+1)
            if(check){
                console.log(check.innerText)
                console.log(a.name)
                console.log(check.innerText == a.name)
                    if(check.innerText == a.name){
                    check.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerText = `${a.number}`
                    check.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `Стоимость: ${a.totalCoast}`
                    let totalCoastSum = 0;
                    for (let obj of basketGoods){
                        totalCoastSum += obj.totalCoast
                    }
                    let text = document.querySelector('.total-coast-items-basket')
                    text.innerText = `Итоговая стоимость корзины:`+totalCoastSum;
                    return
                    }
            }
        })*/
       /* let b 
        basketGoods.forEach(function(obj){
            let p = Object.values(obj);
            console.log(p[0])
            check = document.getElementById(`item ${p[0]}`)
            console.log(check)
            if(check){
                            if(check.innerText == a.name){
                                check.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerText = `${a.number}`
                                check.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `Стоимость: ${a.totalCoast}`
                                let totalCoastSum = 0;
                                console.log(check)
                                for (let obj of basketGoods){
                                    totalCoastSum += obj.totalCoast
                                }
                                let text = document.querySelector('.total-coast-items-basket')
                                text.innerText = `Итоговая стоимость корзины:`+totalCoastSum;
                                return true
                            }
                            
            } b = false
    })*/

        for (let b = 0; b <= basketGoods.length; b++){
            check = document.getElementById(`item №${a.name}`)

            if(check){

                if(check.innerText == a.name){
                    check.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerText = `${a.number}`
                    check.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `Стоимость: ${a.totalCoast}`
                    let totalCoastSum = 0;
                    console.log(check)
                    for (let obj of basketGoods){
                        totalCoastSum += obj.totalCoast
                    }
                    let text = document.querySelector('.total-coast-items-basket')
                    text.innerText = `Итоговая стоимость корзины:`+totalCoastSum;
                    return
                }
                
            }
        }

    

           if(placeToRender){
                let block = document.createElement('div')
                let goodName = document.createElement('span')
                let goodPrice = document.createElement('span')
                let goodPicture = document.createElement('img')
                let countItems = document.createElement('div')
                let minus = document.createElement('button')
                let itemsNumber = document.createElement('span')
                let plus = document.createElement('button')
                let coast = document.createElement('span')
                let deleteBtn = document.createElement('button')

                goodName.innerHTML = `${a.name}`
                goodPrice.innerHTML = `Цена: ${a.price}`
                countItems.innerText = `Количество: `
                itemsNumber.innerText = `${a.number}`
                coast.innerText = `Стоимость: ${a.number * a.price}`
                deleteBtn.innerText = "Удалить предмет"
                minus.innerText= "-"
                minus.onclick = minusCountBasket;
                plus.innerText= "+"
                plus.onclick = plusCountBasket
                deleteBtn.onclick = deleteItem;

                block.classList = 'good-item-basket'
                goodName.classList = 'good-name-basket'
                goodName.setAttribute(`id`, `item №${a.name}`)
                goodPrice.classList = 'good-price-basket'
                goodPicture.classList = 'good-picture-basket'
                countItems.classList = 'count-items-basket'
                coast.classList = 'coast-items-basket'
                minus.classList = 'count-btn'
                plus.classList = 'count-btn'

                placeToRender.appendChild(block)
                block.appendChild(goodPicture)
                block.appendChild(goodName)
                block.appendChild(goodPrice)
                block.appendChild(countItems)
                countItems.appendChild(minus)
                countItems.appendChild(itemsNumber)
                countItems.appendChild(plus)
                block.appendChild(coast)
                block.appendChild(deleteBtn)


            }
            let totalCoast = document.createElement('span')
            let totalCoastSum = 0;
            for (let obj of basketGoods){
                totalCoastSum += obj.totalCoast
            }
            totalCoast.classList= 'total-coast-items-basket'
            totalCoast.innerText = `Итоговая стоимость корзины:`+totalCoastSum;
            let cleanBasket = document.createElement('button')
            cleanBasket.innerText = 'Очистить корзину'
            cleanBasket.setAttribute('class', 'clean-btn')
            cleanBasket.onclick = deleteBasket;

            if(!document.querySelector('.total-coast-items-basket')){
                placeToRender.parentElement.appendChild(totalCoast)
                placeToRender.parentElement.appendChild(cleanBasket)
            } else{
                let text = document.querySelector('.total-coast-items-basket')
                text.innerText = `Итоговая стоимость корзины:`+totalCoastSum;
            }

    }

}
function deleteItem (){
    let deleteItem = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    basketGoods.forEach(function(obj){
        if(obj.name == deleteItem){
            let x = basketGoods.indexOf(obj)
            basketGoods.splice(x, 1)

        }
    })
    
    this.parentElement.remove()
    let text = document.querySelector('.total-coast-items-basket')
    let totalCoast = document.createElement('span')
        let totalCoastSum = 0;
        for (let obj of basketGoods){
            totalCoastSum += obj.totalCoast
            console.log(basketGoods)
        }
    text.innerText = `Итоговая стоимость корзины:`+totalCoastSum;

}
function  deleteBasket(){
    let cart = document.querySelector('.cart')
    let cartItems = cart.childNodes.length;
    console.log(cart.childNodes.length)
    for (let i = 0; i < cartItems; i++){
        console.log(i)
        document.querySelector('.good-item-basket').remove()
    }
    document.querySelector('.clean-btn').remove()
    document.querySelector('.total-coast-items-basket').remove()
    basketGoods = []
}
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
    for (let obj in basketGoods){
        if(name == basketGoods[obj].name){
         basketGoods[obj].number = number
         basketGoods[obj].totalCoast = basketGoods[obj].number * basketGoods[obj].price
        }
     }
    for (let obj in basketGoods){
        console.log(basketGoods[obj].totalCoast)
        this.parentElement.nextElementSibling.innerText = `Стоимость: ${basketGoods[obj].totalCoast}`
    }

        let text = document.querySelector('.total-coast-items-basket')
        let totalCoast = document.createElement('span')
            let totalCoastSum = 0;
            for (let obj of basketGoods){
                totalCoastSum += obj.totalCoast
            }
        text.innerText = `Итоговая стоимость корзины:`+totalCoastSum;
}


function plusCountBasket(){
    let number = +event.target.previousElementSibling.innerText
    number += 1
    event.target.previousElementSibling.innerText = number
    console.log(this.parentElement.nextElementSibling)
    let name = event.target.parentElement.previousElementSibling.previousElementSibling.innerText
    for (let obj in basketGoods){
       if(name == basketGoods[obj].name){
        basketGoods[obj].number = number
        basketGoods[obj].totalCoast = basketGoods[obj].number * basketGoods[obj].price
       }
    }
    for (let obj in basketGoods){
        // basketGoods[obj].number = number
        basketGoods[obj].totalCoast = basketGoods[obj].number * basketGoods[obj].price
        console.log(basketGoods[obj].totalCoast)
        this.parentElement.nextElementSibling.innerText = `Стоимость: ${basketGoods[obj].totalCoast}`
    }

        let text = document.querySelector('.total-coast-items-basket')
        let totalCoast = document.createElement('span')
            let totalCoastSum = 0;
            for (let obj of basketGoods){
                totalCoastSum += obj.totalCoast
            }
        text.innerText = `Итоговая стоимость корзины:`+totalCoastSum;

}

let ListInstance = new List ();