let isGameStop = false
var audTF = true
let speed = 2

const INVENT = [
	{
		id: 0,
		name: 'РЖАВЫЙ КЛЮЧ',
		description: 'Фу! Сколько лет этой железяке...',
		isOnInventory: false,
		isUsed: false
	},
]

const ITEMS_ON_INVENT = []

document.addEventListener('visibilitychange', function() {
	if (audTF) {
		if (document.visibilityState === 'hidden') {
			AUDIO.game_bg.pause()
		}
		else {
			AUDIO.game_bg.play()
		}
	}
})

function createSound(path) {
	let audio = new Audio()
	audio.src = path
	return(audio)
}

const AUDIO = {
	calm: createSound('/js/sounds/calm.mp3'),
	mainMenu: createSound('/js/sounds/mainMenu.mp3'),
	game_bg: createSound('/js/sounds/game_bg.mp3'),
}

function muz_game() {
	AUDIO.game_bg.play()
	AUDIO.game_bg.loop = true
	AUDIO.game_bg.autoplay = true
}

muz_game()

function f11Message() {
	let message = document.getElementById('press-f11')
	setTimeout(function() {
		message.style.opacity = 0
	}, 1000)
	setTimeout(function() {
		message.style.display = 'none'
	}, 3000)
}
f11Message()

const contextMenu = document.getElementById('context-menu')

window.addEventListener('contextmenu', (e) => {
        e.preventDefault()

        if (contextMenuTF) {
			const { clientX: mouseX, clientY: mouseY } = e

        	contextMenu.style.left = mouseX + 'px'
        	contextMenu.style.top = mouseY + 'px'

        	const { innerHeight, innerWidth } = window
        	const menuHeight = contextMenu.offsetHeight
        	const menuWidth = contextMenu.offsetWidth

        	if (mouseY + menuHeight > innerHeight) {
        	    contextMenu.style.top = (mouseY - menuHeight) + 'px'
        	}

        	if (mouseX + menuWidth > innerWidth) {
        	    contextMenu.style.left = (mouseX - menuWidth) + 'px'
        	}

        	contextMenu.style.display = 'block'
			}
})

window.addEventListener('click', () => {
    contextMenu.style.display = 'none'
})
	
	let isArrowLeftPressed = false 
	let isArrowRightPressed = false 
	
	const gg = document.getElementById('gg')

let talk_timeout
function npcTalk(npc__talk, time1 = 1500) {
	document.getElementById('npc-talk').textContent = npc__talk
	document.getElementById('text').style.display = 'block'
	document.getElementById('text').style.opacity = 100

	clearTimeout(talk_timeout)

	talk_timeout = setTimeout(function() {
		document.getElementById('text').style.opacity = 0
		setTimeout(function() {
			document.getElementById('text').style.display = 'none'
		}, 300)
	}, time1)

}

let lef = 3
let bg_number = 202

