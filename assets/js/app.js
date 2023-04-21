const messagesContent = $('.chat__content');
const messageInput = $('.chat__input');
const messageSubmit = $('.chat__submit');
const avatarImage = './assets/images/avatar.jpg';

// Сообщения, которые будет присылать фейковый пользователь
const fakeMessages = [
	`<p>Привет! Как твои дела?</p>`,
	`<img src="./assets/images/iphone.jpg">`,
	`<p>Рад, что ты наконец появился в сети!</p>`,
	`<p>Есть много что тебе рассказать..</p>`,
	`<p>Та ничего особенного на самом деле. Учусь, работаю..</p>`,
	`<p>А еще купил телефон, прикинь?</p>`,
	`<p>Та айфон взял, никак не могу нарадоваться</p>`,
	`<img src="./assets/images/iphone.jpg">`,
	`<p>А у тебя что нового?</p>`,
	`<p>Блин, очень круто на самом деле, ты большой молодец!</p>`,
	`<p>Как бы оно не было, ты справишься, уверен в тебе</p>`,
	`<p>Обязательно приезжай, нам нужно встретиться!</p>`,
	`<p>Ладненько, я побежал, нужно бежать учиться</p>`,
	`<p>Пока, хорошего тебе дня!</p>`,
	`<p>:)</p>`
];


// Инициализация скроллбара и отображение первого сообщения при загрузке страницы
$(window).on('load', function () {
	messagesContent.mCustomScrollbar(); // добавляем mCSB к этому блоку
	setTimeout(fakeMessage, 100); // вызываем отображение первого сообщения
});


// Обновление скроллбара, нужно для того, чтобы после каждого сообщения страница прокручивалась вниз, чтобы пользователь мог видеть последнее сообщение
function updateScrollBar() {
	messagesContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
		scrollInertia: 10, // плавность прокрутки
		timeout: 0 // скорость прокрутки
	});
};

// Добавление 0 к началу, если часы/минуты < 10
function addZeroIfSingleDigit(time) {
	return time < 10 ? '0' + time : time;
}


// Добавление времени к каждому сообщению в формате "HH:MM"
function addTimeStamp() {
	const date = new Date();

	const hours = addZeroIfSingleDigit(date.getHours());
	const minutes = addZeroIfSingleDigit(date.getMinutes());

	const timeStamp = $('<div class="timestamp"></div>').text(`${hours}:${minutes}`); // создаем div.timestamp и пихаем в него текст в формате "HH:MM"

	$('.message:last').append(timeStamp); // добавляем только последнему сообщению на странице
};


// Добавление сообщения на страницу (msg - сообщение, isPersonal - сообщение от фейка или юзера)
function addMessageToPage(msg, isPersonal = false) {
	const message = $('<div class="message"></div>').append(msg); // создаем div.message и пихаем в него текст msg
	// можно использовать .text(msg), и в массиве фейковых сообщений убирать тэги, ведь будет вставляться просто как текст

	if (isPersonal) { // если сообщение от юзера то добавляем дополнительный класс для стилизации
		message.addClass("message__personal");
	} else { // в противном случае, добавляем фото фейк-пользователя к каждому сообщению
		const figure = $('<figure class="avatar"></figure>');
		const image = $('<img>').attr('src', avatarImage);

		figure.append(image);

		message.addClass('new').prepend(figure);
	}

	$('.mCSB_container').append(message); // добавляем новое сообщение

	addTimeStamp();
	updateScrollBar();
};


// Добавление сообщения с поля ввода
function insertMessage() {
	const messageText = messageInput.val().trim(); // убираем лишние пробелы в начале/конце

	if (messageText === '') { // если сообщение пустое - выходим
		return false;
	}

	addMessageToPage(messageText, true); // вызываем функцию и указываем, что сообщение личное
	messageInput.val(null); // очищаем поле для ввода
	setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100); // таймер на вызов функции с сообщением от фейка
};


// Добавление прослушки на то, если пользователь нажмет ENTER при отправке
messageInput.on('keydown', function(e) {
	if (e.which === 13) { // если пользователь нажал ENTER (код 13) - отправить сообщение
		insertMessage();
		return false;
	}
});
// Добавление прослушки на то, если пользователь нажмет на кнопку "Отправить"
messageSubmit.on('click', insertMessage);


// Отображение имитации печатания и смена на сообщение
function fakeMessage() {
	if (fakeMessages.length === 0) { // если кол-во элементов в массиве = 0 - выходим
		alert('Пользователь вышел из сети..');
		return false;
	}

	if (messageInput.val() !== '') { // если поле для ввода не пустое - выходим
		return false;
	}

	const loadingMessage = $('<div class="message message__loading new"></div>');
	const figure = $('<figure class="avatar"></figure>');
	const image = $('<img>').attr('src', avatarImage);

	figure.append(image);

	loadingMessage.append(figure).append($('<span></span>'));
	$('.mCSB_container').append(loadingMessage);

	updateScrollBar();

	setTimeout(function () {
		loadingMessage.remove();
		addMessageToPage(fakeMessages.shift()); // .shift() - возвращает первый элемент массива fakeMessages и удаляет его из массива.
	}, 1000 + (Math.random() * 20) * 100);
}