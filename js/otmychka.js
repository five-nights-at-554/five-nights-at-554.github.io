function move_otmychka_right() {
	if (lef < 98) {
        changeGG('right')
		lef = lef + speed
		gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		requestAnimationFrame(move_otmychka_right)
	}
	else {
		changeGG('left')
        AUDIO.otmychka.play()
		setTimeout(() => {
            otmychkaAct()
		}, 4000)
	}
}
function move_otmychka_left() {
	if (lef > 98) {
		changeGG('left')
		lef = lef - speed
		gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
		requestAnimationFrame(move_otmychka_left)
	}
	else {
		changeGG('left')
        AUDIO.otmychka.play()
		setTimeout(() => {
            otmychkaAct()
		}, 4000)
	}
}

function otmychkaStart() {
    pauseGame()
    npcTalk('Попробую-ка взломать эту дверь отмычкой...')
    fadeOutAudio(AUDIO.game_bg, 2)
    setTimeout(() => {
        if (lef < 98) move_otmychka_right()
        else move_otmychka_left()
    }, 1000)
}

function otmychkaAct() {
    AUDIO.monster_steps.currentTime = 0
    AUDIO.monster_steps.play()
    AUDIO.otmychka.pause()

    changeGG('right')
    npcTalk('А?.. Что это за шаги?!')
    removeInventItem(12)
    setTimeout(() => {
        function anonymn1() {
            function move_left() {
                if (lef > 60) {
                    changeGG('left')
                    lef = lef - speed
                    gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
                    requestAnimationFrame(move_left)
                }
                else {
                    changeGG('right')
                    setTimeout(() => {
                        function move_left2() {
                            if (lef < 150) {
                                changeGG('right')
                                lef = lef + speed
                                gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
                                requestAnimationFrame(move_left2)
                            }
                            else {
                                setTimeout(() => {
                                    fadeOutAudio(AUDIO.monster_steps, 2)
                                    otmychkaAct2()
                                    setTimeout(() => {
                                        npcTalk('Фух... И что это было?!', 5000)
                                        AUDIO.monster_steps.currentTime = 0
                                        AUDIO.monster_steps.volume = volume_val / 100
                                    }, 2000)
                                }, 1000)
                            }
                        }
                        move_left2()
                    }, 1000)
                }
            }
            move_left()
        }
        anonymn1()
    }, 1000)
    function otmychkaAct2() {
        AUDIO.game_bg.play()
        AUDIO.game_bg.currentTime = 612
        AUDIO.game_bg.volume = volume_val / 100
    }
}