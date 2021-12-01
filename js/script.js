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

const dataColors = ['1', '2', '3', '4', '5', '6'] // Исходный массив
const data = dataColors.concat(dataColors) // Удваиваем элементы массива
mixArray(data) // Миксуем все элементы массива


// Функция миксования массива алгоритмом Фишера-Йетса
function mixArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // случайный индекс от 0 до i
        let j = Math.floor(Math.random() * (i + 1))
        // меняем элементы местами
        let t = array[i]
        array[i] = array[j]
        array[j] = t
    }
    return array;
}

const cardsBody = document.querySelector('.cards')
const noticeBody = document.querySelector('.notice-body')


let isWaitingSecondCard = false
let firstCard
let allBlocked = false


// Render Cards
function renderCards(array) {
    let content = ``

    for (let i = 0; i < array.length; i++) {
        content += `
        <div class="card" value=${array[i]} >
            <div class="card__front"></div>
            <div class="card__back">${array[i]}</div>
        </div>
        `
    }
    cardsBody.innerHTML = content

    // Показываем на три секунды все карточки
    showAllCards()
}


cardsBody.addEventListener('click', (e) => {

    if (allBlocked) {
        // Показать уведомление
        showNotification('Подождите переворота карточек')
        return
    }
    if (e.target.classList.contains('card')) {

        // Если второй раз нажали на ту же карточку
        if (firstCard === e.target) {
            showNotification('Выберите вторую карточку')
            return
        }

        if (isWaitingSecondCard === false) {
            // Выбрали первую карточку
            firstCard = e.target // Запоминаем её
            firstCard.classList.add('active') // Переворачиваем

        } else {
            // Выбрали вторую карточку
            e.target.classList.add('active') // Переворачиваем

            // Если вторая карточка совпадает с первой
            if (firstCard.getAttribute('value') === e.target.getAttribute('value')) {
                // Добавляем класс invisible обоим карточкам
                firstCard.classList.add('hidden')
                e.target.classList.add('hidden')
                firstCard = ''

            } else {
                // Если не совпадает, убрать класс active через секунду
                allBlocked = true
                setTimeout(() => {
                    firstCard.classList.remove('active')
                    e.target.classList.remove('active')
                    allBlocked = false
                    console.log(allBlocked)
                    firstCard = ''
                }, 800)
            }
        }
        isWaitingSecondCard = isWaitingSecondCard ? false : true
    }
})

function showAllCards() {
    cardsBody.querySelectorAll('.card').forEach((item) => {
        item.classList.add('active')
        allBlocked = true
        setTimeout(() => {
            item.classList.remove('active')
            allBlocked = false
        }, 3000)
    })
}

// Создаём и показываем уведомление
function showNotification(message) {
    const notice = document.createElement('div')
    notice.classList.add('notice')
    notice.innerHTML = message
    noticeBody.appendChild(notice)
    setTimeout(() => notice.remove(), 2000)
}


renderCards(data)




