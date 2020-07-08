input.onButtonPressed(Button.A, function () {
    if (speltoestand == SPEL_IS_GESTOPT) {
        led.stopAnimation()
        speltoestand = AFTELLEN_IS_GESTART
    } else if (speltoestand == SPEL_IS_GESTART) {
        speltoestand = SPEL_IS_GESTOPT
    } else if (speltoestand == SPELER_IS_GEFINISHT) {
        speltoestand = EINDTIJD_WORDT_GETOOND
    }
})
input.onPinPressed(TouchPin.P2, function () {
    if (speltoestand == SPEL_IS_GESTART) {
        speltoestand = SPELER_IS_GEFINISHT
    }
})
input.onButtonPressed(Button.B, function () {
    if (speltoestand != SPEL_IS_GESTOPT) {
        speltoestand = SPEL_IS_GESTOPT
    }
})
input.onPinPressed(TouchPin.P1, function () {
    if (speltoestand == SPEL_IS_GESTART) {
        music.playTone(165, music.beat(BeatFraction.Whole))
        music.playTone(139, music.beat(BeatFraction.Double))
    }
})
let muziek_is_gestart = false
let speeltijd = 0
let starttijd = 0
let speltoestand = 0
let SPEL_IS_GESTOPT = 0
let EINDTIJD_WORDT_GETOOND = 0
let SPELER_IS_GEFINISHT = 0
let SPEL_IS_GESTART = 0
let AFTELLEN_IS_GESTART = 0
AFTELLEN_IS_GESTART = 1
SPEL_IS_GESTART = 2
SPELER_IS_GEFINISHT = 3
EINDTIJD_WORDT_GETOOND = 4
SPEL_IS_GESTOPT = 5
speltoestand = SPEL_IS_GESTOPT
/**
 * Hoofdprogramma
 */
basic.forever(function () {
    if (speltoestand == AFTELLEN_IS_GESTART) {
        music.playMelody("C - C - C5 - - - ", 120)
        starttijd = input.runningTime()
        speltoestand = SPEL_IS_GESTART
    } else if (speltoestand == SPEL_IS_GESTART) {
        speeltijd = Math.trunc((input.runningTime() - starttijd) / 1000)
        if (speeltijd % 5 == 0) {
            basic.showNumber(speeltijd)
        }
    } else if (speltoestand == SPELER_IS_GEFINISHT) {
        if (!(muziek_is_gestart)) {
            music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Forever)
            muziek_is_gestart = true
        }
        basic.showIcon(IconNames.Happy)
    } else if (speltoestand == EINDTIJD_WORDT_GETOOND) {
        music.stopMelody(MelodyStopOptions.All)
        basic.showNumber(speeltijd)
    } else if (speltoestand == SPEL_IS_GESTOPT) {
        muziek_is_gestart = false
        starttijd = 0
        music.stopMelody(MelodyStopOptions.All)
        basic.showString("Druk A om te starten.")
    }
})
