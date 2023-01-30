class GoodItem{
    name = ''
    price = 0
    number = 1
    totalCoast = 0
    article 
    block = document.createElement('div')

    constructor({name, price,article}) {
        this.name = name
        this.price = price
        this.article = article
    }
    addBasket = ((good, event ) => {
        this.number = good.number
        this.totalCoast = this.price * this.number
        let x = event.target
        snackbar(x, good)
        
        let item = document.getElementById(`item №${good.article}`)
        let btn = item.querySelector('.basket-btn')
        btn.innerText = 'Обновить кол-во'

        return new GoodInBasket(this)
    })

    minusCount(good, event){
        let itemPlace = document.getElementById(`item №${good.article}`)
        let itemObject
        for (let items in GoodsList.allItems) {
            if(good.article == GoodsList.allItems[items].article) {
                itemObject = GoodsList.allItems[items]
            }
        }

        if (itemObject.number > 1) {
            itemObject.number=Number(itemObject.number)
            itemObject.number -= 1
        }
        good.number = itemObject.number
            
        itemPlace.querySelector('.count-items-number').innerText = itemObject.number
    
    }
    
    plusCount(good, event){
        let itemPlace = document.getElementById(`item №${good.article}`)
        let itemObject
        for (let items in GoodsList.allItems) {
            if(good.article == GoodsList.allItems[items].article) {
                itemObject = GoodsList.allItems[items]
            }
        }

        itemObject.number=Number(itemObject.number)
        itemObject.number += 1
        good.number = itemObject.number
            
        itemPlace.querySelector('.count-items-number').innerText = itemObject.number
    
    
    }

    render(good) {
        let goodName = document.createElement('span')
        let goodPrice = document.createElement('span')
        let goodPicture = document.createElement('img')
        let goodBtn = document.createElement('button')
        let countItems = document.createElement('div')
        let minus = document.createElement('button')
        let itemsNumber = document.createElement('span')
        let plus = document.createElement('button')

        goodName.innerHTML = `${this.name}`
        this.block.setAttribute('id', `item №${this.article}`)
        goodPrice.innerHTML = ` ${this.price}`
        goodPicture.setAttribute('src', `./img/${this.name}.jpg`)
        goodBtn.innerText = 'В корзину' 
        goodBtn.classList = 'btn basket-btn'
        goodBtn.onclick = this.addBasket.bind(event, good);
        minus.innerText= "-"
        minus.onclick = this.minusCount.bind(event, good);
        itemsNumber.innerText = this.number
        plus.innerText= "+"
        
        plus.onclick = this.plusCount.bind(event, good)

        this.block.classList = 'good-item'
        goodName.classList = 'good-name'
        goodPrice.classList = 'good-price'
        goodPicture.classList = 'good-picture'
        countItems.classList = 'count-items'
        itemsNumber.classList = 'count-items-number'
        minus.classList = 'count-btn'
        plus.classList = 'count-btn'

        this.block.appendChild(goodPicture)
        this.block.appendChild(goodName)
        this.block.appendChild(goodPrice)
        this.block.appendChild(countItems)
        countItems.appendChild(minus)
        countItems.appendChild(itemsNumber)
        countItems.appendChild(plus)
        this.block.appendChild(goodBtn)
    
    }
}
