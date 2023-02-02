class GoodInBasket {
    name = ''
    price = 0
    number = 1
    totalCoast = 0
    article 
    constructor(good) {
        this.name = good.name
        this.price = good.price
        this.number = good.number
        this.totalCoast = good.totalCoast
        this.article = good.article
        this.addBasket(this)
        .then(this.render(this))
        this.counter(this.good)
    }
    
    addBasket = (good) => new Promise ((resolve, reject) => {
        let check = Basket.basketGoods.find(goodInBasket => goodInBasket.name === good.name)
        if (check) {
            Basket.basketGoods.forEach((item) => {
                if(item.article == good.article){
                    item.number = good.number
                }
            })
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


    deleteItem(good, event) {
        let itemIndex, itemObject
        let deleteItem = document.getElementById(`item art:${good.article}`) 
        let text = document.querySelector('.total-coast-items-basket')
        let item = document.getElementById(`item №${good.article}`)
        let btn = item.querySelector('.basket-btn')
        
        Basket.basketGoods.forEach(function(item) {
            if(item.article == good.article) {
                itemIndex = Basket.basketGoods.indexOf(good)
                Basket.basketGoods.splice(itemIndex, 1)
            }
        })

        if (document.querySelector('.count-basket')) {
            document.querySelector('.count-basket').innerText= Basket.basketGoods.length
        }
        deleteItem.remove()

        Basket.totalCoastSum -= good.totalCoast
        
        text.innerText = `Итоговая стоимость корзины: `+ Basket.totalCoastSum;

        if(!document.querySelector('.good-item-basket')) {
            document.querySelector('.basket-manag').remove()
            document.querySelector('.count-basket').remove()
            if(document.querySelector('.cart-list').classList.contains('shown')) {
                document.querySelector('.cart-list').classList.remove('shown')
            }
        }

        for (let items in GoodsList.allItems) {
            if(good.article == GoodsList.allItems[items].article) {
                itemObject = GoodsList.allItems[items]
            }
        }
        btn.innerText = 'В корзину'
        btn.classList.remove('delete-item')
        btn.onclick = itemObject.addBasket.bind(this, good);
    }
    
    minusCountBasket(good) { 
        let itemProto = document.getElementById(`item №${good.article}`)
        let btn = itemProto.querySelector('.basket-btn')
        let itemObject, basketObject
        let number = this.number
        let text = document.querySelector('.total-coast-items-basket')
        let thisItem = document.getElementById(`item art:${this.article}`)
        let totalCoastSum = 0;

        if (number > 1){
            for (let items in Basket.basketGoods) {
                if(this.name == Basket.basketGoods[items].name) {
                    number -= 1
                    Basket.basketGoods[items].number = number
    
                    Basket.basketGoods[items].totalCoast = Basket.basketGoods[items].number * Basket.basketGoods[items].price
                    thisItem.querySelector(`.coast-items-basket`).innerText = `Стоимость: ${Basket.basketGoods[items].totalCoast}`
    
                    Basket.basketGoods[items].number = number
                    thisItem.querySelector(`.count-items-basket-number`).innerText = number
                }
            }
        } else if(number = 1) {
            this.deleteItem(this)
            return
        }


        thisItem.querySelector(`.count-items-basket-number`).innerText = number

        for (let items of Basket.basketGoods) {
            totalCoastSum += items.totalCoast
        }

        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;     

        for (let items in GoodsList.allItems) {
            if(good.article == GoodsList.allItems[items].article) {
                itemObject = GoodsList.allItems[items]
            }
        }

        for (let items in Basket.basketGoods) {
            if(good.article == Basket.basketGoods[items].article) {
                basketObject = Basket.basketGoods[items]
            }
        }

        if(basketObject.number == itemObject.number) {
            btn.innerText = 'Удалить из корзины'
            btn.classList.add('delete-item')
            btn.onclick = this.deleteItem.bind(this, good);
        } else {
            btn.innerText = 'Обновить кол-во'
            btn.classList.remove('delete-item')
            btn.onclick = itemObject.addBasket.bind(this, itemObject);
        }
        
    }

    plusCountBasket(good) {
        let itemProto = document.getElementById(`item №${good.article}`)
        let btn = itemProto.querySelector('.basket-btn')
        let itemObject, basketObject
        let number 
        let text = document.querySelector('.total-coast-items-basket')
        let thisItem = document.getElementById(`item art:${this.article}`)
        let totalCoastSum = 0;

        for (let items in Basket.basketGoods) {
            if(this.name == Basket.basketGoods[items].name) {
                number = Basket.basketGoods[items].number
                number += 1
                Basket.basketGoods[items].number = number
                Basket.basketGoods[items].totalCoast = Basket.basketGoods[items].number * Basket.basketGoods[items].price
                thisItem.querySelector(`.coast-items-basket`).innerText = `Стоимость: ${Basket.basketGoods[items].totalCoast}`
                Basket.basketGoods[items].number = number
                thisItem.querySelector(`.count-items-basket-number`).innerText = number
            }
        }

        for (let items of Basket.basketGoods) {
                totalCoastSum += items.totalCoast
        }

        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;

        for (let items in GoodsList.allItems) {
            if(good.article == GoodsList.allItems[items].article) {
                itemObject = GoodsList.allItems[items]
            }
        }
        for (let items in Basket.basketGoods) {
            if(good.article == Basket.basketGoods[items].article) {
                basketObject = Basket.basketGoods[items]
            }
        }
        if(basketObject.number == itemObject.number) {
            btn.innerText = 'Удалить из корзины'
            btn.classList.add('delete-item')
            btn.onclick = this.deleteItem.bind(this, good);
        } else {
            btn.innerText = 'Обновить кол-во'
            btn.classList.remove('delete-item')
            btn.onclick = itemObject.addBasket.bind(this, itemObject);
        }
    }

    render(good) {
        let block = document.createElement('div')
        let checkGood = document.getElementById(`item art:${this.article}`)

        if(checkGood) {
            if(checkGood.querySelector('.good-name-basket').innerText == this.name) {
                checkGood.querySelector('.count-items-basket-number').innerText = `${this.number}`
                checkGood.querySelector('.coast-items-basket').innerText = `Стоимость: ${this.totalCoast}`
                let totalCoastSum = 0;
                for (let obj of Basket.basketGoods) {
                    totalCoastSum += obj.totalCoast
                }
                let text = document.querySelector('.total-coast-items-basket')
                text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
                return
            }
        }

        if(block) {
            let placeToRenderTotalCoast = document.querySelector('.cart-list')
            let block = document.createElement('div')
            block.classList = 'good-item-basket'
            block.setAttribute(`id`, `item art:${this.article}`)

            let goodName = document.createElement('span')
            goodName.innerHTML = `${this.name}`
            goodName.classList = 'good-name-basket'
            goodName.setAttribute(`id`, `item art:${this.article}`)

            let goodPrice = document.createElement('span')
            goodPrice.innerHTML = `Цена: ${this.price}`
            goodPrice.classList = 'good-price-basket'

            let goodPicture = document.createElement('img')
            goodPicture.classList = 'good-picture-basket'

            let countItems = document.createElement('div')
            countItems.innerText = `Количество: `
            countItems.classList = 'count-items-basket'
            
            let minus = document.createElement('button')
            minus.innerText= "-"
            minus.onclick = this.minusCountBasket.bind(this, good); // необходимо поменять, т.к. он рабоатет с первонеачальным объектом и нумбер берет из allitems а не basketgoods
            minus.classList = 'count-btn'

            let itemsNumber = document.createElement('span')
            itemsNumber.classList = 'count-items-basket-number'
            itemsNumber.innerText = `${this.number}`

            let plus = document.createElement('button')
            plus.innerText= "+"
            plus.onclick = this.plusCountBasket.bind(this, good);
            // plus.onclick = plusCountBasket;
            plus.classList = 'count-btn'

            let coast = document.createElement('span')
            coast.innerText = `Стоимость: ${this.number * this.price}`
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

            block.appendChild(goodPicture)
            block.appendChild(goodName)
            block.appendChild(goodPrice)
            block.appendChild(countItems)
            countItems.appendChild(minus)
            countItems.appendChild(itemsNumber)
            countItems.appendChild(plus)
            block.appendChild(coast)
            block.appendChild(deleteBtn)
            
            placeToRenderTotalCoast.append(CartInstance.renderTotalCoast())
            CartInstance.renderGood(block)

            return
        }
    }

}