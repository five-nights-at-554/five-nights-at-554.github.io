function startPiano() {
    fadeOutAudio(AUDIO.game_bg, 3)
    blackScreenFun(5000, function() {
        setTimeout(() => {
            AUDIO.piano.play()
        }, 1000)
        AUDIO.rain.play()
        AUDIO.rain.loop = true
        setTimeout(() => {
            let ggimg = document.getElementById('gg-img')
            lef = 116
            lefFun()
            ggimg.style.height = '60vh'
            gg.style.height = '60vh'
            AUDIO.vals.play()
            AUDIO.molnia.currentTime = 0
            AUDIO.molnia.play()
            changeBG(108)
            blackScreen.style.background = '#fff'
        }, 2000)
    })
}