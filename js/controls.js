let chooseKeySettings = document.getElementById('choose-key-settings')
let chooseKeyInventory = document.getElementById('choose-key-inventory')
let chooseKeyLeft = document.getElementById('choose-key-left')
let chooseKeyRight = document.getElementById('choose-key-right')
let chooseKeyInteract = document.getElementById('choose-key-interact')

let chooseKeySettingsT = document.getElementById('choose-key-settingsT')
let chooseKeyInventoryT = document.getElementById('choose-key-inventoryT')
let chooseKeyLeftT = document.getElementById('choose-key-leftT')
let chooseKeyRightT = document.getElementById('choose-key-rightT')
let chooseKeyInteractT = document.getElementById('choose-key-interactT')

let isKeyChoosing = false

let MoveLeftKey = 'ArrowLeft'
let MoveRightKey = 'ArrowRight'
let SettingsKey = 's'
let InventoryKey = 'Shift'
let InteractKey = 'ArrowUp'


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
chooseKeyInteractT = document.getElementById('choose-key-interact').textContent = keyMap[InteractKey] || InteractKey.toUpperCase()

function abc(event) {
	if (isKeyChoosing) {
		let key_text = keyMap[event.key] || event.key.toUpperCase()
		let keyReal = event.key
		console.log(key_text)
	
		if (keyNow === 'settings') {
			chooseKeySettings.textContent = key_text
			SettingsKey = keyReal
		}
	
		else if (keyNow === 'inventory') {
			chooseKeyInventory.textContent = key_text
			InventoryKey = keyReal
		}
	
		else if (keyNow === 'left') {
			chooseKeyLeft.textContent = key_text
			MoveLeftKey = keyReal
		}
	
		else if (keyNow === 'right') {
			chooseKeyRight.textContent = key_text
			MoveRightKey = keyReal
		}
	
		else if (keyNow === 'interact') {
			chooseKeyInteract.textContent = key_text
			InteractKey = keyReal
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
}

function chooseKeyOnClick(a) {
	keyNow = a
	if (!isKeyChoosing) {
		if (keyNow === 'settings') {
			console.log(a)
			chooseKeySettingsT.textContent = 'Выберите клавишу'
		}
	
		else if (keyNow === 'inventory') {
			console.log(a)
			chooseKeyInventoryT.textContent = 'Выберите клавишу'
		}
		
		else if (keyNow === 'left') {
			console.log(a)
			chooseKeyLeftT.textContent = 'Выберите клавишу'
		}
	
		else if (keyNow === 'right') {
			console.log(a)
			chooseKeyRightT.textContent = 'Выберите клавишу'
		}
		
		else if (keyNow === 'interact') {
			console.log(a)
			chooseKeyInteractT.textContent = 'Выберите клавишу'
		}
		chooseKey()
	}
}


chooseKeySettings.addEventListener('click', () => {chooseKeyOnClick('settings')})
chooseKeyInventory.addEventListener('click', () => {chooseKeyOnClick('inventory')})
chooseKeyLeft.addEventListener('click', () => {chooseKeyOnClick('left')})
chooseKeyRight.addEventListener('click', () => {chooseKeyOnClick('right')})
chooseKeyInteract.addEventListener('click', () => {chooseKeyOnClick('interact')})


