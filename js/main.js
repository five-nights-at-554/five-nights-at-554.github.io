let contextMenuTF = false
let disc_check = localStorage.getItem('disc') || false
var audTF = false

document.addEventListener('visibilitychange', function() {
	if (audTF) {
		if (document.visibilityState === 'hidden') {
			AUDIO.mainMenu.pause()
		}
		else {
			AUDIO.mainMenu.play()
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
	mainMenu: createSound('/js/sounds/mainMenu.mp3')
}

function muz_first() {
	AUDIO.mainMenu.play()
	AUDIO.mainMenu.loop = true
	AUDIO.mainMenu.autoplay = true
}

function f11Message() {
	let message = document.getElementById('press-f11')
	setTimeout(function() {
		message.style.opacity = 0
	}, 1000)
	setTimeout(function() {
		message.style.display = 'none'
	}, 3000)
}

document.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		document.getElementById('disc_accept').click()
	}
})

function discClose() {
	let disc_pass_input = document.getElementById('disc-pass')
	disc_pass = disc_pass_input.value
	if (disc_pass === 'filipok226') {
		disc_pass_input.style.border = 'solid 0.1rem green'
		audTF = true
		f11Message()
		muz_first()
		document.getElementById('disclaimer').style.display = 'none'
		contextMenuTF = true
		localStorage.setItem('disc', true)
	}
	else {
		disc_pass_input.style.outline = 'solid 0.1rem #bd0707'
		disc_pass_input.value = ''
	}
}

if (disc_check) {
	document.getElementById('disc-pass').style.display = 'none'
	document.getElementById('disc_accept').addEventListener('click', () => {
		document.getElementById('disclaimer').style.display = 'none'
		audTF = true
		f11Message()
		muz_first()
		contextMenuTF = true
	})
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



	// settings
	var bgImg = localStorage.getItem('bgImg') || 1
	var volume_val = localStorage.getItem('volume_value') || 80

	function bgCheck() {
		if (bgImg === '1') {
			document.getElementById('default-bg').style.outline = 'solid 0.5vh #01b901'
			document.getElementById('ng-bg').style.outline = 'solid 0.4vh #000'
			document.getElementById('main-bg').src = 'images/main-menu-bg.png'
		}
	
		else if (bgImg === '2') {
			document.getElementById('ng-bg').style.outline = 'solid 0.5vh #01b901'
			document.getElementById('default-bg').style.outline = 'solid 0.4vh #000'
			document.getElementById('main-bg').src = 'images/main-menu-NG-bg.png'
		}
	}

	bgCheck()
	
	document.getElementById('volume').value = volume_val
	AUDIO.mainMenu.volume = volume_val / 100
	document.getElementById('volume-span').textContent = volume_val
	
	function settingsView() {
		document.querySelector('.settingsView-box').style.zIndex = 10
		document.querySelector('.settingsView-box').style.opacity = 100
	}
	
	document.getElementById('volume').addEventListener('input', () => {
		let volume_value = document.getElementById('volume').value
		AUDIO.mainMenu.volume = volume_value / 100
		document.getElementById('volume-span').textContent = volume_value
	})
	
	document.getElementById('default-bg').addEventListener('click', () => {
		bgImg = 1
		document.getElementById('default-bg').style.outline = 'solid 0.5vh #01b901'
		document.getElementById('ng-bg').style.outline = 'solid 0.4vh #000'
		document.getElementById('main-bg').src = 'images/main-menu-bg.png'
	})
	document.getElementById('ng-bg').addEventListener('click', () => {
		bgImg = 2
		document.getElementById('ng-bg').style.outline = 'solid 0.5vh #01b901'
		document.getElementById('default-bg').style.outline = 'solid 0.4vh #000'
		document.getElementById('main-bg').src = 'images/main-menu-NG-bg.png'
	})
	
	document.querySelector('#close_settings').addEventListener('click', () => {
		volume_val = document.getElementById('volume').value
		localStorage.setItem('volume_value', volume_val)
		localStorage.setItem('bgImg', bgImg)
		document.querySelector('.settingsView-box').style.opacity = 0
		setTimeout(function() {
			document.querySelector('.settingsView-box').style.zIndex = -10
		}, 200)
	})