function movegg() {
	const arrow_hint = document.getElementById('arrow_hint')

	if (bg_number === 204) {
		document.getElementById('item0').style.zIndex = -10
		if (lef >= 64 && lef <= 96) {
			arrow_hint.style.display = 'block'
			arrow_hint.textContent = 'Горшок с деревом'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}

	}
	else if (bg_number === 205) {
		if (lef >= 91.5 && lef <= 155) {
			arrow_hint.style.display = 'block'
			arrow_hint.textContent = 'Дверь в актовый зал'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 206) {
		if (lef >= 100 && lef <= 155) {
			arrow_hint.style.display = 'block'
			arrow_hint.textContent = 'Лестница'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 202) {
		document.getElementById('item0').style.zIndex = -10
		if (lef >= 56 && lef <= 98) {
			arrow_hint.style.display = 'block'
			arrow_hint.textContent = 'Шкаф с наградами'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 203) {

		if (!INVENT[0].isOnInventory) {
			document.getElementById('item0').style.zIndex = 3
		}
		else {
			document.getElementById('item0').style.zIndex = -10
		}


		if (lef >= 27 && lef <= 62) {
			arrow_hint.style.display = 'block'
			arrow_hint.textContent = 'Окно на улицу'
			arrow_hint.style.color = '#d63a3a'
		}
		else if (lef >= 72 && lef <= 92 && !INVENT[0].isOnInventory) {
			arrow_hint.style.display = 'block'
			arrow_hint.textContent = 'Какой-то ключ...'
			arrow_hint.style.color = '#3ad6c9'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 306) {
		if (lef >= 38 && lef <= 82) {
			arrow_hint.style.display = 'block'
			arrow_hint.textContent = 'Лестница'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else {
		arrow_hint.style.display = 'none'
	}

    if (isArrowLeftPressed) {
 
        lef = lef - speed
        gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
    }
    if (isArrowRightPressed) {

        lef = lef + speed
        gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
    }

	if (lef <= 2) {
		if (bg_number >= 203 && bg_number <= 250) {
			lef = 148.5
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
			--bg_number
			document.getElementById('game-bg').src = `images/${bg_number}-game-bg.jpg`
		} else {
			lef = 2
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		}
	}
	else if (lef >= 150) {
		if (bg_number <= 205 && bg_number >=150) {
			lef = 2
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
			++bg_number
			document.getElementById('game-bg').src = `images/${bg_number}-game-bg.jpg`
		} else {
			lef = 148.5
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		}
	}
	
    requestAnimationFrame(movegg)
}
let right_pressedTF = false
let left_pressedTF = false
document.addEventListener('keydown', (event) => {
    if (!isGameStop) {
		if (event.key === 'ArrowLeft' && !isArrowLeftPressed) {
			document.getElementById('gg-img').src = 'images/fil-left.png'
			isArrowLeftPressed = true
			isArrowRightPressed = false
		} else if (event.key === 'ArrowRight' && !isArrowRightPressed) {
			document.getElementById('gg-img').src = 'images/fil-right.png'
			isArrowRightPressed = true
			isArrowLeftPressed = false
		}
	}
})

document.addEventListener('keyup', (event) => {
    if (!isGameStop) {
		if (event.key === 'ArrowLeft') {
			isArrowLeftPressed = false
		} else if (event.key === 'ArrowRight') {
			isArrowRightPressed = false
		}
	}
})
requestAnimationFrame(movegg)


let floorNow

function openFloorMenu(a) {
	isArrowLeftPressed = false
	isArrowRightPressed = false
    document.getElementById('choose-floor').style.display = 'block';
    document.getElementById('choose-floor').style.opacity = 100;
    document.getElementById('choose-floor').style.zIndex = 210;
    isGameStop = true;

    // Сброс состояния и активация второго этажа
    floorNow = a;
    updateActiveFloor();

    document.addEventListener('keydown', handleKeyDown);
}

function closeFloorMenu() {
    isGameStop = false;
    document.getElementById('choose-floor').style.display = 'none';
    document.getElementById('choose-floor').style.opacity = 0;
    document.getElementById('choose-floor').style.zIndex = -210;

    // Удаление обработчика событий
    document.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown(event) {
    if (isGameStop) {
        if (event.key === 'ArrowUp') {
            if (floorNow === 3) {
                floorNow = 1;
            } else if (floorNow === 2) {
                floorNow = 3;
            } else if (floorNow === 1) {
                floorNow = 2;
            }
            updateActiveFloor();
        } else if (event.key === 'ArrowDown') {
            if (floorNow === 2) {
                floorNow = 1;
            } else if (floorNow === 1) {
                floorNow = 3;
            } else if (floorNow === 3) {
                floorNow = 2;
            }
            updateActiveFloor();
        } else if (event.key === 'Enter') {
            if (floorNow === 3) {
				lef = 62
				document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
				bg_number = 306
				document.getElementById('game-bg').src = `images/306-game-bg.jpg`
				document.getElementById('inventory').style.background = '#0000008c'
				document.getElementById('settings-svg').style.background = '#0000008c'
			}
			else if (floorNow === 2) {
				lef = 126
				document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
				bg_number = 206
				document.getElementById('game-bg').src = `images/206-game-bg.jpg`
				document.getElementById('inventory').style.background = '#00000000'
				document.getElementById('settings-svg').style.background = '#00000000'
			}
            closeFloorMenu();
        }
    }
}

function updateActiveFloor() {
    // Сначала удаляем активные классы у всех этажей
    document.getElementById('floor1').classList.remove('floor-active');
    document.getElementById('floor2').classList.remove('floor-active');
    document.getElementById('floor3').classList.remove('floor-active');

    // Добавляем активный класс только к текущему этажу
    if (floorNow === 1) {
        document.getElementById('floor1').classList.add('floor-active');
    } else if (floorNow === 2) {
        document.getElementById('floor2').classList.add('floor-active');
    } else if (floorNow === 3) {
        document.getElementById('floor3').classList.add('floor-active');
    }
}

// Вызовите openFloorMenu(), чтобы открыть меню



let dsn = true
document.addEventListener('keydown', function(event) {
    if (!isGameStop) {
		if (event.key === 'ArrowUp') {
			console.log('Нажата стрелочка вверх')
			if (bg_number === 204) {
				if (lef >= 64 && lef <= 96) {
					npcTalk('Красивое дерево...')
				}
			}
			else if (bg_number === 205) {
				if (lef >= 91.5 && lef <= 155) {
					npcTalk('Блин! Нужен ключ!')
				}
			}
			
			else if (bg_number === 206) {
				if (lef >= 100 && lef <= 155) {
					openFloorMenu(2)
				}
			}
	
			else if (bg_number === 202) {
				if (lef >= 56 && lef <= 98) {
					npcTalk('Этот шкаф закрыт!')
				}
			}
	
			else if (bg_number === 203) {
				if (lef >= 27 && lef <= 62) {
					npcTalk('Уже так темно...')
				}
				else if (lef >= 72 && lef <= 92 && !INVENT[0].isOnInventory) {
					npcTalk('Что? это ключ? Положу его в рюкзак, на всякий случай...', 3000)
					document.getElementById('item0').style.zIndex = -10
					INVENT[0].isOnInventory = true
					ITEMS_ON_INVENT.push({
						id: 0,
						isUsed: false, 
					})
					console.log(ITEMS_ON_INVENT)
				}
			}

			else if (bg_number === 306) {
				if (lef >= 38 && lef <= 82) {
					openFloorMenu(3)
				}
			}
		}
	}
})

document.addEventListener('visibilitychange', function() {
	if (document.visibilityState === 'hidden') {
		isArrowRightPressed = false
		isArrowLeftPressed = false
	}
})











// settings
let settingsOn = false
var volume_val = localStorage.getItem('volume_value') || 80
console.log(volume_val)
	
document.getElementById('volume').value = volume_val
AUDIO.game_bg.volume = volume_val / 100
document.getElementById('volume-span').textContent = volume_val

function settingsView() {
	document.querySelector('.settingsView-box').style.zIndex = 850
	document.querySelector('.settingsView-box').style.opacity = 100
	settingsOn = true
}

document.getElementById('volume').addEventListener('input', () => {
	let volume_value = document.getElementById('volume').value
	AUDIO.game_bg.volume = volume_value / 100
	document.getElementById('volume-span').textContent = volume_value

	muz_game()
})

document.getElementById('speed-vaule').addEventListener('input', () => {
	let speed_value = document.getElementById('speed-vaule').value
	speed = speed_value / 10
	document.getElementById('speed-span').textContent = speed_value * 10
})

document.querySelector('#close_settings').addEventListener('click', () => {
	volume_val = document.getElementById('volume').value
	localStorage.setItem('volume_value', volume_val)
	document.querySelector('.settingsView-box').style.opacity = 0
	setTimeout(function() {
		document.querySelector('.settingsView-box').style.zIndex = -10
	}, 200)
	settingsOn = false
})

document.getElementById('settings-svg').addEventListener('click', () => {
	settingsView()
})


// inventory



let inventoryOn = false

document.addEventListener('keydown', function(event) {
    if (event.code === 'ShiftRight') {
        console.log('Нажат правый Shift')
		if (inventoryOn) {
			document.querySelector('.inventoryView-box').style.opacity = 0
			setTimeout(function() {
				document.querySelector('.inventoryView-box').style.zIndex = -10
			}, 200)
			inventoryOn = false
		} else if (!inventoryOn) {
			inventoryView()
		}
    }
})

function inventoryView() {
	document.querySelector('.inventoryView-box').style.zIndex = 849
	document.querySelector('.inventoryView-box').style.opacity = 100
	inventoryOn = true

	if (ITEMS_ON_INVENT.length === 1) {
		let a = ITEMS_ON_INVENT[0].id
		document.getElementById('descript_item-name').textContent = INVENT[a].name
		document.getElementById('descript_item-descript').textContent = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'
		document.getElementById('slot1').style.borderColor = '#1fbd00'

		document.getElementById('slot2').style.borderColor = '#000'
		document.getElementById('slot3').style.borderColor = '#000'
		document.getElementById('slot4').style.borderColor = '#000'
		document.getElementById('slot5').style.borderColor = '#000'
		document.getElementById('slot6').style.borderColor = '#000'
		document.getElementById('slot7').style.borderColor = '#000'


		document.getElementById('slot2').style.background = '#b4b4b44d'
		document.getElementById('slot3').style.background = '#b4b4b44d'
		document.getElementById('slot4').style.background = '#b4b4b44d'
		document.getElementById('slot5').style.background = '#b4b4b44d'
		document.getElementById('slot6').style.background = '#b4b4b44d'
		document.getElementById('slot7').style.background = '#b4b4b44d'
	}
}

document.querySelector('#close_inventory').addEventListener('click', () => {
	document.querySelector('.inventoryView-box').style.opacity = 0
	setTimeout(function() {
		document.querySelector('.inventoryView-box').style.zIndex = -10
	}, 200)
	inventoryOn = false
})

document.getElementById('settings-svg').addEventListener('click', () => {
	settingsView()
})

document.getElementById('inventory').addEventListener('click', () => {
	inventoryView()
})
