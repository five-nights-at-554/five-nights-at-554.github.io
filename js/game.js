let secretPassCount = 0
let isGameStop = false
let isInfoOpened = false
let audTF = true
let speed = 2
let isAnyActivityOpen = false
let candles = 0
// let firstPassNum = Math.floor(Math.random() * 10)
// let secondPassNum = Math.floor(Math.random() * 10)
// let ThirdPassNum = Math.floor(Math.random() * 10)
// let FourthPassNum = Math.floor(Math.random() * 10)
let ReallyFloorNow = 1
let firstPassNum = 0
let secondPassNum = 4
let ThirdPassNum = 0
let FourthPassNum = 5
let randomPassword = `${firstPassNum}${secondPassNum}${ThirdPassNum}${FourthPassNum}`
let secretNumber1 = document.getElementById('secretNumber1')
let secretNumber2 = document.getElementById('secretNumber2')
let secretNumber3 = document.getElementById('secretNumber3')
let secretNumber4 = document.getElementById('secretNumber4')
secretNumber1.textContent = '*'
secretNumber2.textContent = '*'
secretNumber3.textContent = '*'
secretNumber4.textContent = '*'
let isPasswordUnlocked = false
let ngHat = false

let blackScreen = document.getElementById('black-screen')
let invisibleScreen = document.getElementById('invisible-screen')


function pauseGame() {
	isGameStop = true
	isArrowLeftPressed = false
	isArrowRightPressed = false
}

const BG = [
	'109',
	'110',
	'111',

	'197',
	'198',
	'199',
	'200',
	'201',
	'202',
	'203',
	'204',
	'205',
	'206',
	'207',
	'208',

	'303',
	'304',
	'305',
	'306',
	'307',
	'308',
	'309',
	'310',
	'311',
	'312',

	'207-1',
	'207-2',
	'207-3',
	'311-toilet',
	'310-help',
]

const GG = [
	'left',
	'right',
	'left-ng',
	'right-ng',
]

function changeBG(bgnum) {
	BG.forEach((bgn) => {
		document.getElementById(`game-bg-${bgn}`).style.zIndex = -10
	})
	document.getElementById(`game-bg-${bgnum}`).style.zIndex = 2
}
changeGG('right')

function changeGG(ggnum) {
	GG.forEach((ggn) => {
		document.getElementById(`gg-${ggn}`).style.display = 'none'
	})
	document.getElementById(`gg-${ggnum}`).style.display = 'block'
}

const INVENT = [
	{
		id: 0,
		name: 'КАКОЙ-ТО КЛЮЧ',
		description: 'Ого! Это ключ? Может пригодится...',
		isOnInventory: false,
		isUsed: false
	},

	{
		id: 1,
		name: 'СИНИЙ КАМЕШЕК',
		description: 'Он такой... Красивый?',
		isOnInventory: false,
		isUsed: false
	},

	{
		id: 2,
		name: 'КУСОК ШВАБРЫ',
		description: 'В руках бойца даже обычная палка - грозное оружие <br> (но я не боец)',
		isOnInventory: false,
		isUsed: false
	},

	{
		id: 3,
		name: 'СПИЧКИ',
		description: 'Думаю они еще пригодятся...',
		isOnInventory: false,
		isUsed: false
	},

	{
		id: 4,
		name: 'НОВОГОДНЯЯ ШЛЯПА',
		description: 'Всех с наступающим! <br> Нажмите "Enter" чтобы надеть',
		isOnInventory: false,
		isUsed: false
	},

	{
		id: 5,
		name: 'НАБОР ДЛЯ ПИНГ-ПОНГА',
		description: 'Щас бы с Петровичем поиграть...',
		isOnInventory: false,
		isUsed: false
	},
]

const ITEMS_ON_INVENT = []

