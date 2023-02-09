let opacityNumb = 10

let snackbar =  (event, good)=> {
    if(!event.parentElement.querySelector(".mes-cart")) {
        let placeToRender = document.getElementById(`item №${good.article}`)
        let mes = document.createElement('div')

        if(Basket.basketGoods.find(goodInBasket => goodInBasket.name === good.name)) {
            mes.innerText = 'Количество товара обновлено'
        }else {
            mes.innerText = 'Товар добавлен в корзину'}
            mes.classList.add("mes-cart")
            placeToRender.insertAdjacentElement('beforeEnd', mes)
            
            let elem = placeToRender.querySelector(".mes-cart")
            let del = function () {
                    let disap = setInterval(()=> {        
                        opacityNumb-=1
                        elem.style["opacity"] = `0.${opacityNumb}`
                        elem.setAttribute = `style`,`'background: rgba(35, 35, 35, ${opacityNumb});`         
                        if(opacityNumb == 1) {
                            elem.remove()
                            opacityNumb = 10
                            return
                        }}, 20)
                    setTimeout(() => clearInterval(disap), 500)   
            }
        setTimeout(del, 1500)
    }
}
