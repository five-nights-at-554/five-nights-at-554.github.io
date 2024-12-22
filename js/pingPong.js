function move_mg2_right() {
	if (lef < 146) {
		lef = lef + speed
		gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		requestAnimationFrame(move_mg2_right)
	}
	else {
		changeGG('left')
		setTimeout(() => {
			blackScreenFun(4000, function() {
				mg2_game()
			})
		}, 1000)
	}
}
function move_mg2_left() {
	if (lef > 146) {
		lef = lef - speed
		gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		requestAnimationFrame(move_mg2_left)
	}
	else {
		changeGG('left')
		setTimeout(() => {
			blackScreenFun(4000, function() {
				mg2_game()
			})
		}, 1000)
	}
}

function mg2_Start() {
	pauseGame()
	changeGG('left')

	AUDIO.monster_steps.play()
	fadeOutAudio(AUDIO.game_bg, 4)
	fadeOutAudio(AUDIO.mainMenu, 4)

	setTimeout(() => {
		npcTalk('Что это за шаги?!')
		setTimeout(() => {
			if (lef > 146) {
				changeGG('left')
				move_mg2_left()
			}
			else if (lef < 146) {
				changeGG('right')
				move_mg2_right()
			}
		}, 500)
	}, 1000)
}


function mg2_game() {
	
}

