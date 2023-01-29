
class CommonList {

    static body = document;

    constructor(){

    }
    items = []
    err 
    fetchGoods (x = `${window.location.href}json/database.json`){
        console.log(x)
        const result = fetch(x) // сделали запрос на сервер и получили промис

        return result 
        .then (res =>{ 
            this.res = res
            return res.json()
        })// сделали перевод данных в объект
        .then(data =>{
// тут хранится объект из операции выше
            this.items = data.data.map((cur) => { 
                return new GoodItem(cur) 
            })// в items мы поместили массив, который переделали с помощью gooditem в отдельные объекты, data.data - чтоб получить объект data - все наши массивы (нужные для операции), которые хранятся в переменной data, в начале данного then
        })
        .catch (err => { // будет срабатывать когда нет сети, или произошла ошибка передачи данных (т.е. пробелмы с соединением)
            this.err = err
            console.warn("Check network", err)
        }) 
    }

}