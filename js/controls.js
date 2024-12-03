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

let MoveLeftKey = localStorage.getItem('MoveLeftKey') || 'ArrowLeft'
let MoveRightKey = localStorage.getItem('MoveRightKey') || 'ArrowRight'
let UpKey = localStorage.getItem('UpKey') || 'ArrowUp'
let DownKey = localStorage.getItem('DownKey') || 'ArrowDown'
let SettingsKey = localStorage.getItem('SettingsKey') || 's'
let InventoryKey = localStorage.getItem('InventoryKey') || 'Shift'
let InteractKey = localStorage.getItem('InteractKey') || 'ArrowUp'


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

chooseKeySettingsT = document.getElementById('choose-key-settings').textContent = keyMap[SettingsKey] || SettingsKey.toUpperCase()
chooseKeyInventoryT = document.getElementById('choose-key-inventory').textContent = keyMap[InventoryKey] || InventoryKey.toUpperCase()
chooseKeyLeftT = document.getElementById('choose-key-left').textContent = keyMap[MoveLeftKey] || MoveLeftKey.toUpperCase()
chooseKeyRightT = document.getElementById('choose-key-right').textContent = keyMap[MoveRightKey] || MoveRightKey.toUpperCase()
chooseKeyUpT = document.getElementById('choose-key-up').textContent = keyMap[UpKey] || UpKey.toUpperCase()
chooseKeyDownT = document.getElementById('choose-key-down').textContent = keyMap[DownKey] || DownKey.toUpperCase()
chooseKeyInteractT = document.getElementById('choose-key-interact').textContent = keyMap[InteractKey] || InteractKey.toUpperCase()

function abc(event) {
	if (isKeyChoosing && event.key !== '/' && event.key !== 'Enter') {
		let key_text = keyMap[event.key] || event.key.toUpperCase()
		let keyReal = event.key
		console.log(key_text)
	
		if (keyNow === 'settings') {
			chooseKeySettings.textContent = key_text
			SettingsKey = keyReal
			localStorage.setItem('SettingsKey', SettingsKey)
		}
	
		else if (keyNow === 'inventory') {
			chooseKeyInventory.textContent = key_text
			InventoryKey = keyReal
			localStorage.setItem('InventoryKey', InventoryKey)
		}
	
		else if (keyNow === 'left') {
			chooseKeyLeft.textContent = key_text
			MoveLeftKey = keyReal
			localStorage.setItem('MoveLeftKey', MoveLeftKey)

		}
	
		else if (keyNow === 'right') {
			chooseKeyRight.textContent = key_text
			MoveRightKey = keyReal
			localStorage.setItem('MoveRightKey', MoveRightKey)
		}
	
		else if (keyNow === 'interact') {
			chooseKeyInteract.textContent = key_text
			InteractKey = keyReal
			localStorage.setItem('InteractKey', InteractKey)
		}

		else if (keyNow === 'up') {
			chooseKeyUp.textContent = key_text
			UpKey = keyReal
			localStorage.setItem('UpKey', UpKey)
		}
	
		else if (keyNow === 'down') {
			chooseKeyDown.textContent = key_text
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
		chooseKeySettingsT.textContent = 'Настройки'
	}

	else if (keyNow === 'inventory') {
		chooseKeyInventoryT.textContent = 'Инвентарь'
	}

	else if (keyNow === 'left') {
		chooseKeyLeftT.textContent = 'Влево'
	}

	else if (keyNow === 'right') {
		chooseKeyRightT.textContent = 'Вправо'
	}

	else if (keyNow === 'interact') {
		chooseKeyInteractT.textContent = 'Взаимодействие'
	}

	else if (keyNow === 'down') {
		chooseKeyDownT.textContent = 'Вниз'
	}
	
	else if (keyNow === 'up') {
		chooseKeyUpT.textContent = 'Вверх'
	}
}

function chooseKeyOnClick(a) {
	keyNow = a
	if (!isKeyChoosing) {
		if (keyNow === 'settings') {
			chooseKeySettingsT.textContent = 'Выберите клавишу'
		}
	
		else if (keyNow === 'inventory') {
			chooseKeyInventoryT.textContent = 'Выберите клавишу'
		}
		
		else if (keyNow === 'left') {
			chooseKeyLeftT.textContent = 'Выберите клавишу'
		}
	
		else if (keyNow === 'right') {
			chooseKeyRightT.textContent = 'Выберите клавишу'
		}
		
		else if (keyNow === 'interact') {
			chooseKeyInteractT.textContent = 'Выберите клавишу'
		}

		else if (keyNow === 'down') {
			chooseKeyDownT.textContent = 'Выберите клавишу'
		}
		
		else if (keyNow === 'up') {
			chooseKeyUpT.textContent = 'Выберите клавишу'
		}
		chooseKey()
	}
}


chooseKeySettings.addEventListener('click', () => {chooseKeyOnClick('settings')})
chooseKeyInventory.addEventListener('click', () => {chooseKeyOnClick('inventory')})
chooseKeyLeft.addEventListener('click', () => {chooseKeyOnClick('left')})
chooseKeyRight.addEventListener('click', () => {chooseKeyOnClick('right')})
chooseKeyUp.addEventListener('click', () => {chooseKeyOnClick('up')})
chooseKeyDown.addEventListener('click', () => {chooseKeyOnClick('down')})
chooseKeyInteract.addEventListener('click', () => {chooseKeyOnClick('interact')})

