let monsterAlive = true
let monster_hp = 10 
let canHit = true
let isfiting = false

function lefFunBoss() {
	gg.style.left = `calc((100vw - 100vh * 16 / 9) / 2 + 2vh + ${lef}vh)`
	document.getElementById('weapon').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + ${lef}vh - 25vh)`
}

function startPiano() {
    isfiting = true
    fadeOutAudio(AUDIO.game_bg, 3)
    blackScreenFun(5000, function() {
        setTimeout(() => {
            AUDIO.piano.play()
        }, 1000)
        AUDIO.rain.play()
        AUDIO.rain.loop = true
        setTimeout(() => {
            let ggimg = document.querySelectorAll('.gg-img')
            ggimg.forEach(element => {
                element.style.height = '60vh'
                element.style.top = '25vh'
            })
            removeInventItem(13)
            lef = 116
            lefFunBoss()
            gg.style.height = '60vh'
            AUDIO.vals.play()
            AUDIO.vals.loop = true
            AUDIO.molnia.currentTime = 0
            AUDIO.molnia.play()
            changeBG(108)
            bg_number = 108
            blackScreen.style.background = '#fff'
            changeGG('left')
            document.getElementById('weapon').style.display = 'block'

            document.getElementById('monster1').style.zIndex = 4
            document.getElementById('monster1_hp').style.zIndex = 4
        }, 2000)
    })
}

document.addEventListener('keydown', (event) => {
    if ((canHit && monsterAlive && isfiting) && (event.key == InteractKey || event.key == " ")) {
        pauseGame()
        AUDIO.hit.currentTime = 0
        AUDIO.hit.play()
        canHit = false
        let weapon = document.getElementById('weapon')
        weapon.style.transition = 'left 0.5s'
	    document.getElementById('weapon').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + ${lef}vh - 35vh)`
        setTimeout(() => {
	        document.getElementById('weapon').style.left = `calc((100vw - 100vh * 16 / 9) / 2 + ${lef}vh - 25vh)`
            setTimeout(() => {
                weapon.style.transition = 'none'
                isGameStop = false
            }, 500)
        }, 500)
        setTimeout(() => {
            canHit = true
        }, 2000)
        
        if (lef <= 90 && monster_hp > 0) {
            AUDIO.damage.currentTime = 0
            AUDIO.damage.play()
            document.getElementById(`mhp${monster_hp}`).style.display = 'none'
            --monster_hp
            if (monster_hp === 5) {
                blackScreenFun(2000, function() {
                    AUDIO.molnia.currentTime = 0
                    AUDIO.molnia.play()
                    lef = 116
                    lefFunBoss()
                })
            }
            if (monster_hp < 1) {
                let winScreen = document.getElementById('win-screen')
                document.getElementById('monster1').style.rotate = '90deg'
                document.getElementById('monster1').style.top = '45vh'
                document.getElementById('monster1').style.animation = 'none'
                
                fadeOutAudio(AUDIO.vals, 6)
                setTimeout(() => {
                    winScreen.style.opacity = 100
                    setTimeout(() => {
                        winScreen.style.zIndex = 99999
                    }, 3000)
                }, 2000)
            }
        }
        
    }
})