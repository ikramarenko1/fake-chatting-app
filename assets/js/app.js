const messagesContent = $('.chat__content');
const messageInput = $('.chat__input');
const messageSubmit = $('.chat__submit');
const avatarImage = './assets/images/avatar.jpg';

// Сообщения, которые будет присылать фейковый пользователь
const fakeMessages = [
	'Hi there, it\'s the <img src="./assets/images.avatar.jpg"> first message!',
	'Nice to meet you!',
	'How are you?',
	'Not too bad, thanks',
	'That\'s awesome',
	'Okay, let me ask you some questions',
	'How much do you have the problem',
	'Not pretty good...',
	'I\'m sure, everything will be OK',
	'Anyway I\'ve gotta go now',
	'It was a pleasure chat with you',
	'Bye! Have a nice day!',
	':)'
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

// Добавление времени к каждому сообщению в формате "HH:MM"
function addTimeStamp() {
	const date = new Date();
	const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${date.getMinutes()}`); // создаем div.timestamp и пихаем в него текст в формате "HH:MM"

	$('.message:last').append(timeStamp); // добавляем только последнему сообщению на странице
};


// Добавление сообщения на страницу (msg - сообщение, isPersonal - сообщение от фейка или юзера)
function addMessageToPage(msg, isPersonal = false) {
	const message = $('<div class="message"></div>').text(msg); // создаем div.message и пихаем в него текст msg

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