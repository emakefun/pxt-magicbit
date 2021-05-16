/*
ken@emakefun.com
modified from pxt-servo/servodriver.ts
load dependency
"magicbit": "file:../pxt-magicbit"
*/

enum Offset {
    //% block=one
    ONE = 0,
    //% block=two
    TWO = 1,
    //% block=three
    THREE = 2,
    //% block=four
    FOUR = 3
}


// enum  IrPins{

//     P0=  3,
//     P1=  2,
//     P2=  1,
//     P3=  4,
//     P4=  5,
//     P5=  17,
//     P6=  12,
//     P7=  11,
//     P8=  18,
//     P9=  10,
//     P10= 6,
//     P11= 26,
//     P12= 20,
//     P13= 23,
//     P14= 22,
//     P15= 21,
//     P16= 16,
//     P19= 0,
//     P20= 30
//   };

enum RemoteButton {
    //% block=A
    A = 0x45,
    //% block=B
    B = 0x46,
    //% block=C
    C = 0x47,
    //% block=D
    D = 0x44,
    //% block=UP
    UP = 0x40,
    //% block=+
    Add = 0x43,
    //% block=LEFT
    Left = 0x07,
    //% block=OK
    Ok = 0x15,
    //% block=RIGHT
    Right = 0x09,
    //% block=DOWN
    Down = 0x19,
    //% block=-
    EQ = 0x0d,
    //% block=0
    NUM0 = 0x16,
    //% block=1
    NUM1 = 0x0c,
    //% block=2
    NUM2 = 0x18,
    //% block=3
    NUM3 = 0x5e,
    //% block=4
    NUM4 = 0x8,
    //% block=5
    NUM5 = 0x1c,
    //% block=6
    NUM6 = 0x5a,
    //% block=7
    NUM7 = 0x42,
    //% block=8
    NUM8 = 0x52,
    //% block=9
    NUM9 = 0x4A
};


//% color="#EE6A50" weight=10 icon="\uf013"
namespace magicbit {
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09
    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const STP_CHA_L = 2047
    const STP_CHA_H = 4095

    const STP_CHB_L = 1
    const STP_CHB_H = 2047

    const STP_CHC_L = 1023
    const STP_CHC_H = 3071

    const STP_CHD_L = 3071
    const STP_CHD_H = 1023

    export enum Servos {
        S1 = 0x01,
        S2 = 0x02,
        S3 = 0x03,
        S4 = 0x04,
        S5 = 0x05,
        S6 = 0x06,
        S7 = 0x07,
        S8 = 0x08
    }

    export enum Motors {
        M1 = 0x3,
        M2 = 0x4,
        M3 = 0x1,
        M4 = 0x2
    }

    export enum Steppers {
        STPM1 = 0x2,
        STPM2 = 0x1
    }

    export enum SonarVersion {
        V1 = 0x1,
        V2 = 0x2
    }

    export enum Turns {
        //% blockId="T1B4" block="1/4"
        T1B4 = 90,
        //% blockId="T1B2" block="1/2"
        T1B2 = 180,
        //% blockId="T1B0" block="1"
        T1B0 = 360,
        //% blockId="T2B0" block="2"
        T2B0 = 720,
        //% blockId="T3B0" block="3"
        T3B0 = 1080,
        //% blockId="T4B0" block="4"
        T4B0 = 1440,
        //% blockId="T5B0" block="5"
        T5B0 = 1800
    }