document.addEventListener('visibilitychange', function() {
	if (audTF && !ng_2024) {
		if (document.visibilityState === 'hidden') {
			AUDIO.game_bg.pause()
			AUDIO.mainMenu.pause()
		}
		else {
			AUDIO.game_bg.play()
			if (monster_on_toilet_voice) {
				AUDIO.mainMenu.play()
			}
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
	monster: createSound('/js/sounds/monster.mp3'),
	monster_steps: createSound('/js/sounds/monster_steps.mp3'),
	mainMenu: createSound('/js/sounds/mainMenu.mp3'),
	toilet: createSound('/js/sounds/toilet.mp3'),
	skaf_open: createSound('/js/sounds/skaf_open.mp3'),
	take_key: createSound('/js/sounds/take_key.mp3'),
	steps: createSound('/js/sounds/steps.mp3'),
	ng2024: createSound('/js/sounds/ng2024.mp3'),
	piano: createSound('/js/sounds/piano.mp3'),
}

// AUDIO.monster.volume = 0.5

function muz_game() {
	AUDIO.game_bg.play()
	AUDIO.game_bg.loop = true
	AUDIO.game_bg.autoplay = true
}

function fadeOutAudio(audioElement, duration) {
    let volume = 1.0
    const interval = 50

    const fadeOutInterval = setInterval(() => {
        volume -= interval / (duration * 1000)
        audioElement.volume = Math.max(0, volume)

        if (volume <= 0) {
            clearInterval(fadeOutInterval)
            audioElement.pause()
        }
    }, interval)
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

function removeInventItem(e) {
	INVENT[e].isOnInventory = false
	INVENT[e].isUsed = true
	ITEMS_ON_INVENT.splice(ITEMS_ON_INVENT.findIndex(item => item.id === e), 1)	
}

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
const ggLeft = document.getElementById('gg-left')
const ggRight = document.getElementById('gg-right')
const ggLeftNg = document.getElementById('gg-left-ng')
const ggRightNg = document.getElementById('gg-right-ng')

let talk_timeout
function npcTalk(npc__talk, time1 = 2000) {
	document.getElementById('npc-talk').innerHTML = npc__talk
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

let lef = 40
gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
let bg_number = 197
// let bg_number = 110

changeBG(bg_number)

function movegg() {
	const arrow_hint = document.getElementById('arrow_hint')

	if (bg_number === 204) {
		if (lef >= 64 && lef <= 96) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Горшок с деревом'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}

	}
	else if (bg_number === 205) {
		if (lef >= 91.5 && lef <= 155) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Дверь в актовый зал'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 206) {
		if (lef >= 100 && lef <= 155) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Лестница'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
		document.getElementById('item0').style.zIndex = -10
	}
	else if (bg_number === 199) {
		if (lef >= 4 && lef <= 56) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Лестница'
			arrow_hint.style.color = '#d63a3a'
		}
		else if (lef >= 124 && lef <= 150) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Женский туалет'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}
	else if (bg_number === 198) {
		if (lef >= 46 && lef <= 67) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Кабинет информатики'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}
	else if (bg_number === 197) {
		if (lef >= 2 && lef <= 150) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Стол для пинг-понга'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 202) {
		if (lef >= 56 && lef <= 98) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Шкаф с наградами'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 304) {
		if (lef >= 54 && lef <= 104) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Кабинет химии'
			arrow_hint.style.color = '#d63a3a'
		}
		else if (lef >= 107 && lef <= 140) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Мусор'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 305) {
		if (lef >= 2 && lef <= 30) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Женский туалет'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 207) {
		if (!INVENT[0].isOnInventory && !INVENT[0].isUsed && candles >= 1) {
			document.getElementById('item0').style.zIndex = 3
		}
		else {
			document.getElementById('item0').style.zIndex = -10
		}

		if (lef >= 58 && lef <= 82) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Свечи'
			arrow_hint.style.color = '#d63a3a'
		}
		else if (lef >= 102 && lef <= 122 && !INVENT[0].isOnInventory && !INVENT[0].isUsed && candles >= 1) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Какой-то ключ...'
			arrow_hint.style.color = '#3ad6c9'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 208) {
		document.getElementById('item0').style.zIndex = -10
		if (lef >= 102.5 && lef <= 150) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Мужской туалет'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 307) {
		if (lef >= 44 && lef <= 102) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Скамейка'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 308) {
		if (lef >= 94 && lef <= 148.5) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Дверь на лестницу'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 310) {
		if (lef >= 72.5 && lef <= 102.5 && monster_on_toilet_voice) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Надпись на стене'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 311) {
		if (lef >= 88.5 && lef <= 132.5) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Лестница'
			arrow_hint.style.color = '#d63a3a'
		}
		else if (lef >= 2 && lef <= 40) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Мужской туалет'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 203) {
		if (lef >= 27 && lef <= 62) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Окно на улицу'
			arrow_hint.style.color = '#d63a3a'
		}
		
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 306) {
		if (lef >= 38 && lef <= 82) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Лестница'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 110) {
		if (lef >= 74 && lef <= 120) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Лестница'
			arrow_hint.style.color = '#d63a3a'
		}
		else if (lef >= 2 && lef <= 24) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Туалет'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 111) {
		if (lef >= 94 && lef <= 139) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Кабинет информатики'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 109) {
		if (lef >= 12 && lef <= 81) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Старое пианино'
			arrow_hint.style.color = '#d63a3a'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 309) {
		if (lef >= 118 && lef <= 150) {
			arrow_hint.style.display = 'block'
			arrow_hint.innerHTML = 'Женский туалет'
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
		if ((bg_number > 197 && bg_number < 250) || (bg_number > 303 && bg_number <= 350) || (bg_number > 109 && bg_number <= 150)) {
			--bg_number
			if (monster_on_toilet_voice && bg_number === 310) {
				changeBG('310-help')
	
			}
			else if (candles > 0 && bg_number === 207) {
				if (candles === 1) {
					changeBG('207-1')
				}
				else if (candles === 2) {
					changeBG('207-2')
				}
				else if (candles === 3) {
					changeBG('207-3')
				}
			}
			else {
				changeBG(bg_number)
			}
			lef = 148.5
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		} else {
			lef = 2
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		}
	}
	else if (lef >= 150) {
		if ((bg_number < 208 && bg_number > 150) || (bg_number < 312 && bg_number > 260) || (bg_number < 111 && bg_number >= 50)) {
			++bg_number
			if (monster_on_toilet_voice && bg_number === 310) {
				changeBG('310-help')	
			}
			else if (candles > 0 && bg_number === 207) {
				if (candles === 1) {
					changeBG('207-1')
				} 
				else if (candles === 2) {
					changeBG('207-2')
				}
				else if (candles === 3) {
					changeBG('207-3')
				}
			}
			else {
				changeBG(bg_number)
			}
			lef = 2
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		} else {
			lef = 148.5
			document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		}
	}
	
    requestAnimationFrame(movegg)
}
let slotnow = 1
let right_pressedTF = false
let left_pressedTF = false
document.addEventListener('keydown', (event) => {
    if (!isGameStop) {
		if (event.key === MoveLeftKey && !isArrowLeftPressed) {
			if (ng_2024 || ngHat) {
				changeGG('left-ng')
			}
			else {
				changeGG('left')
			}
			isArrowLeftPressed = true
			isArrowRightPressed = false
		} else if (event.key === MoveRightKey && !isArrowRightPressed) {
			if (ng_2024 || ngHat) {
				changeGG('right-ng')
			}
			else {
				changeGG('right')
			}
			isArrowRightPressed = true
			isArrowLeftPressed = false
		}
	}
	else if (isGameStop) {
		if (event.key === MoveLeftKey) {
			if (inventoryOn) {
				let len = ITEMS_ON_INVENT.length
				--slotnow
				if (slotnow < 1) {
					slotnow = len
				}
				if (slotnow === 1) {slot1Click()}
				if (slotnow === 2) {slot2Click()}
				if (slotnow === 3) {slot3Click()}
				if (slotnow === 4) {slot4Click()}
				if (slotnow === 5) {slot5Click()}
				if (slotnow === 6) {slot6Click()}
				if (slotnow === 7) {slot7Click()}
			}
		} else if (event.key === MoveRightKey) {
			if (inventoryOn) {
				let len = ITEMS_ON_INVENT.length
				++slotnow
				if (slotnow > len) {
					slotnow = 1
				}
				if (slotnow === 1) {slot1Click()}
				if (slotnow === 2) {slot2Click()}
				if (slotnow === 3) {slot3Click()}
				if (slotnow === 4) {slot4Click()}
				if (slotnow === 5) {slot5Click()}
				if (slotnow === 6) {slot6Click()}
				if (slotnow === 7) {slot7Click()}
			}
		}
	}
})

document.addEventListener('keyup', (event) => {
    if (!isGameStop) {
		if (event.key === MoveLeftKey) {
			isArrowLeftPressed = false
		} else if (event.key === MoveRightKey) {
			isArrowRightPressed = false
		}
	}
})
requestAnimationFrame(movegg)


let floorNow
let isFloorChoosing = false
let isFloorChoosing1 = false

function openFloorMenu(a) {
	document.getElementById('text').style.opacity = 0
		setTimeout(function() {
			document.getElementById('text').style.display = 'none'
		}, 300)
	isArrowLeftPressed = false
	isArrowRightPressed = false
    document.getElementById('choose-floor').style.display = 'block'
    document.getElementById('choose-floor').style.opacity = 100
    document.getElementById('choose-floor').style.zIndex = 210
    isGameStop = true
	isFloorChoosing = true

    floorNow = a
    updateActiveFloor()

    document.addEventListener('keydown', handleKeyDown)
}

function closeFloorMenu() {
    document.getElementById('choose-floor').style.display = 'none'
    document.getElementById('choose-floor').style.opacity = 0
    document.getElementById('choose-floor').style.zIndex = -210
	isFloorChoosing = false

    document.removeEventListener('keydown', handleKeyDown)
}

function openFloorMenu1(a) {
	isFloorChoosing1 = true
	document.getElementById('text').style.opacity = 0
		setTimeout(function() {
			document.getElementById('text').style.display = 'none'
		}, 300)
	isArrowLeftPressed = false
	isArrowRightPressed = false
    document.getElementById('choose-floor').style.display = 'block'
    document.getElementById('choose-floor').style.opacity = 100
    document.getElementById('choose-floor').style.zIndex = 210
    isGameStop = true

    floorNow = a
    updateActiveFloor()

    document.addEventListener('keydown', handleKeyDown2)
}

function closeFloorMenu1() {
    isGameStop = false
	isFloorChoosing1 = false
    document.getElementById('choose-floor').style.display = 'none'
    document.getElementById('choose-floor').style.opacity = 0
    document.getElementById('choose-floor').style.zIndex = -210

    // Удаление обработчика событий
    document.removeEventListener('keydown', handleKeyDown2)
}

function handleKeyDown(event) {
    if (isGameStop && isFloorChoosing) {
        if (event.key === UpKey) {
            if (floorNow === 3) {
                floorNow = 1
            } else if (floorNow === 2) {
                floorNow = 3
            } else if (floorNow === 1) {
                floorNow = 2
            }
            updateActiveFloor()
        } else if (event.key === DownKey) {
            if (floorNow === 2) {
                floorNow = 1
            } else if (floorNow === 1) {
                floorNow = 3
            } else if (floorNow === 3) {
                floorNow = 2
            }
            updateActiveFloor()
        } else if (event.key === 'Enter') {
            if (floorNow === 3) {
				if (ReallyFloorNow != 3) {
					pauseGame()
					blackScreen.style.zIndex = 1000
					blackScreen.style.opacity = 100
					AUDIO.steps.play()
					setTimeout(() => {
						lef = 62
						document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
						bg_number = 306
						changeBG('306')
						ReallyFloorNow = 3
						setTimeout(() => {
							blackScreen.style.opacity = 0
							setTimeout(() => {
								blackScreen.style.zIndex = 1
								isGameStop = false
							}, 1000)
						}, 2500)
					}, 1000)
				}
				else {
					isGameStop = false
				}
			}
			else if (floorNow === 2) {
				if (ReallyFloorNow != 2) {
					pauseGame()
					blackScreen.style.zIndex = 1000
					blackScreen.style.opacity = 100
					AUDIO.steps.play()
					setTimeout(() => {
						ReallyFloorNow = 2
						lef = 126
						document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
						bg_number = 206
						changeBG('206')
						setTimeout(() => {
							blackScreen.style.opacity = 0
							setTimeout(() => {
								blackScreen.style.zIndex = 1
								isGameStop = false
							}, 1000)
						}, 2500)
					}, 1000)
				}
				else {
					isGameStop = false
				}
			}
			else if (floorNow === 1) {
				isGameStop = false
				npcTalk('Блин! Дверь на первый этаж закрыта!', 3000)
			}
            closeFloorMenu()
        }
    }
}

function handleKeyDown2(event) {
    if (isGameStop && isFloorChoosing1) {
        if (event.key === UpKey) {
            if (floorNow === 3) {
                floorNow = 1
            } else if (floorNow === 2) {
                floorNow = 3
            } else if (floorNow === 1) {
                floorNow = 2
            }
            updateActiveFloor()
        } else if (event.key === DownKey) {
            if (floorNow === 2) {
                floorNow = 1
            } else if (floorNow === 1) {
                floorNow = 3
            } else if (floorNow === 3) {
                floorNow = 2
            }
            updateActiveFloor()
        } else if (event.key === 'Enter') {

			if (floorNow === 3) {
				if (ReallyFloorNow != 3) {
					pauseGame()
					blackScreen.style.zIndex = 1000
					blackScreen.style.opacity = 100
					AUDIO.steps.play()
					setTimeout(() => {
						lef = 112
						document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
						bg_number = 311
						changeBG('311')
						ReallyFloorNow = 3
						setTimeout(() => {
							blackScreen.style.opacity = 0
							setTimeout(() => {
								blackScreen.style.zIndex = 1
								isGameStop = false
							}, 1000)
						}, 2500)
					}, 1000)
				}
				else {
					isGameStop = false
				}
			}
			else if (floorNow === 2) {
				if (ReallyFloorNow != 2) {
					pauseGame()
					blackScreen.style.zIndex = 1000
					blackScreen.style.opacity = 100
					AUDIO.steps.play()
					setTimeout(() => {
						ReallyFloorNow = 2
						lef = 26
						document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
						bg_number = 199
						changeBG('199')
						setTimeout(() => {
							blackScreen.style.opacity = 0
							setTimeout(() => {
								blackScreen.style.zIndex = 1
								isGameStop = false
							}, 1000)
						}, 2500)
					}, 1000)
				}
				else {
					isGameStop = false
				}
			}
			else if (floorNow === 1) {
				if (ReallyFloorNow != 1) {
					pauseGame()
					blackScreen.style.zIndex = 1000
					blackScreen.style.opacity = 100
					AUDIO.steps.play()
					setTimeout(() => {
						ReallyFloorNow = 1
						lef = 98
						document.getElementById('gg').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
						bg_number = 110
						changeBG('110')
						setTimeout(() => {
							blackScreen.style.opacity = 0
							setTimeout(() => {
								blackScreen.style.zIndex = 1
								isGameStop = false
							}, 1000)
						}, 2500)
					}, 1000)
				}
				else {
					isGameStop = false
				}
			}
            closeFloorMenu1()
        }
    }
}

function updateActiveFloor() {
    document.getElementById('floor1').classList.remove('floor-active')
    document.getElementById('floor2').classList.remove('floor-active')
    document.getElementById('floor3').classList.remove('floor-active')

    if (floorNow === 1) {
        document.getElementById('floor1').classList.add('floor-active')
    } else if (floorNow === 2) {
        document.getElementById('floor2').classList.add('floor-active')
    } else if (floorNow === 3) {
        document.getElementById('floor3').classList.add('floor-active')
    }
}


let monster_on_toilet_voice = false
let toilet_check = false
let isSkafOpened = false
let dsn = true
document.addEventListener('keydown', function(event) {
    if (!isGameStop) {
		if (event.key === InteractKey) {

			if (bg_number === 204) {
				if (lef >= 64 && lef <= 96) {
					npcTalk('Красивое дерево...')
				}
			}
			else if (bg_number === 205) {
				if (lef >= 91.5 && lef <= 155) {
					if (INVENT[0].isOnInventory) {
						npcTalk('Этот ключ не подходит...')
					
					}
					else {
						npcTalk('Не открывается!')
					}
				}
			}
			
			else if (bg_number === 206) {
				if (lef >= 100 && lef <= 155) {
					openFloorMenu(2)
				}
			}

			else if (bg_number === 207) {
				if (lef >= 58 && lef <= 82) {
					if (candles === 1) {
						secretPassCount = 2
						npcTalk('Стой... Эта свеча разве горела? А на стене появилась еще одна цифра, <br> надо записать', 4000)
						secretNumber1.textContent = '0'
						secretNumber2.textContent = '4'
					}
					else if (candles === 2) {
						secretPassCount = 3
						npcTalk('Что за бред?! Горела же всего одна свеча!')
						secretNumber1.textContent = '0'
						secretNumber2.textContent = '4'
						secretNumber3.textContent = '0'
					}
					else if (candles === 3) {
						secretPassCount = 4
						npcTalk('Да что здесь вообще происходит...')
						secretNumber1.textContent = '0'
						secretNumber2.textContent = '4'
						secretNumber3.textContent = '0'
						secretNumber4.textContent = '5'
					}
					else {
						secretPassCount = 1
						secretNumber1.textContent = '0'
						npcTalk('Свечи? Откуда они здесь... Еще и эта цифра на стене... <br> Запишу ее на всякий случай...')
					}
				}
				else if (lef >= 102 && lef <= 122 && !INVENT[0].isOnInventory && !INVENT[0].isUsed && candles >= 1) {
					AUDIO.take_key.currentTime = 0
					AUDIO.take_key.play()
					npcTalk('Что?! Откуда здесь ключ? Надеюсь, он поможет мне выбраться...', 3000)
					document.getElementById('item0').style.zIndex = -10
					INVENT[0].isOnInventory = true
					ITEMS_ON_INVENT.push({
						id: 0,
					})
				}
			}


			else if (bg_number === 208) {
				if (lef >= 102.5 && lef <= 150) {
					if (toilet_check) {
						npcTalk('Я уже всё там обыскал')
					}
					else {
						pauseGame()
						blackScreen.style.zIndex = 1000
						blackScreen.style.opacity = 100
						
						setTimeout(() => {
							AUDIO.toilet.play()
							toilet_check = true

							setTimeout(() => {
								setTimeout(() => {
									AUDIO.toilet.pause()
									AUDIO.toilet.currentTime = 0

									INVENT[2].isOnInventory = true
									ITEMS_ON_INVENT.push({
										id: 2,
									})

								}, 100)
								setTimeout(() => {
									blackScreen.style.opacity = 0
									setTimeout(() => {
										blackScreen.style.zIndex = 1
										npcTalk('О! деревянная палка! Возьму с собой!', 3000)
										setTimeout(() => {
											isGameStop = false
										}, 200)
									}, 1000)
								}, 200)
							}, 4000)
						}, 1000)
					}
				}
			}

			else if (bg_number === 307) {
				if (lef >= 44 && lef <= 102) {
					npcTalk('Сейчас не лучшее время для отдыха...')
				}
			}

			else if (bg_number === 308) {
				if (lef >= 94 && lef <= 148.5) {
					npcTalk('Заперто...')
				}
			}

			else if (bg_number === 310) {
				if (lef >= 72.5 && lef <= 102.5 && monster_on_toilet_voice) {
					npcTalk('HELP? Этой надписи здесь точно не было...')
				}
			}

			else if (bg_number === 311) {
				if (lef >= 88.5 && lef <= 132.5) {
					openFloorMenu1(3)
				}
				else if (lef >= 2 && lef <= 40) {
					if (!monster_on_toilet_voice && !ng_2024) {
						pauseGame()
						blackScreen.style.zIndex = 1000
						blackScreen.style.opacity = 100
						
						setTimeout(() => {
							AUDIO.mainMenu.play()
							AUDIO.mainMenu.loop = true
							AUDIO.mainMenu.autoplay = true
							fadeOutAudio(AUDIO.game_bg, 3)
							setTimeout(() => {
								AUDIO.game_bg.currentTime = 0
							}, 3000)
							monster_on_toilet_voice = true
							++candles
							AUDIO.monster.play()

							setTimeout(() => {
								blackScreen.style.opacity = 0
								setTimeout(() => {
									blackScreen.style.zIndex = 1
									setTimeout(() => {
										npcTalk('Вот блин! Надо скорее валить отсюда!')
										isGameStop = false
									}, 30)
								}, 1000)
							}, 4000)
						}, 1000)
					}
					else if (!monster_on_toilet_voice && ng_2024) {
						npcTalk('Нее, я туда не хочу... Я ХОЧУ ПРАЗДНОВАТЬ')
					}
					else {
						npcTalk('Ну уж нет! Без оружия я туда не пойду!')
					}
				}
			}
	
			else if (bg_number === 202) {
				if (lef >= 56 && lef <= 98) {
					if (INVENT[0].isOnInventory) {
						INVENT[0].isOnInventory = false
						INVENT[0].isUsed = true
						isSkafOpened = true
						document.getElementById('item0').style.display = 'none'
						let indexToRemove = ITEMS_ON_INVENT.findIndex(item => item.id === 0)
						ITEMS_ON_INVENT.splice(indexToRemove, 1)

						pauseGame()
						blackScreen.style.zIndex = 1000
						blackScreen.style.opacity = 100
						
						setTimeout(() => {
							AUDIO.skaf_open.play()
							setTimeout(() => {
								blackScreen.style.opacity = 0
								npcTalk('Отлично! ключ подошел!', 3000)
								setTimeout(() => {
									blackScreen.style.zIndex = 1
									setTimeout(() => {
										isGameStop = false
									}, 100)
								}, 1000)
							}, 4000)
						}, 1000)
					}

					else if (isSkafOpened) {
						openMiniGame1()
					} 
					
					else {
						npcTalk('Шкаф закрыт... Нужен ключ!')
					}
				}
			}
	
			else if (bg_number === 203) {
				if (lef >= 27 && lef <= 62) {
					npcTalk('Уже так темно...')
				}
			}

			else if (bg_number === 199) {
				if (lef >= 4 && lef <= 54) {
					openFloorMenu1(2)
				}
				else if (lef >= 124 && lef <= 150) {
					npcTalk('Нэт, я не пойду в женский туалет!')
				}
			}

			else if (bg_number === 110) {
				if (lef >= 74 && lef <= 120) {
					openFloorMenu1(1)
				}
				else if (lef >= 2 && lef <= 24) {
					npcTalk('coming soon')
				}
			}

			else if (bg_number === 109) {
				if (lef >= 12 && lef <= 81) {
					AUDIO.piano.currentTime = 0
					AUDIO.piano.play()
				}
			}

			else if (bg_number === 111) {
				if (lef >= 94 && lef <= 139) {
					if (!isInfoOpened) {
						if (secretPassCount === 0) {
							npcTalk(`Нужен пароль из 4 цифр... Ну и где мне его взять?`, 4000)
						}
						else if (secretPassCount >= 1 && secretPassCount <= 3) {
							npcTalk(`Пароль... Я вроде бы находил какие-то цифры, но их всего ${secretPassCount}`, 4000)
						}
						else if (secretPassCount === 4) {
							npcTalk(`Хм... Пароль из 4 цифр? Я вроде как находил что-то подобное... Как там, ${randomPassword}?`, 4000)
							pauseGame()
							setTimeout(() => {
								blackScreen.style.zIndex = 1000
								blackScreen.style.opacity = 100
								setTimeout(() => {
									setTimeout(() => {
										blackScreen.style.opacity = 0
										npcTalk('Отлично! Пароль подошел!', 4000)
										isInfoOpened = true
										isConsoleUnlocked = true
										localStorage.setItem('isConsoleUnlocked', true)
										setTimeout(() => {
											blackScreen.style.zIndex = 1
											isGameStop = false
										}, 1000)
									}, 2500)
								}, 1000)
							}, 3000)
						}
					}
					else {
						npcTalk('зашел')
						if (!isConsoleUnlocked) {
							isConsoleUnlocked = true
							localStorage.setItem('isConsoleUnlocked', true)
						}
					}
				}
			}

			else if (bg_number === 306) {
				if (lef >= 38 && lef <= 82) {
					openFloorMenu(3)
				}
			}

			else if (bg_number === 304) {
				if (lef >= 54 && lef <= 104) {
					npcTalk('И тут заперто...')
				}
				else if (lef >= 107 && lef <= 140) {
					npcTalk('Я не буду рыться в мусоре!')
				}
			}
			else if (bg_number === 305) {
				if (lef >= 2 && lef <= 30) {
					npcTalk('Я промолчу...')
				}
			}

			else if (bg_number === 309) {
				if (lef >= 118 && lef <= 150) {
					npcTalk('Ну уж нет... Туда я не пойду!')
				}
			}

			else if (bg_number === 198) {
				if (lef >= 46 && lef <= 67) {
					npcTalk('Как всегда заперто на ключ...')
				}
			}

			else if (bg_number === 197) {
				if (lef >= 2 && lef <= 150) {
					let isPingOnInvent = INVENT[5].isOnInventory
					let isPingUsed = INVENT[5].isUsed
					
					if (isPingOnInvent && !isPingUsed) {
						removeInventItem(5)
						mg2_Start()
					}
					else {
						npcTalk('Сейчас бы с Петровичем поиграть...')
					}
				}
			}
		}
	}
	else if (isAnyActivityOpen && event.key === InteractKey) {
		CloseMiniGame1()
	}
})

document.addEventListener('visibilitychange', function() {
	if (document.visibilityState === 'hidden') {
		isArrowRightPressed = false
		isArrowLeftPressed = false
	}
})




// MINI-GAMES

let miniGame1On = false
function openMiniGame1() {
	if (!mg1_win) {
		mg1_restart()
		document.querySelector('#mini-game1').style.zIndex = 850
		document.querySelector('#mini-game1').style.opacity = 100
		miniGame1On = true
		pauseGame()
		isAnyActivityOpen = true
		mg1_input.focus()
	}
	else {
		npcTalk('Я уже взял отсюда всё, что хотел')
	}
}

function CloseMiniGame1() {
	document.querySelector('#mini-game1').style.opacity = 0
	setTimeout(function() {
		document.querySelector('#mini-game1').style.zIndex = -10
	}, 200)
	miniGame1On = false
	isGameStop = false
	isAnyActivityOpen = false
	mg1_input.blur()
}

document.querySelector('#close_mini-game-1').addEventListener('click', CloseMiniGame1)


// settings
let settingsOn = false
var volume_val = localStorage.getItem('volume_value') || 80
	
document.getElementById('volume').value = volume_val
AUDIO.game_bg.volume = volume_val / 100
document.getElementById('volume-span').innerHTML = volume_val

function settingsView() {
	document.querySelector('.settingsView-box').style.zIndex = 850
	document.querySelector('.settingsView-box').style.opacity = 100
	settingsOn = true
	if (isConsoleUnlocked) {
		devConsoleInset.style.display = 'flex'
	}
}

document.getElementById('volume').addEventListener('input', () => {
	let volume_value = document.getElementById('volume').value
	AUDIO.game_bg.volume = volume_value / 100
	Object.values(AUDIO).forEach(audio => {
		audio.volume = volume_value / 100
	})
	document.getElementById('volume-span').innerHTML = volume_value

	muz_game()
})

document.getElementById('speed-vaule').addEventListener('input', () => {
	let speed_value = document.getElementById('speed-vaule').value
	speed = speed_value / 10
	document.getElementById('speed-span').innerHTML = speed_value * 10
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

document.addEventListener('keydown', function(event) {
	if (event.key === SettingsKey && !isKeyChoosing) {
		if (settingsOn) {
			volume_val = document.getElementById('volume').value
			localStorage.setItem('volume_value', volume_val)
			document.querySelector('.settingsView-box').style.opacity = 0
			setTimeout(function() {
				document.querySelector('.settingsView-box').style.zIndex = -10
			}, 200)
			settingsOn = false
		} else if (!settingsOn && !isGameStop && !inventoryOn) {
			settingsView()
		}
		if (isAnyActivityOpen) {
			CloseMiniGame1()
		}
    }
})




// inventory



let inventoryOn = false

document.addEventListener('keydown', function(event) {
    if (event.key === InventoryKey) {
		if (inventoryOn) {
			document.querySelector('.inventoryView-box').style.opacity = 0
			setTimeout(function() {
				document.querySelector('.inventoryView-box').style.zIndex = -10
			}, 200)
			inventoryOn = false
			isGameStop = false
		} else if (!inventoryOn && !isGameStop && !settingsOn) {
			inventoryView()
		}

		if (isAnyActivityOpen) {
			CloseMiniGame1()
		}
    }
})

let i_count = 1

function itemBorderColor(i) {
	document.getElementById('slot1').style.borderColor = '#000'
	document.getElementById('slot2').style.borderColor = '#000'
	document.getElementById('slot3').style.borderColor = '#000'
	document.getElementById('slot4').style.borderColor = '#000'
	document.getElementById('slot5').style.borderColor = '#000'
	document.getElementById('slot6').style.borderColor = '#000'
	document.getElementById('slot7').style.borderColor = '#000'

	document.getElementById('slot1').style.backgroundColor = '#b4b4b44d'
	document.getElementById('slot2').style.backgroundColor = '#b4b4b44d'
	document.getElementById('slot3').style.backgroundColor = '#b4b4b44d'
	document.getElementById('slot4').style.backgroundColor = '#b4b4b44d'
	document.getElementById('slot5').style.backgroundColor = '#b4b4b44d'
	document.getElementById('slot6').style.backgroundColor = '#b4b4b44d'
	document.getElementById('slot7').style.backgroundColor = '#b4b4b44d'

	document.getElementById(`slot${i}`).style.borderColor = '#1fbd00'
	document.getElementById(`slot${i}`).style.backgroundColor = '#a1a1a186'
	
}

function slot1Click() {
	if (ITEMS_ON_INVENT.length >= 1) {
		let a = ITEMS_ON_INVENT[0].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		i_count = 1
		itemBorderColor(i_count)
		slotnow = 1
	}
}
function slot2Click() {
	if (ITEMS_ON_INVENT.length >= 2) {
		let a = ITEMS_ON_INVENT[1].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		i_count = 2
		itemBorderColor(i_count)
		slotnow = 2
	}
}
function slot3Click() {
	if (ITEMS_ON_INVENT.length >= 3) {
		let a = ITEMS_ON_INVENT[2].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		i_count = 3
		itemBorderColor(i_count)
		slotnow = 3
	}
}
function slot4Click() {
	if (ITEMS_ON_INVENT.length >= 4) {
		let a = ITEMS_ON_INVENT[3].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		i_count = 4
		itemBorderColor(i_count)
		slotnow = 4
	}
}
function slot5Click() {
	if (ITEMS_ON_INVENT.length >= 5) {
		let a = ITEMS_ON_INVENT[4].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		i_count = 5
		itemBorderColor(i_count)
		slotnow = 5
	}
}
function slot6Click() {
	if (ITEMS_ON_INVENT.length >= 6) {
		let a = ITEMS_ON_INVENT[5].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		i_count = 6
		itemBorderColor(i_count)
		slotnow = 6
	}
}
function slot7Click() {
	if (ITEMS_ON_INVENT.length >= 7) {
		let a = ITEMS_ON_INVENT[6].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		i_count = 7
		itemBorderColor(i_count)
		slotnow = 7
	}
}

document.getElementById('slot1').addEventListener('click', slot1Click)

document.getElementById('slot2').addEventListener('click', slot2Click)

document.getElementById('slot3').addEventListener('click', slot3Click)

document.getElementById('slot4').addEventListener('click', slot4Click)

document.getElementById('slot5').addEventListener('click', slot5Click)

document.getElementById('slot6').addEventListener('click', slot6Click)

document.getElementById('slot7').addEventListener('click', slot7Click)

function checkItemsCount() {
	if (ITEMS_ON_INVENT.length === 1) {
		let a = ITEMS_ON_INVENT[0].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'
		document.getElementById('slot1').style.borderColor = '#1fbd00'
		slotnow = 1


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
	} else if (ITEMS_ON_INVENT.length === 2) {
		let a = ITEMS_ON_INVENT[0].id
		let b = ITEMS_ON_INVENT[1].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'


		document.getElementById('slot2').style.background = `#b4b4b44d url('/images/item${b}.png')`
		document.getElementById('slot2').style.backgroundSize = 'cover'
		document.getElementById('slot2').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot2').style.backgroundPosition = 'center'

		document.getElementById('slot3').style.background = '#b4b4b44d'
		document.getElementById('slot4').style.background = '#b4b4b44d'
		document.getElementById('slot5').style.background = '#b4b4b44d'
		document.getElementById('slot6').style.background = '#b4b4b44d'
		document.getElementById('slot7').style.background = '#b4b4b44d'
	} else if (ITEMS_ON_INVENT.length === 3) {
		let a = ITEMS_ON_INVENT[0].id
		let b = ITEMS_ON_INVENT[1].id
		let c = ITEMS_ON_INVENT[2].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'


		document.getElementById('slot2').style.background = `#b4b4b44d url('/images/item${b}.png')`
		document.getElementById('slot2').style.backgroundSize = 'cover'
		document.getElementById('slot2').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot2').style.backgroundPosition = 'center'

		document.getElementById('slot3').style.background = `#b4b4b44d url('/images/item${c}.png')`
		document.getElementById('slot3').style.backgroundSize = 'cover'
		document.getElementById('slot3').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot3').style.backgroundPosition = 'center'

		document.getElementById('slot4').style.background = '#b4b4b44d'
		document.getElementById('slot5').style.background = '#b4b4b44d'
		document.getElementById('slot6').style.background = '#b4b4b44d'
		document.getElementById('slot7').style.background = '#b4b4b44d'
	} else if (ITEMS_ON_INVENT.length === 4) {
		let a = ITEMS_ON_INVENT[0].id
		let b = ITEMS_ON_INVENT[1].id
		let c = ITEMS_ON_INVENT[2].id
		let d = ITEMS_ON_INVENT[3].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'


		document.getElementById('slot2').style.background = `#b4b4b44d url('/images/item${b}.png')`
		document.getElementById('slot2').style.backgroundSize = 'cover'
		document.getElementById('slot2').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot2').style.backgroundPosition = 'center'

		document.getElementById('slot3').style.background = `#b4b4b44d url('/images/item${c}.png')`
		document.getElementById('slot3').style.backgroundSize = 'cover'
		document.getElementById('slot3').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot3').style.backgroundPosition = 'center'

		document.getElementById('slot4').style.background = `#b4b4b44d url('/images/item${d}.png')`
		document.getElementById('slot4').style.backgroundSize = 'cover'
		document.getElementById('slot4').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot4').style.backgroundPosition = 'center'

		document.getElementById('slot5').style.background = '#b4b4b44d'
		document.getElementById('slot6').style.background = '#b4b4b44d'
		document.getElementById('slot7').style.background = '#b4b4b44d'
	} else if (ITEMS_ON_INVENT.length === 5) {
		let a = ITEMS_ON_INVENT[0].id
		let b = ITEMS_ON_INVENT[1].id
		let c = ITEMS_ON_INVENT[2].id
		let d = ITEMS_ON_INVENT[3].id
		let e = ITEMS_ON_INVENT[4].id

		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'


		document.getElementById('slot2').style.background = `#b4b4b44d url('/images/item${b}.png')`
		document.getElementById('slot2').style.backgroundSize = 'cover'
		document.getElementById('slot2').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot2').style.backgroundPosition = 'center'

		document.getElementById('slot3').style.background = `#b4b4b44d url('/images/item${c}.png')`
		document.getElementById('slot3').style.backgroundSize = 'cover'
		document.getElementById('slot3').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot3').style.backgroundPosition = 'center'

		document.getElementById('slot4').style.background = `#b4b4b44d url('/images/item${d}.png')`
		document.getElementById('slot4').style.backgroundSize = 'cover'
		document.getElementById('slot4').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot4').style.backgroundPosition = 'center'

		document.getElementById('slot5').style.background = `#b4b4b44d url('/images/item${e}.png')`
		document.getElementById('slot5').style.backgroundSize = 'cover'
		document.getElementById('slot5').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot5').style.backgroundPosition = 'center'

		document.getElementById('slot6').style.background = '#b4b4b44d'
		document.getElementById('slot7').style.background = '#b4b4b44d'
	} else if (ITEMS_ON_INVENT.length === 6) {
		let a = ITEMS_ON_INVENT[0].id
		let b = ITEMS_ON_INVENT[1].id
		let c = ITEMS_ON_INVENT[2].id
		let d = ITEMS_ON_INVENT[3].id
		let e = ITEMS_ON_INVENT[4].id
		let f = ITEMS_ON_INVENT[5].id

		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'


		document.getElementById('slot2').style.background = `#b4b4b44d url('/images/item${b}.png')`
		document.getElementById('slot2').style.backgroundSize = 'cover'
		document.getElementById('slot2').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot2').style.backgroundPosition = 'center'

		document.getElementById('slot3').style.background = `#b4b4b44d url('/images/item${c}.png')`
		document.getElementById('slot3').style.backgroundSize = 'cover'
		document.getElementById('slot3').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot3').style.backgroundPosition = 'center'

		document.getElementById('slot4').style.background = `#b4b4b44d url('/images/item${d}.png')`
		document.getElementById('slot4').style.backgroundSize = 'cover'
		document.getElementById('slot4').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot4').style.backgroundPosition = 'center'

		document.getElementById('slot5').style.background = `#b4b4b44d url('/images/item${e}.png')`
		document.getElementById('slot5').style.backgroundSize = 'cover'
		document.getElementById('slot5').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot5').style.backgroundPosition = 'center'

		document.getElementById('slot6').style.background = `#b4b4b44d url('/images/item${f}.png')`
		document.getElementById('slot6').style.backgroundSize = 'cover'
		document.getElementById('slot6').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot6').style.backgroundPosition = 'center'

		document.getElementById('slot7').style.background = '#b4b4b44d'
	} else if (ITEMS_ON_INVENT.length === 7) {
		let a = ITEMS_ON_INVENT[0].id
		let b = ITEMS_ON_INVENT[1].id
		let c = ITEMS_ON_INVENT[2].id
		let d = ITEMS_ON_INVENT[3].id
		let e = ITEMS_ON_INVENT[4].id
		let f = ITEMS_ON_INVENT[5].id
		let g = ITEMS_ON_INVENT[6].id

		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
		document.getElementById('slot1').style.background = `#b4b4b44d url('/images/item${a}.png')`
		document.getElementById('slot1').style.backgroundSize = 'cover'
		document.getElementById('slot1').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot1').style.backgroundPosition = 'center'


		document.getElementById('slot2').style.background = `#b4b4b44d url('/images/item${b}.png')`
		document.getElementById('slot2').style.backgroundSize = 'cover'
		document.getElementById('slot2').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot2').style.backgroundPosition = 'center'

		document.getElementById('slot3').style.background = `#b4b4b44d url('/images/item${c}.png')`
		document.getElementById('slot3').style.backgroundSize = 'cover'
		document.getElementById('slot3').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot3').style.backgroundPosition = 'center'

		document.getElementById('slot4').style.background = `#b4b4b44d url('/images/item${d}.png')`
		document.getElementById('slot4').style.backgroundSize = 'cover'
		document.getElementById('slot4').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot4').style.backgroundPosition = 'center'

		document.getElementById('slot5').style.background = `#b4b4b44d url('/images/item${e}.png')`
		document.getElementById('slot5').style.backgroundSize = 'cover'
		document.getElementById('slot5').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot5').style.backgroundPosition = 'center'

		document.getElementById('slot6').style.background = `#b4b4b44d url('/images/item${f}.png')`
		document.getElementById('slot6').style.backgroundSize = 'cover'
		document.getElementById('slot6').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot6').style.backgroundPosition = 'center'

		document.getElementById('slot7').style.background = `#b4b4b44d url('/images/item${g}.png')`
		document.getElementById('slot7').style.backgroundSize = 'cover'
		document.getElementById('slot7').style.backgroundRepeat = 'no-repeat'
		document.getElementById('slot7').style.backgroundPosition = 'center'
	} else if (ITEMS_ON_INVENT.length === 0) {
		document.getElementById('descript_item-name').innerHTML = ''
		document.getElementById('descript_item-descript').innerHTML = ''

		document.getElementById('slot1').style.borderColor = '#000'
		document.getElementById('slot2').style.borderColor = '#000'
		document.getElementById('slot3').style.borderColor = '#000'
		document.getElementById('slot4').style.borderColor = '#000'
		document.getElementById('slot5').style.borderColor = '#000'
		document.getElementById('slot6').style.borderColor = '#000'
		document.getElementById('slot7').style.borderColor = '#000'

		document.getElementById('slot1').style.background = '#b4b4b44d'
		document.getElementById('slot2').style.background = '#b4b4b44d'
		document.getElementById('slot3').style.background = '#b4b4b44d'
		document.getElementById('slot4').style.background = '#b4b4b44d'
		document.getElementById('slot5').style.background = '#b4b4b44d'
		document.getElementById('slot6').style.background = '#b4b4b44d'
		document.getElementById('slot7').style.background = '#b4b4b44d'
	} else if (ITEMS_ON_INVENT.length >= 8) {
		let a = ITEMS_ON_INVENT[0].id
		INVENT[a].isOnInventory = false
		for (let i = ITEMS_ON_INVENT.length - 1; i >= 0; i--) {
			if (ITEMS_ON_INVENT[i].id === a) {
				ITEMS_ON_INVENT.splice(i, 1)
			}
		}
		checkItemsCount()
	}
}

document.addEventListener('keydown', function(event) {
	if (event.key === 'Enter' && inventoryOn) {
		if (ITEMS_ON_INVENT[slotnow - 1].id === 4) {
			let hatCount = 0
			INVENT[4].isOnInventory = false
			for (let i = ITEMS_ON_INVENT.length - 1; i >= 0; i--) {
				if (ITEMS_ON_INVENT[i].id === 4) {
					ITEMS_ON_INVENT.splice(i, 1)
					++hatCount
				}
			}
			if (slotnow > 1) {
				--slotnow
			}
			if (ITEMS_ON_INVENT.length > 0) {
				let a = ITEMS_ON_INVENT[slotnow - 1].id
				document.getElementById('descript_item-name').innerHTML = INVENT[a].name
				document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
			}
			
			changeGG('right-ng')
			document.querySelector('.inventoryView-box').style.opacity = 0
			setTimeout(function() {
				document.querySelector('.inventoryView-box').style.zIndex = -10
			}, 200)
			inventoryOn = false
			isGameStop = false
			ngHat = true
		}
	}	
})

function inventoryView() {
	document.querySelector('.inventoryView-box').style.zIndex = 849
	document.querySelector('.inventoryView-box').style.opacity = 100
	inventoryOn = true
	itemBorderColor(slotnow || 1)
	checkItemsCount()
	pauseGame()

	if (ITEMS_ON_INVENT.length > 0) {
		let a = ITEMS_ON_INVENT[slotnow - 1].id
		document.getElementById('descript_item-name').innerHTML = INVENT[a].name
		document.getElementById('descript_item-descript').innerHTML = INVENT[a].description
	}
	else {
		let a = undefined
	}
}

document.querySelector('#close_inventory').addEventListener('click', () => {
	document.querySelector('.inventoryView-box').style.opacity = 0
	setTimeout(function() {
		document.querySelector('.inventoryView-box').style.zIndex = -10
	}, 200)
	inventoryOn = false
	isGameStop = false
})

document.getElementById('settings-svg').addEventListener('click', () => {
	settingsView()
})

document.getElementById('inventory').addEventListener('click', () => {
	inventoryView()
})