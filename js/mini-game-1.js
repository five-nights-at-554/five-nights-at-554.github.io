function createRandomNumber() {
	randomNumber = Math.floor(Math.random() * 100)
	return(randomNumber)
}
let mg1_random
let mg1_attempts = 7
let mg1_input = document.getElementById('mg1_input')
let mg1_attempts_span = document.getElementById('mg1_attempts_span')
let mg1_hint = document.getElementById('mg1_hint')
let mg1_button = document.getElementById('mg1_button')
let mg1_button2 = document.getElementById('mg1_button2')
let mg1_win = false
mg1_input.addEventListener('input', () => {
	mg1_input.value = mg1_input.value.replace(/[^0-9]/g, '')
	if (parseInt(mg1_input.value) === 0) {
		mg1_input.maxLength = 1
	}
	else if (parseInt(mg1_input.value) > 0 && parseInt(mg1_input.value) === 10) {
		mg1_input.maxLength = 3
	}
	else {
		mg1_input.maxLength = 2
	}
	if (mg1_input.value.length >= 3) {
			if (mg1_input.value[2] !== '0') {
				mg1_input.value = mg1_input.value.slice(0, 2) + '' + mg1_input.value.slice(3);
			}
			mg1_input.maxLength = 3
		}
})

function mg1_checkAnswer() {
	if (mg1_input.value.trim() !== '' && mg1_attempts > 0 && parseInt(mg1_input.value) >= 0 && parseInt(mg1_input.value) <= 100) {
		--mg1_attempts
		mg1_attempts_span.textContent = mg1_attempts
		let input_value = parseInt(mg1_input.value)
		if (!input_value) {
			input_value = 0
		}

		if (randomNumber > input_value) {
			mg1_hint.textContent = `Это число больше чем ${input_value}`
		} else if (randomNumber < input_value) {
			mg1_hint.textContent = `Это число меньше чем ${input_value}`
		} else if (randomNumber === input_value) {
			mg1_hint.textContent = 'Молодец, ты победил!'
			mg1_win = true
			document.querySelector('#mini-game1').style.opacity = 0
			setTimeout(function() {
				document.querySelector('#mini-game1').style.zIndex = -10
			}, 200)
			miniGame1On = false
			isGameStop = false
			npcTalk('Нож? Лишним точно не будет...')
			addInventItem(7)
		}
	}
	if (mg1_attempts === 0 && mg1_win === false) {
		mg1_hint.textContent = `Ты проиграл) Ответ: ${randomNumber}`
		mg1_button.style.display = 'none'
		mg1_button2.style.display = 'block'
	}
	mg1_input.value = ''
}

mg1_input.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		mg1_checkAnswer()
	}
})

function mg1_restart() {
	mg1_attempts = 7
	mg1_attempts_span.textContent = mg1_attempts
	mg1_input.value = ''
	mg1_random = createRandomNumber()
	mg1_hint.textContent = ''
	mg1_button2.style.display = 'none'
	mg1_button.style.display = 'block'
}

mg1_restart()
