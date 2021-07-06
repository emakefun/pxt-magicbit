  # MagicBit产品

## 购买链接
点击链接进入淘宝购买——>>[Magicbit](https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-21556097790.16.545832c5PZ3CCi&id=602180967919)

## 适用人群
micro:bit多功能电机驱动扩展板适用于：小学生智力开发/教育培训机构/中小学实验室/创客教育

## 产品特色
1. 与乐高兼容，通过不同的积木搭建、配合MagicBit实现更好更多更富创造性的功能，充分发挥学生的创造力
2. 板载Micro-usb接口充电器和3.7V锂电池座，为产品提供更好的能量来源
3. 同时支持驱动8路舵机和4路直流电机，为天马行空的想法和复杂的功能实现提供可能
4. 支持驱动2路4线步进电机
5. 板载4个RGB全彩灯，无源蜂鸣器
6. 板载红外接收头，通过红外遥控器实现红外线远程控制
7. 包含一个PH2.0-4Pini2c的接口，接口防反插的设计更加安全方便
8. 1个PH2.0-4PinRGB超声波(RUS-04)模块接口

## 产品参数
* PCB板厚度：1.6mm
* 小圆孔直径：3.7mm
* 大圆孔直径：4.6mm
* 产品的尺寸：86mm×57mm×23mm
* 净重(不含电池)：
* 18650电池电压/容量：3.7V/3000mAh
* USB输入电压：5V

## 产品实物图
micro:bit多功能电机驱动扩展板与emakefun红外遥控器
![image](magic_bit/icon1.png)

## 硬件接口介绍

### 正面
![magicbit_hardware_zh](magic_bit/magicbit_hardware_front1_zh.png)

### 背面
![image](magic_bit/magicbit_hardware_back1_zh.png)

# 扩展版各单元模块详解

## LEGO底座安装

* 取一些LEGO底座的乐高积木零部件，安装底座，底座安装完成后，和Magicbit进行拼接。

   ![LEGO3](magic_bit/magicbit_LEGO_zh.gif)

## 电池座和充电口
![magicbit_power_zh](magic_bit/magicbit_power1_zh.png)

- 板载micro-usb接口充电器和3.7V锂电池座，在安装电池时注意电池的正负极，电池凸起的方向对应电池座的’＋‘号，另一端对应’ —‘ 号。
- 在使用扩展版时、安装电池或者连接充电器前，扩展版上的电源开关应处于关闭状态，当电池按要求安装完毕或者使用usb线连接好后，再打开扩展版上的总开关。
- 可以使用usb线连接到扩展版来为电池充电，以及为扩展版供电。
- Magicbit还有一个外接电源接口，可以通过电源正负极导线来对Magicbit供电，供电范围为3~5v

## 金手指介绍 
![magicbit_hole_zh](magic_bit/magicbit_hole1_zh.png)

- Magicbit的五个洞是为了RCA香蕉插头而准备的，底下的几个金属引脚是为了鳄鱼夹而准备。
- 5个金手指代表不同的引脚，0号代表P0引脚、1号代表P1引脚、2号代表P2引脚，3号代表3v3，GND代表接地引脚（**注意：在使用0号和1号引脚时，把跳线帽拔掉。如果不拔，0号引脚被板载蜂鸣器占用，1号引脚被红外接收头占用**）
- 在需要使用外部元器件时，可以通过使用鳄鱼夹等来连接金手指的相应家属引脚。程序里设置相应引脚来控制

## 导入软件包

