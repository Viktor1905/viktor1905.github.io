const http = require('http');
const fs = require('fs') 

const server = http.createServer((req, res) => { // req - все данные о нашем запросе    res - ответ (то, что отдаим клиенту) 
    console.log(req.url)// дает возможность посмотреть откуда идут запросы
    let a = '.'+req.url;
    console.log(a)
    let rePublic = /.*\.css|.*\.html/
    let reJs =/.*\.js$/
    let reJson=/.*\.json/
    let reImg=/.*\.jpg|.*\.jpeg|.*\.png|.*\.ico/
    console.log('x'+a.match(reJs))
    try {
        if (a === './'){
            let b = fs.readFileSync('public/index.html')
            res.end(b)
        } else if(a.match(reJs)!=null){
            let b = fs.readFileSync(a)
            res.end(b)
        } else if(a.match(reJson)!=null){
            a = req.url
            let b = fs.readFileSync('.'+a)
            res.end(b)
        } else if(a.match(reImg)!=null){
            let b = fs.readFileSync(a)
            res.end(b)
        } else if(a.match(rePublic)!=null){
            let b = fs.readFileSync('public'+req.url)
            res.end(b)
        } else {
            let b  = fs.readFileSync(a) 
            res.end(b)
        }
    
    } catch (e){
        console.log(e)
        let b  = fs.readFileSync('img/unnamed.jpg') 
        res.end(b)
        

    }



    console.log(a)


    
});
    //создание сервера. Функция обработчик- функция. которая вызывается на каждый запрос (обновление страницы, например)
    const port = process.env.PORT || 3000  // переменная окружения, через нее предоставляют хостинги порты env - окружение, у него свойство порт
    server.listen(port)
    console.log('Server started on port ' + port + ' !')

