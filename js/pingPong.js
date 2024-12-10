function mg2_Start() {
	pauseGame()
	changeGG('left')
	function move_mg2_right() {
		if (lef < 146) {
			lef = lef + speed
			gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
			requestAnimationFrame(move_mg2_right)
		}
		else {
			changeGG('left')
			isGameStop = false
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
			isGameStop = false
		}
	}





	// blackScreen.style.zIndex = 1000
	// blackScreen.style.opacity = 100
	
	// setTimeout(() => {
	// 	setTimeout(() => {
	// 		setTimeout(() => {
	// 			AUDIO.toilet.pause()
	// 			AUDIO.toilet.currentTime = 0
	
	// 			INVENT[2].isOnInventory = true
	// 			ITEMS_ON_INVENT.push({
	// 				id: 2,
	// 			})
	
	// 		}, 100)
	// 		setTimeout(() => {
	// 			blackScreen.style.opacity = 0
	// 			setTimeout(() => {
	// 				blackScreen.style.zIndex = 1
	// 				npcTalk('О! деревянная палка! Возьму с собой!', 3000)
	// 				setTimeout(() => {
	// 					isGameStop = false
	// 				}, 200)
	// 			}, 1000)
	// 		}, 200)
	// 	}, 4000)
	// }, 1000)
	


	
	if (lef > 146) {
		changeGG('left')
		move_mg2_left()
	}
	else if (lef < 146) {
		changeGG('right')
		move_mg2_right()
	}
}
