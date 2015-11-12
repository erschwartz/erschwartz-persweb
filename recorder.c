#include <msp430g2553.h>
#define BUTTON BIT3
#define RED BIT0
#define GREEN BIT6

volatile unsigned int numWDTInterrupts;  // wdt interrupts for led blink
volatile unsigned int downInterruptCount;   // interrupt handler down count
int operationMode = 0; // 0: recording, 1: playback 
int buttonFirstTime = 0; // checks if buttons first time pressed 
int count = 0; 		  // array index
int sizeCommand = 30; // button can be pressed 15 times (on/off 15 ea) 
int blinkCommands[30] = {0}; // holds the recording that the led is going to blink

int main(void) {
	  WDTCTL = (WDTPW + // (bits 15-8) password
	                   // bit 7=0 => watchdog timer on
	                   // bit 6=0 => NMI on rising edge (not used here)
	                   // bit 5=0 => RST/NMI pin does a reset (not used here)
	           WDTTMSEL + // (bit 4) select interval timer mode
	           WDTCNTCL +  // (bit 3) clear watchdog timer counter
	  		          0 // bit 2=0 => SMCLK is the source
	  		          +1 // bits 1-0 = 01 => source/8K
	  		          );
	  IE1 |= WDTIE;		// enable the WDT interrupt (in the system interrupt register IE1)
	  P1DIR |= RED + GREEN;					// Set P1.0 and P1.6 to output direction
	  P1OUT &= RED;							// disable red led
	  P1OUT &= GREEN;						// disable green led
	  P1DIR &= ~BUTTON;                     // button is an input
	  P1OUT |= BUTTON;                      // pull-up resistor
	  P1REN |= BUTTON;                      // resistor enabled
	  P1IES |= BUTTON;                      // interrupt on low-to-high transition
	  P1IE |= BUTTON;                       // interrupt enable
	  // set these variables to 0 for start
	  numWDTInterrupts=0;
	  downInterruptCount=0;     
	  _bis_SR_register(GIE+LPM0_bits);  // enable interrupts and also turn the CPU off
	}

	interrupt void WDT_interval_handler(){
	if(operationMode == 0) { //checks what mode
		if(P1OUT == 0x08 && numWDTInterrupts == 1000) { //if button has been off for a long time
			//switch back to playback
			operationMode = 1;
			downInterruptCount = blinkCommands[0]; // downinterruptcount starts playing first led command 
			count = 0;
		}
		else {
			if(buttonFirstTime == 1) {
				numWDTInterrupts++;
			}
		}
	}
	else {	//playback mode
		if(blinkCommands[count] != 0) { //if there's something that's been recorded here 
			if (--downInterruptCount == 0) {          // decrement the counter and start only if 0
						P1OUT ^= RED + GREEN;                   // led is red/green
						downInterruptCount = blinkCommands[count]; // downcount now goes to next cmd
						if( count == sizeCommand ) {
							count = 0;	//start over
							P1OUT &= ~(RED + GREEN); // led off
							downInterruptCount = blinkCommands[count]; // downcount reset
						}
						else {
							count++; 		// let's go to next cmd
						}
					}
				}
		else { //no recorded value, skip
			if (count == sizeCommand) {
				count = 0;	//repeat this
				P1OUT &= ~(RED + GREEN); // led off
				downInterruptCount = blinkCommands[count]; // downcount reset
			}
			else {
				count++; 		// let's go to next cmd
			}
		}
	}
}

#pragma vector=PORT1_VECTOR
interrupt void Port_1(void) {
	buttonFirstTime = 1; //recording
	if( operationMode == 1) { //reset 
		numWDTInterrupts = 0;
		P1OUT &= ~(RED + GREEN);
		count = 0;
		operationMode = 0; 					//set to recording 
		memset(blinkCommands,0,sizeCommand); //reset array
	}
	P1OUT ^= RED; 
	P1IFG &= ~BUTTON; 
	P1IES ^= BUTTON; 
	// interrupt vector called when p1.3 goes high to low and low to high 
	if(numWDTInterrupts != 0)  { // 0 is debouncer
		blinkCommands[count] = numWDTInterrupts;	//	stores led of/on time in array
		numWDTInterrupts = 0;						// reset time of led on/off
		if(count < sizeCommand ) {
			count++;							// increment index of command
		}
	}
}

ISR_VECTOR(WDT_interval_handler, ".int10")