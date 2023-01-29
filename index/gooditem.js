
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
        let x = event.target
        snackbar(x, this)
        // this.itemrefresh(x)
       return CartInstance.addItem(this)
    })
    // itemrefresh(x){
    //     console.log(x.parentElement.querySelector('.basket-btn').classList.add('hide'))
    //     x.parentElement.querySelector('.basket-btn')
    // } ЗАЧАТОК замены кнопки на счетчик удаляющи/добавляющий элементы сразу

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
            goodName.setAttribute('id', `item №${this.article}`)
            goodPrice.innerHTML = ` ${this.price}`
            goodPicture.setAttribute('src', `./img/${this.name}.jpg`)
            goodBtn.innerText = 'В корзину' 
            goodBtn.classList = 'btn basket-btn'
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


            placeToRender.append(block)
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
