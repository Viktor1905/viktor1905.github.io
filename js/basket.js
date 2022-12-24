
basketGoods = []
class Basket extends CommonList {
    constructor (a){
        super()
        this.render(a)
        
    }
    addItem = (a) =>{
        this.addBasket(a)
        .then(this.init(a))
        .catch(()=>{
        console.log("Товар уже в корзине. Количество обновлено")
        })
        this.counter(a)

    }
    addBasket = (a)=>new Promise ((resolve, reject)=>{
        if (basketGoods.find(o => o.name === a.name)){
            reject()
        } else {
            basketGoods.push(a)
            resolve()
            console.log(basketGoods)
        }
    })
     deleteItem (){
        let deleteItem = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
        basketGoods.forEach(function(obj){
            if(obj.name == deleteItem){
                let x = basketGoods.indexOf(obj)
                basketGoods.splice(x, 1)
    
            }
        })
        if (document.querySelector('.count-basket')){
            document.querySelector('.count-basket').innerText= basketGoods.length
        }
        this.parentElement.remove()
        let text = document.querySelector('.total-coast-items-basket')
        let totalCoast = document.createElement('span')
            let totalCoastSum = 0;
            for (let obj of basketGoods){
                totalCoastSum += obj.totalCoast
                console.log(basketGoods)
            }
        text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
    
    }
    
  deleteBasket(){
    let cart = document.querySelector('.good-item-list')
    let cartItems = cart.childNodes.length;
    console.log(cart.childNodes.length)
    for (let i = 0; i < cartItems; i++){

        document.querySelector('.good-item-basket').remove()
    }
    if (document.querySelector('.count-basket')){
        document.querySelector('.count-basket').remove()
    }
    basketGoods = []
    let text = document.querySelector('.total-coast-items-basket')
    text.innerText = `Итоговая стоимость корзины: `+"0";
    let list = document.querySelector(".cart-list")
    list.classList.toggle('shown')//Если у списка был класс shown, он уберется. если его не было - он добавится
    return
    }
    init(a){
        let placeToRender = document.querySelector('.good-item-list')
        let check 
            check = document.getElementById(`item art:${a.article}`)
            if(check){
                if(check.innerText == a.name){
                    check.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerText = `${a.number}`
                    check.nextElementSibling.nextElementSibling.nextElementSibling.innerText = `Стоимость: ${a.totalCoast}`
                    let totalCoastSum = 0;
                    for (let obj of basketGoods){
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
        
                console.log(a.article)
                goodName.innerHTML = `${a.name}`
                goodPrice.innerHTML = `Цена: ${a.price}`
                countItems.innerText = `Количество: `
                itemsNumber.innerText = `${a.number}`
                coast.innerText = `Стоимость: ${a.number * a.price}`
                deleteBtn.innerText = "Удалить предмет"
                deleteBtn.classList = 'btn delete-item-btn'
                minus.innerText= "-"
                minus.onclick = minusCountBasket;
                plus.innerText= "+"
                plus.onclick = plusCountBasket
                deleteBtn.onclick = this.deleteItem;

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

                let totalCoastSum = 0;
                for (let obj of basketGoods){
                    totalCoastSum += obj.totalCoast
                }
                let text = document.querySelector('.total-coast-items-basket')
                text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
                return
            }

        

    }
    counter (a){

        if (document.querySelector('.count-basket')){
            document.querySelector('.count-basket').innerText= basketGoods.length
        }
        else {
            let count = document.createElement('div')
            count.classList.add('count-basket') 
            if(basketGoods!=undefined){
                count.innerText= basketGoods.length}
            else{count.innerText = 0}
            let button = document.querySelector('.cart-show-btn')
            button.appendChild(count)
        }
    }
    render () {   
        let block = document.createElement('div')
        block.classList.add('cart')
        let goodItemList = document.createElement('div')
        goodItemList.classList.add('good-item-list')

        const list = document.createElement('div')
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

        let totalCoast = document.createElement('span')
        let totalCoastSum = 0;
        for (let obj of basketGoods){
            console.log(obj)
            totalCoastSum += obj.totalCoast
        }
        placeToRender = document.querySelector('.cart-list')

        totalCoast.classList= 'total-coast-items-basket'
        totalCoast.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
        let cleanBasket = document.createElement('button')
        cleanBasket.innerText = 'Очистить корзину'
        cleanBasket.setAttribute('class', 'btn clean-btn')
        cleanBasket.onclick = this.deleteBasket;

        if(!document.querySelector('.total-coast-items-basket')){
            placeToRender.appendChild(basketManag)
            basketManag.appendChild(totalCoast)
            basketManag.appendChild(cleanBasket)
        } else{
            let text = document.querySelector('.total-coast-items-basket')
            text.innerText = `Итоговая стоимость корзины: `+totalCoastSum;
        }
        
    }


}