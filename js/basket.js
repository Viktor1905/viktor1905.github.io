class Basket extends CommonList {
    static basketGoods = []
    
    constructor(goods) {
        super()
        this.render(goods)
    }

    addBasket = (good) => new Promise ((resolve, reject)=>{
        if (Basket.basketGoods.find(goodInBasket => goodInBasket.name === good.name)) {
            reject()
        } else {
            Basket.basketGoods.push(good)
            resolve()
        }
    })

    counter() {
        if (document.querySelector('.count-basket')){
            document.querySelector('.count-basket').innerText= Basket.basketGoods.length
        }
        else {
            let count = document.createElement('div')
            count.classList.add('count-basket') 
            if(Basket.basketGoods!=undefined){
                count.innerText= Basket.basketGoods.length}
            else{count.innerText = 0}
            let button = document.querySelector('.cart-show-btn')
            button.appendChild(count)
        }
    }

    addItem = (good) => {
        this.addBasket(good)
        .then(this.renderNewGood(good))
        .catch(()=>{
        console.log("This good already in basket. Quanity updated")
        })
        this.counter(good)
    }

    deleteItem() {
        let deleteItem = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText // Это лучше исправить через event и btn 
        Basket.basketGoods.forEach(function(obj){
            if(obj.name == deleteItem){
                let x = Basket.basketGoods.indexOf(obj)
                Basket.basketGoods.splice(x, 1)
            }
        })
        if (document.querySelector('.count-basket')){
            document.querySelector('.count-basket').innerText= Basket.basketGoods.length
        }
        this.parentElement.remove()
        let text = document.querySelector('.total-coast-items-basket')
        let totalCoast = document.createElement('span')
            let totalCoastSum = 0;
            for (let obj of Basket.basketGoods){
                totalCoastSum += obj.totalCoast
            }
        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
    }
    
    deleteBasket() {
    let cart = document.querySelector('.good-item-list')
    let cartItems = cart.childNodes.length;
    console.log(cart.childNodes.length)
    for (let i = 0; i < cartItems; i++){

        document.querySelector('.good-item-basket').remove()
    }
    if (document.querySelector('.count-basket')){
        document.querySelector('.count-basket').remove()
    }
    Basket.basketGoods = []
    let text = document.querySelector('.total-coast-items-basket')
    text.innerText = `Итоговая стоимость корзины: `+"0";
    let list = document.querySelector(".cart-list")
    list.classList.toggle('shown')//Если у списка был класс shown, он уберется. если его не было - он добавится
    return
    }
    renderNewGood(good) {
        let placeToRender = document.querySelector('.good-item-list')
        let checkGood = document.getElementById(`item art:${good.article}`)

        if(checkGood){
            if(checkGood.querySelector('.good-name-basket').innerText == good.name){
                checkGood.querySelector('.count-items-basket-number').innerText = `${good.number}`
                checkGood.querySelector('.coast-items-basket').innerText = `Стоимость: ${good.totalCoast}`
                let totalCoastSum = 0;
                for (let obj of Basket.basketGoods){
                    totalCoastSum += obj.totalCoast
                }
                let text = document.querySelector('.total-coast-items-basket')
                text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
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
    
            goodName.innerHTML = `${good.name}`
            goodPrice.innerHTML = `Цена: ${good.price}`
            countItems.innerText = `Количество: `
            itemsNumber.classList = 'count-items-basket-number'
            itemsNumber.innerText = `${good.number}`
            coast.innerText = `Стоимость: ${good.number * good.price}`
            deleteBtn.innerText = "Удалить предмет"
            deleteBtn.classList = 'btn delete-item-btn'
            minus.innerText= "-"
            minus.onclick = minusCountBasket;
            plus.innerText= "+"
            plus.onclick = plusCountBasket
            deleteBtn.onclick = this.deleteItem;

            block.classList = 'good-item-basket'
            goodName.classList = 'good-name-basket'
            goodName.setAttribute(`id`, `item art:${good.article}`)
            block.setAttribute(`id`, `item art:${good.article}`)
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

            let totalCoastSum = 0;
            for (let obj of Basket.basketGoods){
                totalCoastSum += obj.totalCoast
            }
            let text = document.querySelector('.total-coast-items-basket')
            text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
            return
        }
    }
    render() {   //сделать 
        let block = document.createElement('div')
        block.classList.add('cart')

        let goodItemList = document.createElement('div')
        goodItemList.classList.add('good-item-list')

        let list = document.createElement('div')
        list.classList.add('cart-list')
        block.appendChild(list)
        list.appendChild(goodItemList)

        let ButtonInstnce = new Button ('Корзина', () => {
            list.classList.toggle('shown')//Если у списка был класс shown, он уберется. если его не было - он добавится
        })

        block.appendChild(ButtonInstnce.getTemplate('cart-show-btn'))        

        let placeToRender = document.querySelector('header')
        if(placeToRender){
            placeToRender.appendChild(block)
        }

        let basketManag = document.createElement('div')
        basketManag.setAttribute('class', 'basket-manag')

        placeToRender = document.querySelector('.cart-list')// здесь его быть не должно, он должен быть в Родительском блоке

        let totalCoast = document.createElement('span')
        let totalCoastSum = 0;

        for (let obj of Basket.basketGoods) {
            totalCoastSum += obj.totalCoast
        }

        totalCoast.classList= 'total-coast-items-basket'
        totalCoast.innerText = `Итоговая стоимость корзины: `+totalCoastSum;

        let cleanBasket = document.createElement('button')
        cleanBasket.innerText = 'Очистить корзину'
        cleanBasket.setAttribute('class', 'btn clean-btn')
        cleanBasket.onclick = this.deleteBasket;

        if(!document.querySelector('.total-coast-items-basket')) {
            placeToRender.appendChild(basketManag)
            basketManag.appendChild(totalCoast)
            basketManag.appendChild(cleanBasket)
        } else{
            let text = document.querySelector('.total-coast-items-basket')
            text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
        }
    }
}