/*
 Алгоритм Memory Game
 1. К исходному массиву добавляем еще такой же массив
 2. Пермешиваем массив
 3. Рендерим наши карточки
 4. Когда нажали на карточку, ей присваивается класс active. Запоминаем карточку в переменной firstCard
 5. Переменная isWaitingSecondCard - true, означает, что ожидаем переворота второй карточки 
 6. Нажали на вторую карточку. Ей тоже присваивается класс active.
 7. Сравниваем value у firstCard и нажатой карточки. Если совпадает, то обеим карточкам присваиваем класс hidden
 8. Иначе через секунду убираем класс active у обеих карточек
*/

const dataColors = ['#F76B37', '#B7F7BF', '#9D9E9D'] // Исходный массив
const data = dataColors.concat(dataColors) // Удваиваем элементы массива
mixArray(data) // Миксуем все элементы массива


// Функция миксования массива алгоритмом Фишера-Йетса
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
let isWaitingSecondCard = false
let firstCard;


// Render Cards
function renderCards(array) {
    let content = ``

    for (let i = 0; i < array.length; i++) {
        content += `
        <div class="card" value=${array[i]} >
            <div class="card__front" style="background: green">Рубашка</div>
            <div class="card__back" style="background: ${array[i]}">Контент</div>
        </div>
        `
    }

    cardsBody.innerHTML = content
}


cardsBody.addEventListener('click', (e) => {

    // При нажатии на карточку
    if (e.target.classList.contains('card')) {

        if (isWaitingSecondCard === false) {
            // Выбрали первую карточку
            console.log('Выбрали первую карточку')
            // Запоминаем её
            firstCard = e.target
            // Переворачиваем
            firstCard.classList.add('active')

        } else {
            // Выбрали вторую карточку
            console.log('Выбрали вторую карточку')
            // Переворачиваем
            e.target.classList.add('active')

            // Если вторая карточка совпадает с первой
            if (firstCard.getAttribute('value') === e.target.getAttribute('value')) {
                console.log('!Они совпадают!')
                // Добавляем класс invisible обоим карточкам
                firstCard.classList.add('hidden')
                e.target.classList.add('hidden')
                
            } else {
                // Если не совпадает, убрать класс active через секунду
                setTimeout(()=>{
                    firstCard.classList.remove('active')
                    e.target.classList.remove('active')
                }, 1000)
            }
        }
        isWaitingSecondCard = isWaitingSecondCard ? false : true
    }
})


renderCards(data)




