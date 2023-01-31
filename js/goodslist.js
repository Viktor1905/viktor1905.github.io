class GoodsList extends CommonList {
    static allItems = []
    placeToRender = document.querySelector('.more-btn-place')

    constructor() {
        super () 
        let goodsPromise = this.fetchGoods()

        goodsPromise.then(() => {
            this.items.forEach(good => {
                GoodsList.allItems.push(good)
            })
            this.render()
        })
    } //запрос товаров
    qur = 1

    hideShowMoreBtn() {
        let btn = document.querySelector(".more-btn")
        btn.remove()
    }

    moreShow = (() => {
        let _x = 0;
        let _b = 0
        GoodsList.allItems.forEach(good => {
            let exist = document.getElementById(`item №${good.article}`)
            if (exist) {
                _b++           
                if(this.items.length - _b == 3 && _b != 3) { 
                    if (!this.err){
                        let goodsPromise = this.fetchGoods(`${window.location.href}json/database`+this.qur+`.json`)
                        this.qur++
                        goodsPromise.then(()=> {
                            if (!this.err){
                            this.items.forEach(good => { 
                                GoodsList.allItems.push(good)
                            })
                            }
                        })
                    }
                    return

                } else if(this.items.length - _b == 4 && _b != 4) {

                      if (!this.err) {
                        let goodsPromise = this.fetchGoods(`${window.location.href}json/database`+this.qur+`.json`)
                        this.qur++
                        goodsPromise.then(()=> {
                            if (!this.err){
                            this.items.forEach(good => { 
                                GoodsList.allItems.push(good)
                            })
                            }
                        })
                    } 
                }

            } else {
                if(_x<2) {
                    good.render(good)
                    this.placeToRender.before(good.block)
                    _x++
                }
            } 
            if (GoodsList.allItems.length - _b == 0) {
                this.hideShowMoreBtn()
                if(!document.querySelector('.goods-end')) {
                    let goodsEnd = document.createElement('div')
                    goodsEnd.classList = 'goods-end'
                    goodsEnd.innerText = "Вы просмотрели все наши товары"
                    this.placeToRender = document.querySelector('.more-btn-place')
                    this.placeToRender.insertAdjacentElement('beforebegin', goodsEnd)
                }
            }
        })
    })
    render() {
        GoodsList.allItems.forEach(good => {
        if(GoodsList.allItems.indexOf(good) < 5) {
            good.render(good)
            this.placeToRender.before(good.block)
            }
        })
        if (this.placeToRender) {
            if (!document.querySelector('.more-btn')) {
            let moreBtn = document.createElement('button')
            moreBtn.innerText = 'Показать еще'
            moreBtn.classList = 'btn more-btn'
            moreBtn.onclick = this.moreShow;
            this.placeToRender.appendChild(moreBtn)
            }
        }
    }
}