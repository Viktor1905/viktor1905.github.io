

    let dateStart =  +localStorage.getItem('time')
    let datePause = localStorage.getItem('pause')
    let dateFinish = 0
    let started = false
    let paused = localStorage.getItem('finished')
    console.log(localStorage.getItem('finished'))
    let interval 
    let intervalTime = localStorage.getItem('intervalTime')

    if (datePause == 1){
        dateFinish =  +localStorage.getItem('finish')

    }
    let finished = localStorage.getItem('finished')

    function start(){
        paused = 0
        localStorage.setItem('paused', paused)
        if (started == false){
        if(dateFinish != 0){
        intervalTime += dateFinish - dateStart
        }
        datePause = 0
        dateStart = Date.now()

        finished = false
        dateFinish = 0
        timer()
        localStorage.setItem('finished', finished)
        }
        started = true

    }
    localStorage.setItem('time', dateStart)
    function pause(){

        dateFinish = Date.now()
        datePause = 1
        localStorage.setItem('time', 0)
        if(paused == 1){
            dateStart = dateFinish
        }
        intervalTime = +intervalTime+(+dateFinish - +dateStart)
        dateStart = dateFinish
        localStorage.setItem('finish', dateFinish)
        finished = false
        localStorage.setItem('finished', finished)
        started = false

        paused = 1
        localStorage.setItem('paused', paused)

    }

    let timer = function (){
        
        if(finished != true){
            localStorage.setItem('time', dateStart)
        } 

        let ms 
        if(dateFinish != 0){
            ms = +intervalTime+(+dateFinish - +dateStart)

        }else{ 
             ms = +intervalTime+(Date.now() - +dateStart)
        }
        if(finished == "true"){
            ms = 0 
        }
        if(datePause == 1){
            intervalTime = +intervalTime+(+dateFinish - +dateStart)
            dateFinish = +dateStart
            ms = +intervalTime+(dateFinish - +dateStart)
        }
        let seconds = Math.floor((ms / 1000));
        if ((seconds >= 60)){
            seconds = seconds % 60;
        }
        let minutes = Math.floor((ms / (1000 * 60)))
        if ((minutes >= 60)){
            minutes = minutes % 60;
        }
        let houres = Math.floor((ms / (1000 * 60 * 60)))

        let placeToRender = document.querySelector('#time')

        placeToRender.innerText = `Часов:${houres} Минут:${minutes} Секунд:${seconds}`

        localStorage.setItem('pause', datePause)

        localStorage.setItem('intervalTime', intervalTime)
            
            
        }
    interval = function(){setInterval(()=>{
        timer()
    }, 1000)}
    function stop(){
        dateStart = Date.now()
        dateFinish = Date.now()
        finished = true
        intervalTime = 0
        localStorage.setItem('time', dateStart)
        datePause = 0
        localStorage.setItem('finished', finished)
        started = false
    }
    
    interval()