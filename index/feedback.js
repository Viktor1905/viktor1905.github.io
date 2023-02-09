class Feedback {
    constructor(a){
        this.render(a)
    }
    render(a){
        let placeToRender = document.querySelector('footer')
        let feedback =`<div class = "feedback">
                            <h2 class="feedback-header">Обратная связь</h2>
                            <form class="feedback-list" onsubmit="return validation(this)">
                                <label for="feedback-name">Введите Ваше имя:</label>
                                <input type="text" class = "feedback-name" name="feedback-name" id="feedback-name" required> 
                                <label for="feedback-number">Введите Ваш номер телефона:</label>
                                <input type="text" class="feedback-number" name="feedback-number" id="feedbacknumber"  required>
                                <label for="feedback-mail">Введите Ваш e-mail:</label>
                                <input type="text" class="feedback-mail" name="feedback-mail" id="feedback-mail"  required>
                                <button class = "btn feedback-btn" type="submit" >Свяжитесь со мной</button>
                            </form>     
                        </div>`
        placeToRender.insertAdjacentHTML('afterbegin', feedback)
        // document.querySelector('.feedback-name').addEventListener("keyup", function(){
        //     this.value = this.value.replace(/[0-9\s]/g, "");})

}


}

validation =()=>{
    let valQur = 0
    let err
    let name = document.querySelector('.feedback-name')

    let reName = /([а-яa-z]+(?![0-9]))|([а-яa-z]+(?![0-9])+\s{1})([а-яa-z]+(?![0-9]))+/gi
    let x = name.value.match(reName, name.value)
    if (name.value.match(reName, name.value) != null){
        if (name.value.match(reName, name.value).join(' ') == name.value){
            console.log("Валидация имени пройдена")
            name.classList = "feedback-name feedback-good"
            valQur++
        }
    }else{
        name.classList = "feedback-name feedback-bad"
        err = name
    }

    let numb = document.querySelector('.feedback-number')
    let reNumb = /\+\d\(\d{3}\)\d{3}\-\d{4}/gi
    if (numb.value.match(reNumb, numb.value) != null){
        console.log("Валидация номера телефона пройдена")
        numb.classList = "feedback-number feedback-good"
        valQur++
    } else{
        numb.classList = "feedback-number feedback-bad"
        if(err==undefined){
            err = numb
        }
    }
    let mail = document.querySelector('.feedback-mail')
    let reMail = /\S+@\S+\.+[a-z]+/gi
    if (mail.value.match(reMail, mail.value) != null){
        console.log("Валидация e-mail телефона пройдена")
        mail.classList = "feedback-mail feedback-good"
        valQur++
    } else{
        mail.classList = "feedback-mail feedback-bad"
        if(err==undefined){
            err = mail
        }
        console.log(mail.focus())
    }
    if(valQur === 3){
        return true
    } else{ 
        err.focus() 
        return false
    }

}
new Feedback()