### 打开编程网页
* [点击makecode](https://makecode.microbit.org/)  进入编程官网

### 新建项目
* 点击黑色箭头指向的**`新建项目`** ，进入到编程界面
![code_magicbit_project_zh](magic_bit/code_magicbit_project1_zh.png)

### 添加包
* 点击**`高级`**—>**`扩展`**—>输入网址**`https://github.com/emakefun/pxt-magicbit.git`**点击搜索—>点击magicbit包
![code_magicbit_highpackage_zh](magic_bit/code_magicbit_highpackage1_zh.png)

![code_magicbit_extend_zh](magic_bit/code_magicbit_extend1_zh.png)

![code_magicbit_addpackage_zh](magic_bit/code_magicbit_addpackage1_zh.png)

![code_magicbit_click_zh](magic_bit/code_magicbit_click1_zh.png)

![code_magicbit_complete_zh](magic_bit/code_magicbit_complete1_zh.png)

## 程序下载

### 点击下载按钮
* 点击**`下载`**,     红色箭头所指的按扭![code_magicbit_datadown_zh](magic_bit/magicbit_datadown1_zh.png)

### 保存到Microbit的U盘上，在保存过程中micro:bit指示灯会闪烁
* 点击红色箭头所指的地方、选择另存为

![code_magicbit_datasave1_zh](magic_bit/magicbit_datasave11_zh.png)

* 选择MICROBIT的内存盘，点击保存，程序就开始下载

![code_magicbit_datasave2_zh](magic_bit/magicbit_datasave21_zh.png)

## 蜂鸣器
![magicbit_buzzer_zh](magic_bit/magicbit_buzzer1_zh.png)

* 板载无源蜂鸣器，Magicbit上的蜂鸣器接线引脚为P0，通过对蜂鸣器输出不同频率的信号，从而控制蜂鸣器播放音乐。
* 当拔掉蜂鸣器的跳线帽时，引脚P0不能控制板载蜂鸣器，此时P0引脚可以作为普通IO引脚使用。跳线帽发货时是默认插上的。

## 直流电机接口

![magicbit_DCmotor_zh](magic_bit/magicbit_DCmotor1_zh.png)

* MagicBit包含4个PH2.0-2Pin 直流电机接口（也可以连接到排针上）。对于乐高积木的电机，可以接在步进电机的插口上。
> 控制直流电机例程实验

![magicbit_DCmotor1_zh](magic_bit/magicbit_DCmotor_code1_zh.png)

> 实验结果：当microbit主板的A按键被按下、接在M1的电机正转，按键B被按下、电机反转 [直流电机实验源码](https://makecode.microbit.org/_5dk6UyLzj3t3)

## 8路舵机接口
![magicbit_servo_zh](magic_bit/magicbit_ser_zh.png)

* 同时支持驱动8路舵机，而且扩展版上舵机的接口规格统一，方便接线
* Magicbit舵机接口的蓝色插口代表输出pwm信号的引脚、连接三线舵机的PWM输入信号黄色线，红色插口代表电源正极、连接三线舵机的电源正极橙色线，黑色插口代表电源负极、连接三线舵机的电源负极棕色线。
* 插口为S1~S8，在使用时，根据实际连接的插口，在程序积木中进行选择。
> 舵机控制实验例程

![magicbit_servo_code_zh](magic_bit/magicbit_servo_code1_zh.png)
> 控制舵机转动到角度100，过200ms再转动到角度50，如此循环，，， [舵机实验源码链接](https://makecode.microbit.org/_YtmKAe5a8C66)

## 步进电机接口

![magicbit_motor_zh](magic_bit/magicbit_motor1_zh.png)

> 注意：在使用步进电机接口控制直流电机时，应注意扩展版上的`A-`或`B-`连接直流电机负极,`A+`或`B+`连接直流电机正极

* 包含2路5线步进电机、可以同时连接控制两个步进电机，或者同时连接控制4路TT马达。
* 支持步进电机与TT马达同时使用，例如可以控制一个步进电机和两个直流电机（具体搭配可以根据需要来进行设定）
> 步进电机实验例程

![magicbit_motor_code_zh](magic_bit/magicbit_mottor_code1_zh.png)
> 步进电机驱动实验，实验结果为：STPM1与STPM2两个步进电机转动各50°，停止延时500ms，再转动，如此循环   [实验源码链接 ](https://makecode.microbit.org/_hz1a1EijJHKt)

## RGB炫彩灯
![magicbit_RGB_zh](magic_bit/magicbit_RGB1_zh.png)

* 板载4个RGB全彩灯，控制引脚为P16、可以通过编程控制四个RGB灯亮灭和颜色。
> 板载RGB实验例程

![magicbit_RGB_code_zh](magic_bit/magicbit_RGB_code1_zh.png)

> RGB流水灯实验设计 ，实验结果为：板载RGB灯变为绿色流水灯  [实验源码链接](https://makecode.microbit.org/_iWvFx9bvk6gb) 

## RGB超声波
![magicbit_RGBCSB_zh](magic_bit/magicbit_RGBCSB2_zh.png)

* 1个PH2.0-4Pin Rgb超声波（RUS-04)模块接口，该接口有两个用途，一方面可以作为超声波的TX和RX引脚口，另一方面也可以控制超声波模块的RGB彩灯，让超声波模块更加炫彩灵性。
* RGB超声波的IO引脚接在引脚的P2接口，RGB口与RGB口对应。
* 超声波的RGB彩灯，可以选择控制左右，显示的颜色和显示的特效，其中特效包括呼吸灯、旋转流星、闪烁。
> 超声波RGB使用例程实验

![magicbit_RGBCSB_code_zh](magic_bit/magicbit_RGBCSB_code1_zh.png)
> 当超声波检测到前方距离小于10cm时，超声波的RGB灯 **全部**会显示**靛蓝**，并且有**闪烁**的特效  [超声波RGB源码](https://makecode.microbit.org/_gHTLRaDPXJro)
> 超声波数值串口打印显示实验

![magicbit_RGBCSB](magic_bit/magicbit_RGBCSB_UART_code1_zh.png)

> 实验结果为：串口打印出超声波数值  [超声波串口实验源码](https://makecode.microbit.org/_Ky4Jfq1JiYgF)

## 8Pin IO口引出
![magicbit_Pin_zh](magic_bit/magicbit_Pin1_zh.png)

* 8个引出的IO口，黑色插口表示电源负极、红色插口表示电源正极(3V3)，蓝色表示IO信号口
* 引出的引脚是P0\P1\P2\P8\P12\P13\P14\P15

## I2C接口
![magicbit_I2C_zh](magic_bit/magicbit_I2C1_zh.png)

* 一块好的扩展版怎么能没有I2C接口？MagicBit扩展版包含1个PH2.0-4Pin i2c接口，可以使用该接口来控制 1602液晶等。在使用I2C通信时，应注意扩展版的数据线SDA引脚连接终端数据线SDA引脚，扩展版的时钟线SCL引脚连接终端的时钟线SCL引脚
> I2C使用例程（控制LCD1602显示）

![magicbit_I2C_code_zh](magic_bit/magicbit_I2C_code1_zh.png)

![magicbit_I2C_zh](magic_bit/magicbit_I2C2_zh.png)
> 实验现象为：LCD1602液晶第一行显示**`Hello! emakefun!`**    ，第二行显示**`2019`**       [I2C实验例程源码](https://makecode.microbit.org/_4W9VYRez0Kga)

详情请看(https://test-doc-zh-cn.readthedocs.io/projects/emakefun/zh_CN/latest/micro_bit/magicbit/)
