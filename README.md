# gsmap - приложение для парсинга данных об аэропортах

Пример размещен на https://gcmap-parser.herokuapp.com/
Перейдите на сайт и введите в строку поиске IEV, полученная информация с сайта http://www.gcmap.com/airport/IEV приведется к виду:

```
Name: Zhulyany
Latitude: 50°24'06"N (50.401694)
Longitude: 30°26'59"E (30.449697)
Time Zone: UTC+2 (DST+3)
```
И будет выведена ниже строки поиска

### Установка

Необходимые требования:
* node.js ([установка](https://nodejs.org/))
* git ([установка](http://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git))

#### Шаги по установке на Linux/mac
 1. Скачать данное приложение
 ```sh
 $ git clone https://github.com/klik1301/gcmap
 $ cd gcmap
 ```

 2. Выполнить загрузку модулей
 ```sh
 $ npm install
 ```

 3. Запустить приложение
 ```sh
 $ node ./bin/www
 ```

 4. Открыть приложение в браузере http://localhost:3000/