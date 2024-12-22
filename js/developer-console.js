let ng_2024 = false
let isConsoleUnlocked = localStorage.getItem('isConsoleUnlocked') || null
// let isConsoleUnlocked = false
let isConsoleOpened = false
let devConsoleInset = document.getElementById('dev-console-inset')
let commandConsoleBox = document.getElementById('command-console-box')
let commandConsole = document.getElementById('command-console')
let ccInput = document.getElementById('cc-input')
let ccHistory = document.getElementById('cc-history')

function closeCC() {
	commandConsoleBox.style.opacity = 0
	commandConsole.style.opacity = 0
	setTimeout(() => {
		commandConsoleBox.style.zIndex = -100
		commandConsole.style.zIndex = -100
		ccInput.blur()
		ccInput.value = ''
		ccHistory.innerHTML = 'Введите команду'
		ccHistory.style.color = '#0c941e'
		ccHistory.style.borderColor = '#69696988'
	}, 200)
	isGameStop = false
	isConsoleOpened = false
}

document.addEventListener('keydown', function(event) {
	if (event.key === '/' && isConsoleUnlocked) {
		if (!isConsoleOpened && !isGameStop && !isAnyActivityOpen && !settingsOn && !inventoryOn) {
			commandConsoleBox.style.zIndex = 9998
			commandConsole.style.zIndex = 9999
			commandConsoleBox.style.opacity = 100
			commandConsole.style.opacity = 100
			isConsoleOpened = true
			pauseGame()
			ccInput.focus()
		}
		else if (isConsoleOpened) {
			closeCC()
		}
	}
})

commandConsoleBox.addEventListener('click', closeCC)

ccInput.addEventListener("input", function(event) {
    let value = event.target.value
    if (value.includes("/")) {
        event.target.value = value.replace("/", '')
    }
})

function checkItemCommandFormat(s) {
    let pattern = /^item (0|1|2|3|4|5|6|7|8|9|10|11)$/
    return pattern.test(s)
}


let CCvalue 
let aTime
function checkCommand() {
	CCvalue = ccInput.value.toLowerCase().trim()
	ccInput.value = ''
	let speedTest = /^speed (10(\.0+)?|[0-9]?(?:\.[0-9]+)?)$/

	if (speedTest.test(CCvalue)) {
		speed = parseFloat(CCvalue.slice(6))
		closeCC()
	}
	else if (CCvalue === 'ng 2025') {
		if (!ng_2024) {
			closeCC()
			// ITEMS_ON_INVENT.push({id:4})
			AUDIO.ng2024.play()
			AUDIO.game_bg.pause()
			npcTalk('Ого! Новогодняя шапочка!')
			ng_2024 = true
			changeGG('right-ng')
			aTime = setTimeout(() => {
					AUDIO.game_bg.play()
					AUDIO.game_bg.loop = true
				if (!ngHat) {
					changeGG('right')
				}
				npcTalk('Все, новый год закончился :(')
				ng_2024 = false
			}, 265000)
		}
		else {
			ccHistory.innerHTML = `Новый год уже идёт! Наслаждайся`
			ccHistory.style.color = '#0c941e'
			ccHistory.style.borderColor = '#69696988'
		}
	}
	else if (CCvalue === 'password unlock') {
		secretNumber1.textContent = firstPassNum
		secretNumber2.textContent = secondPassNum
		secretNumber3.textContent = ThirdPassNum
		secretNumber4.textContent = FourthPassNum
		if (!isPasswordUnlocked) {
			npcTalk(`${randomPassword}... Это... Пароль?`)
		}
		else {
			npcTalk('...')
		}
		isPasswordUnlocked = true
		closeCC()
	}
	else if (CCvalue === 'ng stop') {
		clearTimeout(aTime)

		AUDIO.game_bg.play()
		AUDIO.game_bg.loop = true
		AUDIO.ng2024.pause()
		AUDIO.ng2024.currentTime = 0
		changeGG('right')
		npcTalk('Все, новый год закончился :(')
		ng_2024 = false
		ngHat = false
		closeCC()
	}
	else if (checkItemCommandFormat(CCvalue)) {
		let itemid = parseInt(CCvalue.slice(5))
		ITEMS_ON_INVENT.push({id: itemid})
		INVENT[itemid].isOnInventory = true
		closeCC()
	}
	else if (CCvalue === 'ng hat') {
		ITEMS_ON_INVENT.push({id: 4})
		INVENT[4].isOnInventory = true
		closeCC()
	}
	else if (CCvalue === 'clear') {
		for (const item of ITEMS_ON_INVENT) {
			let id = item.id
			if (INVENT[id].isOnInventory) {
				INVENT[id].isOnInventory = false
			}
		}
		while (ITEMS_ON_INVENT.length > 0) {
			ITEMS_ON_INVENT.pop()
		}
		closeCC()
	}
	else if (CCvalue === 'lock cmd') {
		isConsoleUnlocked = false
		localStorage.removeItem('isConsoleUnlocked')
		closeCC()
	}
	else {
		ccHistory.innerHTML = `Команда ${CCvalue} не существует или введена неправильно`
		ccHistory.style.color = '#b80e0e'
		ccHistory.style.borderColor = '#b80e0e'
	}


}

ccInput.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		checkCommand()
	}
})