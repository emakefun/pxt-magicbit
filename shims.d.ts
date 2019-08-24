// Auto-generated. Do not edit.



    //% color=50 weight=19 icon="\uf1eb"
    //% block="IrRemote"
declare namespace IrRemote {

    /**
     * button pushed.
     */
    //% blockId=ir_received_left_event
    //% block="on |%btn| button pressed" shim=IrRemote::onPressEvent
    function onPressEvent(btn: RemoteButton, body: () => void): void;

    /**
     * initialises local variablesssss
     */
    //% blockId=ir_init
    //% block="connect ir receiver to %pin" shim=IrRemote::init
    function init(pin: Pins): void;
}

// Auto-generated. Do not edit. Really.
