var audTF = true
let speed = 2

const BG = [

]

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
	

let lef = 3
let bg_number = 202

function movegg() {
	const arrow_hint = document.getElementById('arrow_hint')

	if (bg_number === 204) {
		if (lef >= 64 && lef <= 96) {
			// isArrowRightPressed = false
			// isArrowLeftPressed = false
			arrow_hint.style.display = 'block'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}
	else if (bg_number === 205) {
		if (lef >= 91.5 && lef <= 155) {
			// isArrowRightPressed = false
			// isArrowLeftPressed = false
			arrow_hint.style.display = 'block'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 202) {
		if (lef >= 56 && lef <= 98) {
			// isArrowRightPressed = false
			// isArrowLeftPressed = false
			arrow_hint.style.display = 'block'
		}
		else {
			arrow_hint.style.display = 'none'
		}
	}

	else if (bg_number === 203) {
		if (lef >= 27 && lef <= 62) {
			// isArrowRightPressed = false
			// isArrowLeftPressed = false
			arrow_hint.style.display = 'block'
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
		if (bg_number > 202) {
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
		if (bg_number < 205) {
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

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && !isArrowLeftPressed) {
		document.getElementById('gg-img').src = 'images/fil-left.png'
        isArrowLeftPressed = true
    } else if (event.key === 'ArrowRight' && !isArrowRightPressed) {
		document.getElementById('gg-img').src = 'images/fil-right.png'
        isArrowRightPressed = true
    }
})

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        isArrowLeftPressed = false
    } else if (event.key === 'ArrowRight') {
        isArrowRightPressed = false
    }
	
})
requestAnimationFrame(movegg)

let dsn = true
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        console.log('Нажата стрелочка вверх')
		if (bg_number === 204) {
			if (lef >= 64 && lef <= 96) {
				// isArrowRightPressed = false
				// isArrowLeftPressed = false

				if (dsn) {	
					document.getElementById('npc-talk').textContent = 'Красивое дерево...'
					document.getElementById('text').style.display = 'block'
					document.getElementById('text').style.opacity = 100
					dsn = false
					setTimeout(function() {
						document.getElementById('text').style.opacity = 0
					}, 1500)
					setTimeout(function() {
						document.getElementById('text').style.display = 'none'
						dsn = true
					}, 1800)
				}
			}
		}
		else if (bg_number === 205) {
			if (lef >= 91.5 && lef <= 155) {
				// isArrowRightPressed = false
				// isArrowLeftPressed = false

				if (dsn) {	
					document.getElementById('npc-talk').textContent = 'Блин! Нужен ключ!'
					document.getElementById('text').style.display = 'block'
					document.getElementById('text').style.opacity = 100
					dsn = false
					setTimeout(function() {
						document.getElementById('text').style.opacity = 0
					}, 1500)
					setTimeout(function() {
						document.getElementById('text').style.display = 'none'
						dsn = true
					}, 1800)
				}
			}
		}

		else if (bg_number === 202) {
			if (lef >= 56 && lef <= 98) {
				// isArrowRightPressed = false
				// isArrowLeftPressed = false

				if (dsn) {	
					document.getElementById('npc-talk').textContent = 'Этот шкаф закрыт!'
					document.getElementById('text').style.display = 'block'
					document.getElementById('text').style.opacity = 100
					dsn = false
					setTimeout(function() {
						document.getElementById('text').style.opacity = 0
					}, 1500)
					setTimeout(function() {
						document.getElementById('text').style.display = 'none'
						dsn = true
					}, 1800)
				}
			}
		}

		else if (bg_number === 203) {
			if (lef >= 27 && lef <= 62) {
				// isArrowRightPressed = false
				// isArrowLeftPressed = false

				if (dsn) {	
					document.getElementById('npc-talk').textContent = 'Уже так темно...'
					document.getElementById('text').style.display = 'block'
					document.getElementById('text').style.opacity = 100
					dsn = false
					setTimeout(function() {
						document.getElementById('text').style.opacity = 0
					}, 1500)
					setTimeout(function() {
						document.getElementById('text').style.display = 'none'
						dsn = true
					}, 1800)
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

