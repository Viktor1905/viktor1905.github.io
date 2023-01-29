
class GoodsList extends CommonList {
    allItems = []

    constructor () {
        super () 
        let goodsPromise = this.fetchGoods()

        goodsPromise.then(()=>{
            this.items.forEach(good => {
                this.allItems.push(good)
            })
            this.render()
        })
    } //запрос товаров
    qur = 1
    hideShowMoreBtn(){
        let btn = document.querySelector(".more-btn")
        btn.remove()
    }
    moreShow = (() => {
        let _x = 0;
        let _b = 0
        this.allItems.forEach(good => {
            let exist = document.getElementById(`item №${good.article}`)
            if (exist){
                _b++           
                if(this.items.length - _b == 3 && _b != 3){ 
                    if (!this.err){
                        let goodsPromise = this.fetchGoods(`${window.location.href}json/database`+this.qur+`.json`)
                        this.qur++
                        goodsPromise.then(()=>{
                            if (!this.err){
                            this.items.forEach(good => { 
                                this.allItems.push(good)
                            })
                            }
                        })
                    }
                    return

                } else if(this.items.length - _b == 4 && _b != 4){

                      if (!this.err){
                        let goodsPromise = this.fetchGoods(`${window.location.href}json/database`+this.qur+`.json`)
                        this.qur++
                        goodsPromise.then(()=>{
                            if (!this.err){
                            this.items.forEach(good => { 
                                this.allItems.push(good)
                            })
                            }
                        })
                    } 
                }

            } else{
                if(_x<2){
                good.render()
                _x++}
                } 
            if (this.allItems.length - _b == 0){
                    this.hideShowMoreBtn()
                    if(!document.querySelector('.goods-end')){
                        let goodsEnd = document.createElement('div')
                        goodsEnd.classList = 'goods-end'
                        goodsEnd.innerText = "Вы просмотрели все наши товары"
                        let placeToRender = document.querySelector('.more-btn-place')
                        placeToRender.insertAdjacentElement('beforebegin', goodsEnd)
                    }
            }
        })
    })
    render () {
        this.allItems.forEach(good => {
        if(this.allItems.indexOf(good) < 5){
            good.render()
            }
        })
        let placeToRender = document.querySelector('.more-btn-place')
        if (placeToRender){
            if (!document.querySelector('.more-btn')){
            let moreBtn = document.createElement('button')
            moreBtn.innerText = 'Показать еще'
            moreBtn.classList = 'btn more-btn'
            moreBtn.onclick = this.moreShow;
            placeToRender.appendChild(moreBtn)
            }
        }
    }
}