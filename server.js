const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => { // req - все данные о нашем запросе    res - ответ (то, что отдаим клиенту) 
    console.log(req.url)// дает возможность посмотреть откуда идут запросы
    let a = '.'+req.url;
    try {
        if (a === './'){
            let b = fs.readFileSync('./index.html')
            res.end(b)
        } else {
            let b  = fs.readFileSync(a) 
            res.end(b)
        }
    
    } catch (e){
        let b  = fs.readFileSync('./img/unnamed.jpg') 
        res.end(b)
        

    }



    console.log(a)


    
});
    //создание сервера. Функция обработчик- функция. которая вызывается на каждый запрос (обновление страницы, например)
    const port = process.env.PORT || 3000  // переменная окружения, через нее предоставляют хостинги порты env - окружение, у него свойство порт
    server.listen(port)
    console.log('Server started on port ' + port + ' !')

