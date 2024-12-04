let chooseKeySettings = document.getElementById('choose-key-settings')
let chooseKeyInventory = document.getElementById('choose-key-inventory')
let chooseKeyLeft = document.getElementById('choose-key-left')
let chooseKeyRight = document.getElementById('choose-key-right')
let chooseKeyUp = document.getElementById('choose-key-up')
let chooseKeyDown = document.getElementById('choose-key-down')
let chooseKeyInteract = document.getElementById('choose-key-interact')

let chooseKeySettingsT = document.getElementById('choose-key-settingsT')
let chooseKeyInventoryT = document.getElementById('choose-key-inventoryT')
let chooseKeyLeftT = document.getElementById('choose-key-leftT')
let chooseKeyRightT = document.getElementById('choose-key-rightT')
let chooseKeyUpT = document.getElementById('choose-key-upT')
let chooseKeyDownT = document.getElementById('choose-key-downT')
let chooseKeyInteractT = document.getElementById('choose-key-interactT')

let isKeyChoosing = false

let MoveLeftKey = localStorage.getItem('MoveLeftKey') || 'a'
let MoveRightKey = localStorage.getItem('MoveRightKey') || 'd'
let UpKey = localStorage.getItem('UpKey') || 'w'
let DownKey = localStorage.getItem('DownKey') || 's'
let SettingsKey = localStorage.getItem('SettingsKey') || 'r'
let InventoryKey = localStorage.getItem('InventoryKey') || 'e'
let InteractKey = localStorage.getItem('InteractKey') || 'w'


let keyNow
const keyMap = {
	'Shift': 'SHIFT',
	'ContextMenu': 'CONTEXT',
    'Control': 'CTRL',
    'Alt': 'ALT',
    'Meta': 'META',
    'Enter': 'ENTER',
    'Backspace': 'BACKSP',
    'Escape': 'ESC',
    'ArrowLeft': '🡸',
    'ArrowRight': '🡺',
    'ArrowUp': '🡹',
    'ArrowDown': '🡻',
	' ': 'SPACE',
	'CapsLock': 'CAPS',
}

chooseKeySettings.innerHTML = keyMap[SettingsKey] || SettingsKey.toUpperCase()
chooseKeyInventory.innerHTML = keyMap[InventoryKey] || InventoryKey.toUpperCase()
chooseKeyLeft.innerHTML = keyMap[MoveLeftKey] || MoveLeftKey.toUpperCase()
chooseKeyRight.innerHTML = keyMap[MoveRightKey] || MoveRightKey.toUpperCase()
chooseKeyUp.innerHTML = keyMap[UpKey] || UpKey.toUpperCase()
chooseKeyDown.innerHTML = keyMap[DownKey] || DownKey.toUpperCase()
chooseKeyInteract.innerHTML = keyMap[InteractKey] || InteractKey.toUpperCase()

function abc(event) {
	if (isKeyChoosing && event.key !== '/' && event.key !== 'Enter') {
		let key_text = keyMap[event.key] || event.key.toUpperCase()
		let keyReal = event.key
		console.log(key_text)
	
		if (keyNow === 'settings') {
			chooseKeySettings.innerHTML = key_text
			SettingsKey = keyReal
			localStorage.setItem('SettingsKey', SettingsKey)
		}
	
		else if (keyNow === 'inventory') {
			chooseKeyInventory.innerHTML = key_text
			InventoryKey = keyReal
			localStorage.setItem('InventoryKey', InventoryKey)
		}
	
		else if (keyNow === 'left') {
			chooseKeyLeft.innerHTML = key_text
			MoveLeftKey = keyReal
			localStorage.setItem('MoveLeftKey', MoveLeftKey)

		}
	
		else if (keyNow === 'right') {
			chooseKeyRight.innerHTML = key_text
			MoveRightKey = keyReal
			localStorage.setItem('MoveRightKey', MoveRightKey)
		}
	
		else if (keyNow === 'interact') {
			chooseKeyInteract.innerHTML = key_text
			InteractKey = keyReal
			localStorage.setItem('InteractKey', InteractKey)
		}

		else if (keyNow === 'up') {
			chooseKeyUp.innerHTML = key_text
			UpKey = keyReal
			localStorage.setItem('UpKey', UpKey)
		}
	
		else if (keyNow === 'down') {
			chooseKeyDown.innerHTML = key_text
			DownKey = keyReal
			localStorage.setItem('DownKey', DownKey)
		}
		chooseKeyCancel()
	}
}

document.addEventListener('keydown', abc)
invisibleScreen.addEventListener('click', () => {
	if (isKeyChoosing) {
		chooseKeyCancel()
	}
})

function chooseKey() {
	pauseGame()
	isKeyChoosing = true
	invisibleScreen.style.zIndex = 99999
}

function chooseKeyCancel() {
	isGameStop = false
	isKeyChoosing = false
	invisibleScreen.style.zIndex = -10

	if (keyNow === 'settings') {
		chooseKeySettingsT.innerHTML = 'Настройки'
	}

	else if (keyNow === 'inventory') {
		chooseKeyInventoryT.innerHTML = 'Инвентарь'
	}

	else if (keyNow === 'left') {
		chooseKeyLeftT.innerHTML = 'Влево'
	}

	else if (keyNow === 'right') {
		chooseKeyRightT.innerHTML = 'Вправо'
	}

	else if (keyNow === 'interact') {
		chooseKeyInteractT.innerHTML = 'Взаимодействие'
	}

	else if (keyNow === 'down') {
		chooseKeyDownT.innerHTML = 'Вниз'
	}
	
	else if (keyNow === 'up') {
		chooseKeyUpT.innerHTML = 'Вверх'
	}
}

function chooseKeyOnClick(a) {
	keyNow = a
	if (!isKeyChoosing) {
		if (keyNow === 'settings') {
			chooseKeySettingsT.innerHTML = 'Выберите клавишу'
			chooseKey()
		}
	
		else if (keyNow === 'inventory') {
			chooseKeyInventoryT.innerHTML = 'Выберите клавишу'
			chooseKey()
		}
		
		else if (keyNow === 'left') {
			chooseKeyLeftT.innerHTML = 'Выберите клавишу'
			chooseKey()
		}
	
		else if (keyNow === 'right') {
			chooseKeyRightT.innerHTML = 'Выберите клавишу'
			chooseKey()
		}
		
		else if (keyNow === 'interact') {
			chooseKeyInteractT.innerHTML = 'Выберите клавишу'
			chooseKey()
		}

		else if (keyNow === 'down') {
			chooseKeyDownT.innerHTML = 'Выберите клавишу'
			chooseKey()
		}
		
		else if (keyNow === 'up') {
			chooseKeyUpT.innerHTML = 'Выберите клавишу'
			chooseKey()
		}
		
	}
}


chooseKeySettings.addEventListener('click', () => {chooseKeyOnClick('settings')})
chooseKeyInventory.addEventListener('click', () => {chooseKeyOnClick('inventory')})
chooseKeyLeft.addEventListener('click', () => {chooseKeyOnClick('left')})
chooseKeyRight.addEventListener('click', () => {chooseKeyOnClick('right')})
chooseKeyUp.addEventListener('click', () => {chooseKeyOnClick('up')})
chooseKeyDown.addEventListener('click', () => {chooseKeyOnClick('down')})
chooseKeyInteract.addEventListener('click', () => {chooseKeyOnClick('interact')})


