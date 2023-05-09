import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { LevelEvents } from "../../Scenes/Level";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import { HW3Events } from "../../HW3Events";
import { Level2Events } from "../../Scenes/Level2";
import Viewport from "../../../Wolfie2D/SceneGraph/Viewport";
import { Level3Events } from "../../Scenes/Level3";
import { Level4Events } from "../../Scenes/Level4";
import MainMenu from "../../Scenes/MainMenu";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import { Level5Events } from "../../Scenes/Level5";
import { Level6Events } from "../../Scenes/Level6";

export default class Facingf extends PlayerState {
	protected emitter: Emitter = new Emitter();
	//Level1
	protected clock1: Boolean = false;
	protected keypad: Boolean = false;
	protected timer: Timer = new Timer(100);
	protected elevator: Boolean = false;
	private receiver: Receiver;

	//Level2
	protected microwave: Boolean = false;
	protected doorHand: Boolean = false;
	
	//Level3
	protected plant: Boolean = false;
	protected elevator2: Boolean = false;
	protected waterMachine: Boolean = false;

	//Level4
	protected elevator3: Boolean = false;
	protected sign: Boolean = false;
	protected buttons: Boolean = false;
	protected railing: Boolean = false;
	protected hammer: Boolean = false;

	//Level5
	protected door: Boolean = false;
	protected puddle: Boolean = false;
	protected light: Boolean = false;

	//Level6
	protected stairway: Boolean = false;
	protected clockl1: Boolean = false;
	protected cabinet: Boolean = false;
	protected window: Boolean = false;

	//Check what level you're on
	protected whatLevel: number = -1;
	
	public onEnter(options: Record<string, any>): void {
		if(!this.receiver) {
			this.receiver = new Receiver();
			this.receiver.subscribe(LevelEvents.LEVEL_1);
			this.receiver.subscribe(LevelEvents.LEVEL_2);
			this.receiver.subscribe(LevelEvents.LEVEL_3);
			this.receiver.subscribe(LevelEvents.LEVEL_4);
			this.receiver.subscribe(LevelEvents.LEVEL_5);
			this.receiver.subscribe(LevelEvents.LEVEL_6);
		}
		if(options) {
			this.railing = options.checkedRailing;
			this.hammer = options.hammer;
		}
        this.owner.animation.play(PlayerAnimations.FACINGF, true);
	}

	public update(deltaT: number): void {
		//Level 1
		if(this.whatLevel == 1) {
		// If the player clicks left, go to Facingl
			if (!this.clock1 && !this.keypad && !this.elevator && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.clock1 && !this.keypad && !this.elevator && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 

			if (!this.clock1 && !this.keypad && !this.elevator && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGL);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.clock1 && !this.keypad && !this.elevator && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGR);
			} 
			
			if (!this.clock1 && !this.keypad && !this.elevator && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 190 && Input.getMousePressPosition().y < 320) && (Input.getMousePressPosition().x > 900 && Input.getMousePressPosition().x < 1000)) { //Clock1
				this.emitter.fireEvent(Level1Events.CLOCK1);
				this.clock1 = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.clock1 && !this.elevator && !this.keypad && Input.isMouseJustPressed()) { //Hide Clock1
				this.clock1 = false;
				this.emitter.fireEvent(Level1Events.CLOCK1HIDE);
			}
			