    let initialized = false

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00)
        setFreq(50);
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        //serial.writeValue("ch", channel)
        //serial.writeValue("on", on)
        //serial.writeValue("off", off)

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }


    function setStepper(index: number, dir: boolean): void {
        if (index == 1) {
            if (dir) {
                setPwm(0, STP_CHA_L, STP_CHA_H);
                setPwm(2, STP_CHB_L, STP_CHB_H);
                setPwm(1, STP_CHC_L, STP_CHC_H);
                setPwm(3, STP_CHD_L, STP_CHD_H);
            } else {
                setPwm(3, STP_CHA_L, STP_CHA_H);
                setPwm(1, STP_CHB_L, STP_CHB_H);
                setPwm(2, STP_CHC_L, STP_CHC_H);
                setPwm(0, STP_CHD_L, STP_CHD_H);
            }
        } else {
            if (dir) {
                setPwm(4, STP_CHA_L, STP_CHA_H);
                setPwm(6, STP_CHB_L, STP_CHB_H);
                setPwm(5, STP_CHC_L, STP_CHC_H);
                setPwm(7, STP_CHD_L, STP_CHD_H);
            } else {
                setPwm(7, STP_CHA_L, STP_CHA_H);
                setPwm(5, STP_CHB_L, STP_CHB_H);
                setPwm(6, STP_CHC_L, STP_CHC_H);
                setPwm(4, STP_CHD_L, STP_CHD_H);
            }
        }
    }

    function stopMotor(index: number) {
        setPwm((index - 1) * 2, 0, 0);
        setPwm((index - 1) * 2 + 1, 0, 0);
    }

    /**
     * Servo Execute
     * @param index Servo Channel; eg: S1
     * @param degree [0-180] degree of servo; eg: 0, 90, 180
    */
    //% blockId=magicbit_servo block="Servo|%index|degree %degree"
    //% weight=100
    //% degree.min=0 degree.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Servo(index: Servos, degree: number): void {
        if (!initialized) {
            initPCA9685()
        }
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600) // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000
        setPwm(index + 7, 0, value)
    }

