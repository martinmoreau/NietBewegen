// - Reset alle variabele
// 
// - Stop de finish muziek
// 
// - Toon de tekst “druk A om te spelen”
function Reset_het_spel () {
    muziek_is_gestart = false
    starttijd = 0
    music.stopMelody(MelodyStopOptions.All)
    basic.showString("Druk A om te spelen.")
}
// - Start de finish muziek als deze nog niet gestart is
// 
// - toon een smiley op het scherm.
function Start_finish_muziek () {
    if (!(muziek_is_gestart)) {
        music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Forever)
        muziek_is_gestart = true
    }
    basic.showIcon(IconNames.Happy)
}
// - Bereken de actuele speeltijd
// 
// - Laat om de 5 seconden de speeltijd zien op het scherm
function Toon_speeltijd () {
    speeltijd = Math.trunc((input.runningTime() - starttijd) / 1000)
    if (speeltijd % 5 == 0) {
        basic.showNumber(speeltijd)
    }
}
input.onButtonPressed(Button.A, function () {
    if (speltoestand == SPEL_IS_GESTOPT) {
        led.stopAnimation()
        speltoestand = STARTSIGNAAL_WORDT_AFGESPEELD
    } else if (speltoestand == SPELER_IS_GEFINISHT) {
        speltoestand = EINDTIJD_WORDT_GETOOND
    }
})
// - Speel het aftelgeluid af
// 
// - Onthoud de startijd om later de speltijd te berekenen
function Speel_startsignaal () {
    music.playMelody("C - C - C5 - - - ", 120)
    starttijd = input.runningTime()
    basic.showString("Go!")
    speltoestand = SPEL_IS_GESTART
}
// - Stop de finish muziek
// 
// - Toon de eindtijd op het scherm
function Toon_eindtijd () {
    music.stopMelody(MelodyStopOptions.All)
    basic.showString(" Tijd: " + speeltijd)
}
input.onPinPressed(TouchPin.P2, function () {
    if (speltoestand == SPEL_IS_GESTART) {
        speltoestand = SPELER_IS_GEFINISHT
    }
})
input.onButtonPressed(Button.AB, function () {
    led.stopAnimation()
    basic.showString("  Eline Kon heeft dit geprogrammeerd.  ")
})
input.onButtonPressed(Button.B, function () {
    led.stopAnimation()
    if (speltoestand != SPEL_IS_GESTOPT) {
        speltoestand = SPEL_IS_GESTOPT
    }
})
input.onPinPressed(TouchPin.P1, function () {
    if (speltoestand == STARTSIGNAAL_WORDT_AFGESPEELD || speltoestand == SPEL_IS_GESTART) {
        music.playTone(165, music.beat(BeatFraction.Whole))
        music.playTone(139, music.beat(BeatFraction.Double))
    }
})
let speeltijd = 0
let starttijd = 0
let muziek_is_gestart = false
let speltoestand = 0
let SPEL_IS_GESTOPT = 0
let EINDTIJD_WORDT_GETOOND = 0
let SPELER_IS_GEFINISHT = 0
let SPEL_IS_GESTART = 0
let STARTSIGNAAL_WORDT_AFGESPEELD = 0
STARTSIGNAAL_WORDT_AFGESPEELD = 1
SPEL_IS_GESTART = 2
SPELER_IS_GEFINISHT = 3
EINDTIJD_WORDT_GETOOND = 4
SPEL_IS_GESTOPT = 5
speltoestand = SPEL_IS_GESTOPT
// Hoofdprogramma
basic.forever(function () {
    if (speltoestand == STARTSIGNAAL_WORDT_AFGESPEELD) {
        Speel_startsignaal()
    } else if (speltoestand == SPEL_IS_GESTART) {
        Toon_speeltijd()
    } else if (speltoestand == SPELER_IS_GEFINISHT) {
        Start_finish_muziek()
    } else if (speltoestand == EINDTIJD_WORDT_GETOOND) {
        Toon_eindtijd()
    } else if (speltoestand == SPEL_IS_GESTOPT) {
        Reset_het_spel()
    }
})
basic.forever(function () {
    serial.writeLine("" + (speltoestand))
    basic.pause(10000)
})
