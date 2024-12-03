let ng_2024 = false
let isConsoleUnlocked = localStorage.getItem('isConsoleUnlocked') || true
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

if (isConsoleUnlocked) {
	devConsoleInset.style.display = 'flex'
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
    let value = event.target.value;
    if (value.includes("/")) {
        event.target.value = value.replace("/", '');
    }
})

let CCvalue 
function checkCommand() {
	CCvalue = ccInput.value.toLowerCase().trim()
	ccInput.value = ''
	let speedTest = /^speed (10(\.0+)?|[0-9]?(?:\.[0-9]+)?)$/

	if (speedTest.test(CCvalue)) {
		speed = parseFloat(CCvalue.slice(6))
		closeCC()
	}
	else if (CCvalue === 'ng2024') {
		// ITEMS_ON_INVENT.push({id:4})
		AUDIO.ng2024.play()
		setTimeout(() => {
			AUDIO.mainMenu.pause()
			AUDIO.game_bg.pause()
		}, 50);
		closeCC()
		npcTalk('Ого! Новогодняя шапочка!')
		ng_2024 = true
		document.getElementById('gg-img').src = 'images/fil-right-ng.png'
		setTimeout(() => {
			if (monster_on_toilet_voice) {
				AUDIO.mainMenu.play()
				AUDIO.mainMenu.loop = true
			}
			else {
				AUDIO.game_bg.play()
				AUDIO.game_bg.loop = true
			}
			ng_2024 = false
		}, 265000);
	}
	else if (CCvalue === 'password unlock') {
		
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