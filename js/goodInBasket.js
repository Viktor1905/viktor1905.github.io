class GoodInBasket{
    good
    constructor(good){
        this.good = good
        this.addBasket(good)
        .then(this.render(good))
        .catch(() => {
        console.log("This good already in basket. Quanity updated")
        })
        this.counter(good)
    }
    
    addBasket = (good) => new Promise ((resolve, reject) => {
        if (Basket.basketGoods.find(goodInBasket => goodInBasket.name === good.name)) {
            reject()
        } else {
            Basket.basketGoods.push(good)
            resolve()
        }
    })

    counter() {
        if (document.querySelector('.count-basket')) {
            document.querySelector('.count-basket').innerText= Basket.basketGoods.length
        }
        else {
            let count = document.createElement('div')
            count.classList.add('count-basket') 
            if(Basket.basketGoods!=undefined) {
                count.innerText= Basket.basketGoods.length}
            else {
                count.innerText = 0
            }
            let button = document.querySelector('.cart-show-btn')
            button.appendChild(count)
        }
    }


    deleteItem(good) {
        let deleteItem = document.getElementById(`item art:${good.article}`) // Это лучше исправить через event и btn 
        console.log(deleteItem)
        Basket.basketGoods.forEach(function(item) {
            if(item.article == good.article) {
                let itemIndex = Basket.basketGoods.indexOf(good)
                Basket.basketGoods.splice(itemIndex, 1)
            }
        })
        if (document.querySelector('.count-basket')) {
            document.querySelector('.count-basket').innerText= Basket.basketGoods.length
        }
        deleteItem.remove()

        Basket.totalCoastSum -= good.totalCoast
        
        let text = document.querySelector('.total-coast-items-basket')
        text.innerText = `Итоговая стоимость корзины: `+ Basket.totalCoastSum;

        if(!document.querySelector('.good-item-basket')){
            document.querySelector('.basket-manag').remove()
            document.querySelector('.count-basket').remove()
            document.querySelector('.cart-list').classList.toggle('shown')
        }
        

    }
    
    minusCountBasket(good, event) {
        let thisItem = document.getElementById(`item art:${good.article}`)
        let number = good.number

        if (number > 1){
            number -= 1
        } else if(number = 1){
            this.deleteItem(this.good)
            return
        }
        good.number = number
        thisItem.querySelector(`.count-items-basket-number`).innerText = number

        for (let items in Basket.basketGoods) {
            if(good.name == Basket.basketGoods[items].name) {
                Basket.basketGoods[items].number = number
                Basket.basketGoods[items].totalCoast = Basket.basketGoods[items].number * Basket.basketGoods[items].price
                thisItem.querySelector(`.coast-items-basket`).innerText = `Стоимость: ${Basket.basketGoods[items].totalCoast}`
            }

        }
        let totalCoastSum = 0;
        for (let items of Basket.basketGoods) {
            totalCoastSum += items.totalCoast
        }

        let text = document.querySelector('.total-coast-items-basket')
        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
    }

    plusCountBasket(good, event) {
        let thisItem = document.getElementById(`item art:${good.article}`)
        let number = +good.number

        number += 1
        good.number = number
        thisItem.querySelector(`.count-items-basket-number`).innerText = number

        for (let items in Basket.basketGoods) {
            if(good.name == Basket.basketGoods[items].name) {
                Basket.basketGoods[items].number = number
                Basket.basketGoods[items].totalCoast = Basket.basketGoods[items].number * Basket.basketGoods[items].price
                thisItem.querySelector(`.coast-items-basket`).innerText = `Стоимость: ${Basket.basketGoods[items].totalCoast}`
            }

        }

        let totalCoastSum = 0;
        for (let items of Basket.basketGoods) {
                totalCoastSum += items.totalCoast
        }

        let text = document.querySelector('.total-coast-items-basket')
        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
    }

    render(good) {
        let placeToRender = document.createElement('div')
        // document.querySelector('.good-item-list')
        let checkGood = document.getElementById(`item art:${good.article}`)

        if(checkGood) {
            if(checkGood.querySelector('.good-name-basket').innerText == good.name) {
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

        if(placeToRender) {
            let block = document.createElement('div')
            block.classList = 'good-item-basket'
            block.setAttribute(`id`, `item art:${good.article}`)

            let goodName = document.createElement('span')
            goodName.innerHTML = `${good.name}`
            goodName.classList = 'good-name-basket'
            goodName.setAttribute(`id`, `item art:${good.article}`)

            let goodPrice = document.createElement('span')
            goodPrice.innerHTML = `Цена: ${good.price}`
            goodPrice.classList = 'good-price-basket'

            let goodPicture = document.createElement('img')
            goodPicture.classList = 'good-picture-basket'

            let countItems = document.createElement('div')
            countItems.innerText = `Количество: `
            countItems.classList = 'count-items-basket'
            
            let minus = document.createElement('button')
            minus.innerText= "-"
            minus.onclick = this.minusCountBasket.bind(this, good);
            minus.classList = 'count-btn'

            let itemsNumber = document.createElement('span')
            itemsNumber.classList = 'count-items-basket-number'
            itemsNumber.innerText = `${good.number}`

            let plus = document.createElement('button')
            plus.innerText= "+"
            plus.onclick = this.plusCountBasket.bind(this, good);
            // plus.onclick = plusCountBasket;
            plus.classList = 'count-btn'

            let coast = document.createElement('span')
            coast.innerText = `Стоимость: ${good.number * good.price}`
            coast.classList = 'coast-items-basket'

            let deleteBtn = document.createElement('button')
            deleteBtn.innerText = "Удалить предмет"
            deleteBtn.classList = 'btn delete-item-btn'
            deleteBtn.onclick = this.deleteItem.bind(this, good);

            let totalCoastSum = 0;
            for (let obj of Basket.basketGoods) {
                totalCoastSum += obj.totalCoast
            }

            let text = document.querySelector('.total-coast-items-basket')
            if(text){
            text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;}

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
            
            CartInstance.renderTotalCoast()
            CartInstance.renderGood(block)

            return
        }
    }

}