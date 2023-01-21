class Button {
    _text = ''
    _onClickClb = null
  
    constructor (text, clb) {
      this._text = text
      this._onClickClb = clb
    }
  
    get text () {
      return this._text
    }
  
    set text (value) {
      this._text = value
    }
  
    onBtnClick () {
      console.log('Clicked!')
      if (typeof this._onClickClb === 'function') {
        this._onClickClb()
      }
    }
  
    getMainTemplate (name) {
      if (name == undefined){
        name = "btn"
      }
      const btn = document.createElement('div')
      btn.classList.add(name)
      if (!(name === "btn")){
      btn.classList.add("btn")
      }
      return btn
    }
  
    getTemplate (name) {
      const btn = this.getMainTemplate(name)
      btn.innerHTML = this.text
  
      btn.addEventListener('click', () => {
        this.onBtnClick()
      })
  
      return btn
    }
  }
  