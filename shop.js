class CommonList {
    items = []
    fetchGoods (){
        const result = fetch(`${window.location.href}database.json`) // сделали запрос на сервер и получили промис
        return result 
        .then (res =>{ 
            return res.json()
        })// сделали перевод данных в объект
        .then(data =>{ // тут хранится объект из операции выше
            this.items = data.data.map((cur) => { 
                return new GoodItem(cur) 
            })// в items мы поместили массив, который переделали с помощью gooditem в отдельные объекты, data.data - чтоб получить объект data - все наши массивы (нужные для операции), которые хранятся в переменной data, в начале данного then
        })
        .catch (err => { // будет срабатывать когда нет сети, или произошла ошибка передачи данных (т.е. пробелмы с соединением)
            console.warn("Check network", err)
        }) 
    }

}
class moreBtn extends CommonList{
    constructor(a){
        super()
        let goodsPromise = this.fetchGoods()
        goodsPromise.then(()=>{
            this.render()
        })
    }
    render (a) {
        let x = 0;
        this.items.forEach(good => {
            let exist = document.getElementById(`item №${good.article}`)
            if (exist){
            } else{
                if(x<2){
                good.render()
                console.log(x)
                x++}
                } return
        })
        
        console.log(a)
        
    }
}


class GoodsList extends CommonList {

    constructor () {
        super () 
        let goodsPromise = this.fetchGoods()

        goodsPromise.then(()=>{
            this.render()
        })
    } //запрос товаров
    moreShow (){
        return new moreBtn(this.items)
    }
    render () {
        this.items.forEach(good => {
            if(this.items.indexOf(good) < 5){
            good.render()
            }
        })
                let placeToRender = document.querySelector('.more-btn-place')
        if (placeToRender){
            let moreBtn = document.createElement('button')
            moreBtn.innerText = 'Показать еще'
            moreBtn.classList = 'more-btn'
            moreBtn.onclick = this.moreShow;
            placeToRender.appendChild(moreBtn)
        }
    }
}

class GoodItem{
    name = ''
    price = 0
    number = 1
    totalCoast = 0
    article 

    constructor({name, price,article}){
        this.name = name
        this.price = price
        this.article = article
    }
    addBasket = (() => {
        this.number = event.target.previousElementSibling.firstElementChild.nextElementSibling.innerText 
        this.totalCoast = this.price * this.number
       return new Basket(this)
    })


    render() {
        let placeToRender = document.querySelector('.more-btn-place')

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
            goodName.setAttribute('id', `item №${this.article}`)
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


            placeToRender.before(block)
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
        let check 
            check = document.getElementById(`item art:${a.article}`)

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
        
                console.log(a.article)
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
                goodName.setAttribute(`id`, `item art:${a.article}`)
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

new GoodsList ();