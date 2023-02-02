class Basket extends CommonList {
    static basketGoods = []
    static totalCoastSum = 0;

    constructor(goods) {
        super()
        this.render(goods)
    }

    deleteBasket() {
        let cart = document.querySelector('.good-item-list')
        let cartItems = cart.childNodes.length;
        let list = document.querySelector(".cart-list")

        for (let i = 0; i < cartItems; i++) {
            document.querySelector('.good-item-basket').remove()
        }
        if (document.querySelector('.count-basket')) {
            document.querySelector('.count-basket').remove()
        }

        document.querySelector('.basket-manag').remove()

        for (let good of GoodsList.allItems) {
            for (let item of Basket.basketGoods) {
                if(good.article == item.article) {
                    let htmlItem = document.getElementById(`item №${good.article}`)
                    let itemBtn = htmlItem.querySelector(".basket-btn") 
                    itemBtn.innerText= 'В корзину'
                    itemBtn.classList.remove('delete-item')
                    itemBtn.onclick = good.addBasket.bind(event, good); 
                }
            }
        }
        list.classList.toggle('shown')//Если у списка был класс shown, он уберется. если его не было - он добавится

        Basket.basketGoods = []
    }

    static goodItemList = document.createElement('div')

    renderGood(good) { //реализация отрисовки дочки по указанию родителя
        Basket.goodItemList.append(good)
    }

    render() {  
        let block = document.createElement('div')
        block.classList.add('cart')

        Basket.goodItemList.classList.add('good-item-list')

        let list = document.createElement('div')
        list.classList.add('cart-list')
        block.appendChild(list)
        list.appendChild(Basket.goodItemList)

        let ButtonInstnce = new Button ('Корзина', () => {
            list.classList.toggle('shown')//Если у списка был класс shown, он уберется. если его не было - он добавится
        })

        block.appendChild(ButtonInstnce.getTemplate('cart-show-btn'))        

        let placeToRender = document.querySelector('header')
        if(placeToRender) {
            placeToRender.appendChild(block)
        }
    }

    renderTotalCoast() {
        let basketManag = document.createElement('div')
        basketManag.setAttribute('class', 'basket-manag')

        let totalCoast = document.createElement('span')
        Basket.totalCoastSum = 0 
        for (let obj of Basket.basketGoods) {
            Basket.totalCoastSum += obj.totalCoast
        }
        totalCoast.classList= 'total-coast-items-basket'
        totalCoast.innerText = `Итоговая стоимость корзины: `+ Basket.totalCoastSum;

        let cleanBasket = document.createElement('button')
        cleanBasket.innerText = 'Очистить корзину'
        cleanBasket.setAttribute('class', 'btn clean-btn')
        cleanBasket.onclick = this.deleteBasket;

        if(!document.querySelector('.total-coast-items-basket')) {
            basketManag.appendChild(totalCoast)
            basketManag.appendChild(cleanBasket)
        } else {
            let text = document.querySelector('.total-coast-items-basket')
            text.innerText = `Итоговая стоимость корзины: `+Basket.totalCoastSum;
        }
        return basketManag
    }
}