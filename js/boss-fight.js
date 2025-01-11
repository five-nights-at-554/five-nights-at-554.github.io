let monsterAlive = true
let monster_hp = 10 
let canHit = true
let isfiting = false

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
            lef = 116
            removeInventItem(13)
            lefFun()
            gg.style.height = '60vh'
            AUDIO.vals.play()
            AUDIO.vals.loop = true
            AUDIO.molnia.currentTime = 0
            AUDIO.molnia.play()
            changeBG(108)
            bg_number = 108
            blackScreen.style.background = '#fff'
            changeGG('left')

            document.getElementById('monster1').style.zIndex = 4
        }, 2000)
    })
}

document.addEventListener('keydown', (event) => {
    if ((lef <= 76 && monsterAlive) && (event.key == InteractKey || event.key == " ")) {
        canHit = false
        setTimeout(() => {
            canHit = true
        }, 2);
        document.getElementById(`mhp${monster_hp}`)
        --monster_hp
        
    }
})