/**
     * Servo Execute
     * @param index Servo Channel; eg: S1
     * @param degree1 [0-180] degree of servo; eg: 0, 90, 180
	 * @param degree2 [0-180] degree of servo; eg: 0, 90, 180
	 * @param speed [1-10] speed of servo; eg: 1, 10
    */
    //% blockId=motorbit_servospeed block="Servo|%index|degree start %degree1|end %degree2|speed %speed"
    //% weight=98
    //% degree1.min=0 degree1.max=180
    //% degree2.min=0 degree2.max=180
    //% speed.min=1 speed.max=10
    //% inlineInputMode=inline
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Servospeed(index: Servos, degree1: number, degree2: number, speed: number): void {
        if (!initialized) {
            initPCA9685()
        }
        // 50hz: 20,000 us
        if(degree1 > degree2){
            for(let i=degree1;i>degree2;i--){
                let v_us = (i * 1800 / 180 + 600) // 0.6 ~ 2.4
                let value = v_us * 4096 / 20000
                basic.pause(4 * (10 - speed));
                setPwm(index + 7, 0, value)
            }
        }
        else{
            for(let i=degree1;i<degree2;i++){
                let v_us = (i * 1800 / 180 + 600) // 0.6 ~ 2.4
                let value = v_us * 4096 / 20000
                basic.pause(4 * (10 - speed));
                setPwm(index + 7, 0, value)
            }
        }
    }


    /**
     * Geek Servo
     * @param index Servo Channel; eg: S1
     * @param degree [-45-225] degree of servo; eg: -45, 90, 225
    */
    //% blockId=magicbit_gservo block="Geek Servo|%index|degree %degree=protractorPicker"
    //% weight=96
    //% blockGap=50
    //% degree.defl=90
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function GeekServo(index: Servos, degree: number): void {
        if (!initialized) {
            initPCA9685()
        }
        // 50hz: 20,000 us
        let v_us = ((degree - 90) * 20 / 3 + 1500) // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000
        setPwm(index + 7, 0, value)
    }
    //% blockId=magicbit_stepper_degree block="Stepper 28BYJ-48|%index|degree %degree"
    //% weight=90
    export function StepperDegree(index: Steppers, degree: number): void {
        if (!initialized) {
            initPCA9685()
        }
        setStepper(index, degree > 0);
        degree = Math.abs(degree);
        basic.pause(10240 * degree / 360);
        MotorStopAll()
    }


    //% blockId=magicbit_stepper_turn block="Stepper 28BYJ-48|%index|turn %turn"
    //% weight=90
    export function StepperTurn(index: Steppers, turn: Turns): void {
        let degree = turn;
        StepperDegree(index, degree);
    }

    //% blockId=magicbit_stepper_dual block="Dual Stepper(Degree) |STPM1 %degree1| STPM2 %degree2"
    //% weight=89
    export function StepperDual(degree1: number, degree2: number): void {
        if (!initialized) {
            initPCA9685()
        }
        setStepper(1, degree1 > 0);
        setStepper(2, degree2 > 0);
        degree1 = Math.abs(degree1);
        degree2 = Math.abs(degree2);
        basic.pause(10240 * Math.min(degree1, degree2) / 360);
        if (degree1 > degree2) {
            stopMotor(3); stopMotor(4);
            basic.pause(10240 * (degree1 - degree2) / 360);
        } else {
            stopMotor(1); stopMotor(2);
            basic.pause(10240 * (degree2 - degree1) / 360);
        }

        MotorStopAll()
    }

    /**
     * Stepper Car move forward
     * @param distance Distance to move in cm; eg: 10, 20
     * @param diameter diameter of wheel in mm; eg: 48
    */
    //% blockId=magicbit_stpcar_move block="Car Forward|Distance(cm) %distance|Wheel Diameter(mm) %diameter"
    //% weight=88
    export function StpCarMove(distance: number, diameter: number): void {
        if (!initialized) {
            initPCA9685()
        }
        let delay = 10240 * 10 * distance / 3 / diameter; // use 3 instead of pi
        setStepper(1, delay > 0);
        setStepper(2, delay > 0);
        delay = Math.abs(delay);
        basic.pause(delay);
        MotorStopAll()
    }

    /**
     * Stepper Car turn by degree
     * @param turn Degree to turn; eg: 90, 180, 360
     * @param diameter diameter of wheel in mm; eg: 48
     * @param track track width of car; eg: 125
    */
    //% blockId=magicbit_stpcar_turn block="Car Turn|Degree %turn|Wheel Diameter(mm) %diameter|Track(mm) %track"
    //% weight=87
    //% blockGap=50
    export function StpCarTurn(turn: number, diameter: number, track: number): void {
        if (!initialized) {
            initPCA9685()
        }
        let delay = 10240 * turn * track / 360 / diameter;
        setStepper(1, delay < 0);
        setStepper(2, delay > 0);
        delay = Math.abs(delay);
        basic.pause(delay);
        MotorStopAll()
    }

    //% blockId=magicbit_motor_run block="Motor|%index|speed %speed"
    //% weight=85
    //% speed.min=-255 speed.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function MotorRun(index: Motors, speed: number): void {
        if (!initialized) {
            initPCA9685()
        }
        speed = speed * 16; // map 255 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= -4096) {
            speed = -4095
        }
        if (index > 4 || index <= 0)
            return
        let pp = (index - 1) * 2
        let pn = (index - 1) * 2 + 1
        if (speed >= 0) {
            setPwm(pp, 0, speed)
            setPwm(pn, 0, 0)
        } else {
            setPwm(pp, 0, 0)
            setPwm(pn, 0, -speed)
        }
    }

    /**
     * Execute two motors at the same time
     * @param motor1 First Motor; eg: M1, M2
     * @param speed1 [-255-255] speed of motor; eg: 150, -150
     * @param motor2 Second Motor; eg: M3, M4
     * @param speed2 [-255-255] speed of motor; eg: 150, -150
    */
    //% blockId=magicbit_motor_dual block="Motor|%motor1|speed %speed1|%motor2|speed %speed2"
    //% weight=84
    //% speed1.min=-255 speed1.max=255
    //% speed2.min=-255 speed2.max=255
    //% inlineInputMode=inline
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function MotorRunDual(motor1: Motors, speed1: number, motor2: Motors, speed2: number): void {
        MotorRun(motor1, speed1);
        MotorRun(motor2, speed2);
    }

    /**
     * Execute single motors with delay
     * @param index Motor Index; eg: M1, M2, M3, M4
     * @param speed [-255-255] speed of motor; eg: 150, -150
     * @param delay seconde delay to stop; eg: 1
    */
    //% blockId=magicbit_motor_rundelay block="Motor|%index|speed %speed|delay %delay|s"
    //% weight=81
    //% speed.min=-255 speed.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function MotorRunDelay(index: Motors, speed: number, delay: number): void {
        MotorRun(index, speed);
        basic.pause(delay * 1000);
        MotorRun(index, 0);
    }

    //% blockId=magicbit_stop block="Motor Stop|%index|"
    //% weight=80
    export function MotorStop(index: Motors): void {
        MotorRun(index, 0);
    }

    //% blockId=magicbit_stop_all block="Motor Stop All"
    //% weight=79
    //% blockGap=50
    export function MotorStopAll(): void {
        if (!initialized) {
            initPCA9685()
        }
        for (let idx = 1; idx <= 4; idx++) {
            stopMotor(idx);
        }
    }

//% blockId="motorbit_rus04" block="On-board Ultrasonic part %index show color %rgb effect %effect" 
//% weight=78
export function motorbit_rus04(index: RgbUltrasonics, rgb: RgbColors, effect: ColorEffect): void {
    sensors.rus04_rgb(DigitalPin.P16, 4, index, rgb, effect);
}
    
