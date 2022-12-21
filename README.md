# New Agelar
#### Dependencies:
Bootstrap, Swiper, Custom Tabs Component, Custom Scroll Component

## Installation:
```sh
npm install
```

And go to watch:
```sh
npm run start
```

Build:
```sh
npm run build
```


## Start
После команды 'start', папка 'src' станет наблюдаемой и все файлы внутри нее. Если в какоq-то из файлов, который находится в ней будет изменен, сборка начнет обновляться. Она воспроизводится в папке "build". 

## Build
После команды 'build', нужно зайти в одноименную папку и найти все файлы сборки.

## Различия между командами 
Start - собирает быстро с включением лайв-сервера для разработки, не сжимая файлы и стили 
Build - оптимизирует все файлы сборки, генерирует шрифты и картинки в другие форматы



## Как добавить картинки в спрайт: 
Нужно взять картинку в формате SVG, и поместить ее в папку "src/svg/", при включенном наблюдении за папкой через команду выше.

Пример включения картинки из спрайта: 
```html
<svg style="width: 7px; height: 13px;">
    <use xlink:href="img/sprite.svg#arrow-sidebar" />
</svg>
```

#arrow-sidebar - это 'id' внутри файла, совпадает с именем картинки добавленной в спрайт по пути выше.


