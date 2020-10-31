// Auto-generated. Do not edit.



    //% color=50 weight=19 icon="\uf1eb"
    //% block="IrRemote"
declare namespace IrRemote {

    /**
     * button pushed.
     */
    //% blockId=onPressEvent
    //% block="on |%btn| button pressed" shim=IrRemote::onPressEvent
    function onPressEvent(btn: RemoteButton, body: () => void): void;

    /**
     * initialises local variablesssss
     */
    //% blockId=init
    //% block="connect ir receiver to %pin" shim=IrRemote::init
    function init(pin: Pins): void;
}

// Auto-generated. Do not edit. Really.