//% blockId=Ultrasonic_reading_distance block="On-board Ultrasonic reading distance"
//% weight=77

export function Ultrasonic_reading_distance(): number {
    return sensors.Ultrasonic(DigitalPin.P2);
}


//% blockId=Setting_the_on_board_lights block="Setting the on-board lights %index color %rgb Effect %effect"
//% weight=76

export function Setting_the_on_board_lights(offset: Offset,rgb: RgbColors, effect: ColorEffect): void {
 sensors.rus04_rgb(DigitalPin.P16, offset, 0, rgb, effect);
}

    
    
    
    
    /**
     * button pushed.
     */
    //% blockId=onPressEvent
    //% block="on |%btn| button pressed" shim=IrRemote::onPressEvent group="micro:bit(v1)"
    export function OnPressEvent(btn: RemoteButton, body: () => void): void {
        return;
    }

    /**
     * initialises local variablesssss
     *  @param pin describe parameter here, eg: IrPins.P5  
     */
    //% blockId=IrRemote_init 
    //% block="connect ir receiver to %pin" shim=IrRemote::IrRemote_init group="micro:bit(v1)"
    export function IrRemote_init(pin: IrPins): void {
        return;
    }
    
    
    
    
    
export class Packeta {
    public mye: string;
    public myparam: number;
}


let irstate:string;
let state:number;
 /**
 * Read IR sensor value V2.
 */

//% advanced=true shim=maqueenIRV2::irCode
function irCode(): number {
    return 0;
}

//% weight=5
//% group="micro:bit(v2)"
//% blockId=IR_readv2 block="read IR key value"
export function IR_readV2(): string {
    pins.setPull(DigitalPin.P1, PinPullMode.PullUp);
    let val = valuotokeyConversion();
    let str;
    switch (val) {
        case 11: str = 'A'; break;
        case 12: str = 'B'; break;
        case 13: str = 'C'; break;
        case 14: str = 'D'; break;
        case 21: str = 'UP'; break;
        case 66: str = '+'; break;
        case 24: str = 'LEFT'; break;
        case 55: str = 'OK'; break;
        case 22: str = 'RIGHT'; break;
        case 0: str = '0'; break;
        case 23: str = 'DOWN'; break;
        case 99: str = '-'; break;
        case 1: str = '1'; break;
        case 2: str = '2'; break;
        case 3: str = '3'; break;
        case 4: str = '4'; break;
        case 5: str = '5'; break;
        case 6: str = '6'; break;
        case 7: str = '7'; break;
        case 8: str = '8'; break;
        case 9: str = '9'; break;
        default:
            str = '';
    }
    return str;
}

//% weight=2
//% group="micro:bit(v2)"
//% blockId=IR_callbackUserv2 block="on IR received"
//% draggableParameters
export function IR_callbackUserV2(cb: (message: string) => void) {
    pins.setPull(DigitalPin.P1, PinPullMode.PullUp);
    state = 1;
    control.onEvent(11, 22, function() {
        cb(irstate)
    }) 
}

function valuotokeyConversion(): number {
    let irdata: number;
    // basic.showString("" + (irCode()))
    switch (irCode()) {
        case 0xba45: irdata = 11; break;
        case 0xb946: irdata = 12; break;
        case 0xb847: irdata = 13; break;
        case 0xbb44: irdata = 14; break;
        case 0xbf40: irdata = 21; break;
        case 0xbc43: irdata = 66; break;
        case 0xf807: irdata = 24; break;
        case 0xea15: irdata = 55; break;
        case 0xf609: irdata = 22; break;
        case 0xe916: irdata = 0; break;
        case 0xe619: irdata = 23; break;
        case 0xf20d: irdata = 99; break;
        case 0xf30c: irdata = 1; break;
        case 0xe718: irdata = 2; break;
        case 0xa15e: irdata = 3; break;
        case 0xf708: irdata = 4; break;
        case 0xe31c: irdata = 5; break;
        case 0xa55a: irdata = 6; break;
        case 0xbd42: irdata = 7; break;
        case 0xad52: irdata = 8; break;
        case 0xb54a: irdata = 9; break;
        default:
            irdata = -1;
    }
    return irdata;
}

basic.forever(() => {
    if(state == 1){
        irstate = IR_readV2();
        if(irstate != '-1'){
            control.raiseEvent(11, 22)
        }
    }
    
    basic.pause(20);
})


}
