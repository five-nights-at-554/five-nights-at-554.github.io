var set = localStorage.getItem('set')	
console.log(set)

if (typeof(set) === undefined) {
	localStorage.setItem('set', true)
}

console.log(set)

if (set) {
	localStorage.setItem('volume_value', 80)
	localStorage.setItem('bgImg', 1)
}
var bgImg = localStorage.getItem('bgImg')

if (bgImg === 1) {
	document.getElementById('default-bg').style.outline = 'solid 0.5vh #01b901'
	document.getElementById('ng-bg').style.outline = 'solid 0.4vh #000'
	document.getElementById('main-bg').src = 'images/main-menu-bg.png'
}
else if (bgImg === 2) {
	document.getElementById('ng-bg').style.outline = 'solid 0.5vh #01b901'
	document.getElementById('default-bg').style.outline = 'solid 0.4vh #000'
	document.getElementById('main-bg').src = 'images/main-menu-NG-bg.png'
}

var volume_val = localStorage.getItem('volume_value')
console.log(volume_val)
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
	localStorage.setItem('set', false)
	// console.log(localStorage.getItem('volume_value'))
	// console.log(localStorage.getItem('bgImg'))
	// console.log(localStorage.getItem('set'))
	document.querySelector('.settingsView-box').style.opacity = 0
	setTimeout(function() {
		document.querySelector('.settingsView-box').style.zIndex = -10
	}, 200)
})