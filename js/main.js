contextMenuTF = true
let disc_check = sessionStorage.getItem('disc') || false

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
		f11Message()
		muz_first()
		document.getElementById('disclaimer').style.display = 'none'
		contextMenuTF = true
		sessionStorage.setItem('disc', true)
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

