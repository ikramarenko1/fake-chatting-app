const messagesContent = $('.chat__content');
const messageInput = $('.chat__input');
const messageSubmit = $('.chat__submit');
const avatarImage = './assets/images/avatar.jpg';

// Сообщения, которые будет присылать фейковый пользователь
const fakeMessages = [
	'Hi there, it\'s the first message!',
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

let minutes = 0;

// Инициализируем скроллбар и отображение сообщений в чате при загрузке страницы
$(window).on('load', function () {
	messagesContent.mCustomScrollbar();
	setTimeout(fakeMessage, 100);
});

// Добавим метку времени и прокрутку к низу
function updateScrollBar() {
	messagesContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
		scrollInertia: 10,
		timeout: 0
	});
};

function addTimeStamp() {
	const date = new Date();
	const minutesNow = date.getMinutes();

	if (minutes !== minutesNow) {
		minutes = minutesNow;

		const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);

		$('.message:last').append(timeStamp);
	};
};

function addMessageToPage(msg, isPersonal = false) {
	const message = $('<div class="message"></div>').text(msg);

	if (isPersonal) {
		message.addClass("message__personal");
	} else {
		const figure = $('<figure class="avatar"></figure>');
		const image = $('<img>').attr('src', avatarImage);

		figure.append(image);

		message.addClass('new').prepend(figure);
	}

	$('.mCSB_container').append(message);

	addTimeStamp();
	updateScrollBar();
};

// Вставляем сообщение пользователя
function insertMessage() {
	const messageText = messageInput.val().trim();

	if (messageText === '') {
		return false;
	}

	addMessageToPage(messageText, true);
	messageInput.val(null);
	setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
};

// Добавляем прослушку на инпут сообщения и нажатие на кнопку "Отправить"
messageInput.on('keydown', function(e) {
	// Если пользователь нажал Enter - отправить сообщение
	if (e.which === 13) {
		insertMessage();
		return false;
	}
});

messageSubmit.on('click', insertMessage);

// Функция для отображения сообщения "загрузки" и смена на сообщение через 1-2 секунды
function fakeMessage() {
	if (messageInput.val() !== '') {
		return false;
	}

	const loadingMessage = $('<div class="message__loading new"></div>');
	const figure = $('<figure class="avatar"></figure>');
	const image = $('<img>').attr('src', avatarImage);

	figure.append(image);
	loadingMessage.append(figure).append($('<span></span>'));
	$('.mCSB_container').append(loadingMessage);

	updateScrollBar();

	setTimeout(function () {
		loadingMessage.remove();
		addMessageToPage(fakeMessages.shift());
	}, 1000 + (Math.random() * 20) * 100);
}