			if(!this.keypad && !this.clock1 && !this.elevator && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 400 && Input.getMousePressPosition().y < 480) && (Input.getMousePressPosition().x > 300 && Input.getMousePressPosition().x < 440)) {
				this.emitter.fireEvent(Level1Events.KEYPAD);
				if(!this.keypad) {
					this.keypad = true;
					this.timer.start(100);
				}
			}
			else if(this.timer.isStopped() && this.keypad && !this.elevator && !this.clock1 && Input.isMouseJustPressed()) { //Hide keypad
				this.keypad = false;
				this.emitter.fireEvent(Level1Events.KEYPADHIDE);
			}
			if (!this.clock1 && !this.keypad && !this.elevator && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 319 && Input.getMousePressPosition().y < 610) && (Input.getMousePressPosition().x > 397 && Input.getMousePressPosition().x < 807)) { //Elevator
				this.emitter.fireEvent(Level1Events.ELEVATOR);
				this.elevator = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.elevator && Input.isMouseJustPressed()) { //Hide Elevator
				this.elevator = false;
				this.emitter.fireEvent(Level1Events.ELEVATORHIDE);
			}
		}

		//Level 2 - microwave, doorhand
		else if(this.whatLevel == 2) {
			if (!this.microwave && !this.doorHand && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.microwave && !this.doorHand && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 

			if (!this.microwave && !this.doorHand && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGL);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.microwave && !this.doorHand && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGR);
			} 

			if(!this.microwave && !this.doorHand && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 369 && Input.getMousePressPosition().y < 477) && (Input.getMousePressPosition().x > 770 && Input.getMousePressPosition().x < 970)) {
				this.emitter.fireEvent(Level2Events.MICROWAVE);
				this.microwave = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.microwave && Input.isMouseJustPressed()) { //Hide Microwave
				this.microwave = false;
				this.emitter.fireEvent(Level2Events.MICROWAVEHIDE);
			}

			if(!this.doorHand && !this.microwave && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 380 && Input.getMousePressPosition().y < 450) && (Input.getMousePressPosition().x > 300 && Input.getMousePressPosition().x < 420)) {
				this.emitter.fireEvent(Level2Events.DOORHAND);
				this.doorHand = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.doorHand && Input.isMouseJustPressed()) { //Hide Doorhand
				this.doorHand = false;
				this.emitter.fireEvent(Level2Events.DOORHANDHIDE);
			}
		}

		//Level 3 - elevator2, waterMachine, plant
		else if(this.whatLevel == 3) {
			if (!this.elevator2 && !this.waterMachine && !this.plant && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.elevator2 && !this.waterMachine && !this.plant &&Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 

			if (!this.elevator2 && !this.waterMachine && !this.plant && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGL);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.elevator2 && !this.waterMachine && !this.plant && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGR);
			} 

			if(!this.elevator2 && !this.waterMachine && !this.plant &&Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 287 && Input.getMousePressPosition().y < 667) && (Input.getMousePressPosition().x > 400 && Input.getMousePressPosition().x < 806)) {
				this.emitter.fireEvent(Level3Events.ELEVATOR);
				this.elevator2 = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.elevator2 && Input.isMouseJustPressed()) { //Hide elevator2
				this.elevator2 = false;
				this.emitter.fireEvent(Level3Events.ELEVATORHIDE);
			}

			if(!this.waterMachine && !this.elevator2 && !this.plant && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 352 && Input.getMousePressPosition().y < 693) && (Input.getMousePressPosition().x > 234 && Input.getMousePressPosition().x < 363)) {
				this.emitter.fireEvent(Level3Events.WATERMACHINE);
				this.waterMachine = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.waterMachine && Input.isMouseJustPressed()) { //Hide watermachine
				this.waterMachine = false;
				this.emitter.fireEvent(Level3Events.WATERMACHINEHIDE);
			}
			if(!this.plant && !this.elevator2 && !this.waterMachine && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 472 && Input.getMousePressPosition().y < 691) && (Input.getMousePressPosition().x > 837 && Input.getMousePressPosition().x < 940)) {
				this.emitter.fireEvent(Level3Events.PLANT);
				this.plant = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.plant && Input.isMouseJustPressed()) { //Hide plant
				this.plant = false;
				this.emitter.fireEvent(Level3Events.PLANTHIDE);
			}
		}

		//Level 4 - elevator3, sign, buttons
		else if(this.whatLevel == 4) {
			if (!this.elevator3 && !this.sign && !this.buttons && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.elevator3 && !this.sign && !this.buttons && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 
			if(!this.elevator3 && !this.sign && !this.buttons && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGL);
			}
			else if (!this.elevator3 && !this.sign && !this.buttons && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGR);
			}

			if(!this.elevator3 && !this.sign && !this.buttons && Input.isJustPressed(HW3Controls.MOVE_UP)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGU);
			}

			if(!this.sign && !this.elevator3 && !this.buttons && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 321 && Input.getMousePressPosition().y < 562) && (Input.getMousePressPosition().x > 184 && Input.getMousePressPosition().x < 304)) {
				this.emitter.fireEvent(Level4Events.SIGN);
				this.sign = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.sign && Input.isMouseJustPressed()) { 
				this.sign = false;
				this.emitter.fireEvent(Level4Events.SIGNHIDE);
			}
			if(!this.elevator3 && !this.sign && !this.buttons && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 173 && Input.getMousePressPosition().y < 722) && (Input.getMousePressPosition().x > 364 && Input.getMousePressPosition().x < 844)) {
				this.emitter.fireEvent(Level4Events.ELEVATOR);
				this.elevator3 = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.elevator3 && Input.isMouseJustPressed()) { 
				this.elevator3 = false;
				this.emitter.fireEvent(Level4Events.ELEVATORHIDE);
			}
			if(!this.buttons && !this.elevator3 && !this.sign && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 325 && Input.getMousePressPosition().y < 560) && (Input.getMousePressPosition().x > 896 && Input.getMousePressPosition().x < 1014)) {
				this.emitter.fireEvent(Level4Events.BUTTONS);
				this.buttons = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && this.buttons && Input.isMouseJustPressed()) { 
				this.buttons = false;
				this.emitter.fireEvent(Level4Events.BUTTONSHIDE);
			}
		}
		//Level 5
		else if(this.whatLevel == 5) {
			if(!this.door && !this.puddle && !this.light && Input.isJustPressed(HW3Controls.MOVE_LEFT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			}
			else if(!this.door && !this.puddle && !this.light && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			}

			if(!this.door && !this.puddle && !this.light && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGL);
			}
			else if(!this.door && !this.puddle && !this.light && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGR);
			}

			//Door
			if(!this.door && !this.puddle && !this.light && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 289 && Input.getMousePressPosition().y < 496) && (Input.getMousePressPosition().x > 508 && Input.getMousePressPosition().x < 695)) {
				this.emitter.fireEvent(Level5Events.DOOR);
				this.door = true;
				this.timer.start(100);
			}
			//Light
			if(!this.door && !this.puddle && !this.light && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 189 && Input.getMousePressPosition().y < 248) && (Input.getMousePressPosition().x > 675 && Input.getMousePressPosition().x < 779)) {
				this.emitter.fireEvent(Level5Events.LIGHT);
				this.light = true;
				this.timer.start(100);
			}
			//Puddle
			if(!this.door && !this.puddle && !this.light && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 608 && Input.getMousePressPosition().y < 658) && (Input.getMousePressPosition().x > 925 && Input.getMousePressPosition().x < 996)) {
				this.emitter.fireEvent(Level5Events.PUDDLE);
				this.puddle = true;
				this.timer.start(100);
			}

			//Hide dialogue
			if(this.timer.isStopped() && (this.door || this.puddle || this.light) && Input.isMouseJustPressed()) { 
				this.door = false;
				this.puddle = false;
				this.light = false;
				this.emitter.fireEvent(Level5Events.DIALOGUEHIDE);
			}
		}

		//Level 6
		else if(this.whatLevel == 6) {
			if(Input.isJustPressed(HW3Controls.MOVE_LEFT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			}
			else if(Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			}

			if(Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGL);
			}
			else if(Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGR);
			}

			/*if(Input.isMouseJustPressed(0)) {
				console.log(Input.getMousePressPosition().x);
				console.log(Input.getMousePressPosition().y);
			}*/

			if(!this.clockl1 && !this.stairway && !this.window && !this.cabinet && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 193 && Input.getMousePressPosition().y < 298) && (Input.getMousePressPosition().x > 517 && Input.getMousePressPosition().x < 591)) {
				this.emitter.fireEvent(Level6Events.CLOCK1);
				this.clockl1 = true;
				this.timer.start(100);
			}
			if(!this.clockl1 && !this.stairway && !this.window && !this.cabinet && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 70 && Input.getMousePressPosition().y < 658) && (Input.getMousePressPosition().x > 592 && Input.getMousePressPosition().x < 844)) {
				this.emitter.fireEvent(Level6Events.STAIRCASE);
				this.stairway = true;
				this.timer.start(100);
			}
			if(!this.clockl1 && !this.stairway && !this.window && !this.cabinet && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 241 && Input.getMousePressPosition().y < 616) && (Input.getMousePressPosition().x > 250 && Input.getMousePressPosition().x < 492)) {
				this.emitter.fireEvent(Level6Events.LOCKEDCABINET);
				this.cabinet = true;
				this.timer.start(100);
			}
			if(!this.clockl1 && !this.stairway && !this.window && !this.cabinet && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 196 && Input.getMousePressPosition().y < 632) && (Input.getMousePressPosition().x > 869 && Input.getMousePressPosition().x < 1100)) {
				this.emitter.fireEvent(Level6Events.WINDOW);
				this.window = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && (this.clockl1 || this.stairway || this.window || this.cabinet) && Input.isMouseJustPressed()) { 
				this.clockl1 = false;
				this.stairway = false;
				this.cabinet = false;
				this.window = false;
				this.emitter.fireEvent(Level6Events.DIALOGUEHIDE);
				this.emitter.fireEvent(Level6Events.LOCKEDCABINETHIDE);
			}
		}

        // Otherwise, do nothing (keep idling)		

		while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
	}

	protected handleEvent(event: GameEvent): void {
		switch(event.type) {
			case LevelEvents.LEVEL_1: {
				this.whatLevel = 1;
				break;
			}
			case LevelEvents.LEVEL_2: {
				this.whatLevel = 2;
				break;
			}
			case LevelEvents.LEVEL_3: {
				this.whatLevel = 3;
				break;
			}
			case LevelEvents.LEVEL_4: {
				this.whatLevel = 4;
				break;
			}
			case LevelEvents.LEVEL_5: {
				this.whatLevel = 5;
				break;
			}
			case LevelEvents.LEVEL_6: {
				this.whatLevel = 6;
				break;
			}
			default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
		}
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		if(this.whatLevel == 4) {
			return {whatLevel: this.whatLevel, currState: "FACINGF", checkedRailing: this.railing, hammer: this.hammer};
		}
		return {whatLevel: this.whatLevel, currState: "FACINGF"};
	}
}