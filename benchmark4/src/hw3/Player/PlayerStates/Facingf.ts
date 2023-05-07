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

export default class Facingf extends PlayerState {
	protected emitter: Emitter = new Emitter();
	//Shows if clock1 is visible
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
			if(Input.isJustPressed(HW3Controls.MOVE_LEFT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});

				this.finished(PlayerStates.FACINGL);
			}
			else if(Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});

				this.finished(PlayerStates.FACINGR);
			}
		}

        // Otherwise, do nothing (keep idling)
		/*
		if(!this.clock1 && !this.keypad && Input.isMouseJustPressed()) {
			console.log(Input.getMousePressPosition());
		}
		*/
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
		return {whatLevel: this.whatLevel, currState: "FACINGF"};
	}
}