#include "pxt.h"
#include <map>
#include <vector>
#include "ReceiverIR.h"
using namespace pxt;
typedef vector<Action> vA;

enum class Pins{
  P0=  3,
  P1=  2,
  P2=  1,
  P3=  4,
  P4=  5,
  P5=  17,
  P6=  12,
  P7=  11,
  P8=  18,
  P9=  10,
  P10= 6,
  P11= 26,
  P12= 20,
  P13= 23,
  P14= 22,
  P15= 21,
  P16= 16,
  P19= 0,
  P20= 30
};

enum class RemoteButton {
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

//% color=50 weight=19 icon="\uf1eb"
//% block="IrRemote"
namespace IrRemote { 
  map<RemoteButton, vA> actions;
  map<RemoteButton, uint32_t> lastact;
  Timer tsb; 
  uint8_t buf[32];
  uint32_t now;
  ReceiverIR *rx;
  RemoteIR::Format fmt = RemoteIR::UNKNOWN;

  /**
  * button pushed.
  */
  //% blockId=onPressEvent
  //% block="on |%btn| button pressed"
  void onPressEvent(RemoteButton btn, Action body) {
    //if(actions.find(btn) == actions.end()) actions[btn] = new vector();
    actions[btn].push_back(body);
  }

  void cA(vA runner){for(int i=0;i<runner.size();i++){runAction0(runner[i]);} }

  void onReceivable(){
    int x = rx->getData(&fmt, buf, 32 * 8);
    if(actions.find((RemoteButton)buf[2]) == actions.end()) return;
    now = tsb.read_ms();
    if(now - lastact[(RemoteButton)buf[2]] < 100) return;
    lastact[(RemoteButton)buf[2]] = now;
    cA(actions[(RemoteButton)buf[2]]); 
  }

  void monitorIR(){
    while(1){
      while(rx->getState() != ReceiverIR::Received){ 
        uBit.sleep(50);
      }
      onReceivable();
    }
  }

  /**
  * initialises local variablesssss
  */
  //% blockId=init
  //% block="connect ir receiver to %pin"
  void init(Pins pin){
    rx = new ReceiverIR((PinName)pin);
    tsb.start(); //interrupt timer for debounce
    create_fiber(monitorIR);
  }
}
