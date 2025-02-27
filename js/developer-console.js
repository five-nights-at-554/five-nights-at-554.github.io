const BGTP = ['108', '109', '110', '111', '197', '198', '199', '200', '201', '202', '203', '204', '205', '206', '207', '208', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312']

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
    let pattern = /^item (0|1|2|3|4|5|6|7|8|9|10|11|12|13)$/
    return pattern.test(s)
}

function checkBgCommandFormat(s) {
	let bgnum = BGTP.some(item => s.includes(`bg ${item}`))
    return(bgnum)
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
		secretPassCount = 4
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
		if (ng_2024) {
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
		else {
			closeCC()
			npcTalk('Новый год и не начинался...')
		}
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

	else if (checkBgCommandFormat(CCvalue)) {
		bg_number = parseInt(CCvalue.slice(3))
		changeBG(bg_number)
		if (bg_number > 150 && bg_number < 250) {
			ReallyFloorNow = 2
		}
		else if (bg_number > 50 && bg_number < 150) {
			ReallyFloorNow = 1
		}
		else if (bg_number > 250 && bg_number < 350) {
			ReallyFloorNow = 3
		}
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