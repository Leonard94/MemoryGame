/*
Алгоритм Memory Game
 1. К исходному массиву добавляем еще такой же массив
 2. Пермешиваем массив
 3. Рендерим наши карточки
*/

const dataColors = ['#F76B37', '#B7F7BF', '#9D9E9D'] // Исходный массив
const data = dataColors.concat(dataColors) // Удваиваем элементы массива
mixArray(data) // Миксуем все элементы массива


// Функция миксования массива алгоритмом Фишера-Йейтса
function mixArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // случайный индекс от 0 до i
        let j = Math.floor(Math.random() * (i + 1))
        // меняем элементы местами
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
    return array;
}

const cardsBody = document.querySelector('.cards')

// Render Cards
function renderCards(array) {
    let content = ``

    for (let i = 0; i < array.length; i++) {
        content += `<div class="card" name=${array[i]} style="background: ${array[i]}"></div>`
    }

    cardsBody.innerHTML = content
}


renderCards(data)


