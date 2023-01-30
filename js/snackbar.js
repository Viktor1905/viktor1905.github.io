let opacityNumb = 10

let snackbar =  (event, good)=>{
    console.log(good)
    if(!event.parentElement.querySelector(".mes-cart")){
        let placeToRender = event.parentElement
        let mes = document.createElement('div')
        if(Basket.basketGoods.find(goodInBasket => goodInBasket.name === good.name)){
            mes.innerText = 'Товар уже в корзине'
        }else{
        mes.innerText = 'Товар добавлен в корзину'}
        mes.classList.add("mes-cart")
        placeToRender.insertAdjacentElement('beforeEnd', mes)
        let elem = event.parentElement.querySelector(".mes-cart")
        console.log(elem)
        let del = function () {
                let disap = setInterval(()=>{        
                    opacityNumb-=1
                    elem.style["opacity"] = `0.${opacityNumb}`
                    console.log(elem.style["background"])
                    elem.setAttribute = `style`,`'background: rgba(35, 35, 35, ${opacityNumb});`         
                    if(opacityNumb == 1){
                        elem.remove()
                        opacityNumb = 10
                        return
                    }}, 20)
                setTimeout(()=>clearInterval(disap), 500)
                
        }
        setTimeout(del, 1500)
    }
}
