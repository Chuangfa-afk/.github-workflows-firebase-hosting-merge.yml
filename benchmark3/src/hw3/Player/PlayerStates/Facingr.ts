import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Level1Events } from "../../Scenes/Level1";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { HW3Events } from "../../HW3Events";
import { Level2Events } from "../../Scenes/Level2";
import { Level3Events } from "../../Scenes/Level3";

export default class Facingr extends PlayerState {
	protected emitter: Emitter = new Emitter();
	//Shows if clock2 is visible
	protected clock2: Boolean = false;
	protected phone: Boolean = false;
	protected key: Boolean = false;
	protected keyShow: Boolean = false;
	protected timer: Timer = new Timer(100);
	protected whatLevel: number = -1;

	//Level2
	protected faucet: Boolean = false;
	protected refrigerator2: Boolean = false;
	protected lock: Boolean = false;

	//Level3
	protected keyboard: Boolean = false;
	protected paper: Boolean = false;
	protected cup: Boolean = false;
	protected safe: Boolean = false;
	protected computer: Boolean = false;

	public onEnter(options: Record<string, any>): void {
        if(options) {
			this.whatLevel = options.whatLevel;
		}
		this.owner.animation.play(PlayerAnimations.FACINGR);
		console.log(this.whatLevel);
	}

	public update(deltaT: number): void {
		//Level 1
        if(this.whatLevel == 1) {
			// Adjust anything needed
        
			// If the player clicks left, go to Facingf
			if (!this.keyShow && !this.clock2 && !this.phone && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGF);
			} 
			// If the player clicks right, go to Facingb
			else if (!this.keyShow && !this.clock2 && !this.phone && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGB);
			} 
			
			if (!this.clock2 && !this.phone && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 200 && Input.getMousePressPosition().y < 320) && (Input.getMousePressPosition().x > 925 && Input.getMousePressPosition().x < 1050)) {
				this.emitter.fireEvent(Level1Events.CLOCK2);
				this.clock2 = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.clock2 && Input.isMouseJustPressed()) { //Hide Clock1
				this.clock2 = false;
				this.emitter.fireEvent(Level1Events.CLOCK2HIDE);
			}
			if (!this.phone && !this.clock2 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 329 && Input.getMousePressPosition().y < 447) && (Input.getMousePressPosition().x > 170 && Input.getMousePressPosition().x < 267)) {
				this.emitter.fireEvent(Level1Events.PHONE);
				this.phone = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.phone && !this.clock2 && Input.isMouseJustPressed()) {
				this.phone = false;
				this.emitter.fireEvent(Level1Events.PHONEHIDE);
			}

			if (!this.key && !this.keyShow && !this.phone && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 243 && Input.getMousePressPosition().y < 729) && (Input.getMousePressPosition().x > 337 && Input.getMousePressPosition().x < 529)) {
				this.emitter.fireEvent(Level1Events.KEY);
				this.keyShow = true;
				this.key = true;
				this.timer.start(100);
			}
			if(this.key && this.keyShow && this.timer.isStopped() && !this.clock2 && !this.phone && Input.isMouseJustPressed()) { //Hide Clock1
				this.keyShow = false;
				this.emitter.fireEvent(Level1Events.KEYHIDE);
			}
		}

		//Level 2
		else if(this.whatLevel == 2) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGF);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGB);
			} 

			if (!this.refrigerator2 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 155 && Input.getMousePressPosition().y < 681) && (Input.getMousePressPosition().x > 700 && Input.getMousePressPosition().x < 1000)) { //refri2
				this.emitter.fireEvent(Level2Events.REFRIGERATOR2);
				this.refrigerator2 = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.refrigerator2 && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.REFRIGERATOR2HIDE);
				this.refrigerator2 = false;
			}
			if (!this.faucet && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 347 && Input.getMousePressPosition().y < 493) && (Input.getMousePressPosition().x > 392 && Input.getMousePressPosition().x < 550)) { //faucet
				this.emitter.fireEvent(Level2Events.FAUCET);
				this.faucet = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.faucet && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.FAUCETHIDE);
				this.faucet = false;
			}
			if (!this.lock && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 161 && Input.getMousePressPosition().y < 308) && (Input.getMousePressPosition().x > 243 && Input.getMousePressPosition().x < 340)) { //faucet
				this.emitter.fireEvent(Level2Events.LOCK);
				this.lock = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.lock && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.LOCKHIDE);
				this.lock = false;
			}

			// if (Input.isMouseJustPressed()) {
			// 	let mousePosition = Input.getMousePressPosition();
			// 	console.log("Mouse clicked at X:", mousePosition.x, " Y:", mousePosition.y);
			// }
		}

		//Level 3
		else if(this.whatLevel == 3) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGF);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGB);
			} 

			if (!this.keyboard && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 434 && Input.getMousePressPosition().y < 512) && (Input.getMousePressPosition().x > 253 && Input.getMousePressPosition().x < 425)) { //keyboard
				this.emitter.fireEvent(Level3Events.KEYBOARD);
				this.keyboard = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.keyboard && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.KEYBOARDHIDE);
				this.keyboard = false;
			}

			if (!this.paper && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 208 && Input.getMousePressPosition().y < 283) && (Input.getMousePressPosition().x > 625 && Input.getMousePressPosition().x < 708)) { //refri2
				this.emitter.fireEvent(Level3Events.PAPER);
				this.paper = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.paper && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.PAPERHIDE);
				this.paper = false;
			}
			if (!this.computer && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 205 && Input.getMousePressPosition().y < 390) && (Input.getMousePressPosition().x > 202 && Input.getMousePressPosition().x < 440)) { //computer
				this.emitter.fireEvent(Level3Events.COMPUTER);
				this.computer = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.computer && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.COMPUTERHIDE);
				this.computer = false;
			}
			if (!this.cup && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 447 && Input.getMousePressPosition().y < 530) && (Input.getMousePressPosition().x > 520 && Input.getMousePressPosition().x < 597)) { //computer
				this.emitter.fireEvent(Level3Events.CUP);
				this.cup = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.cup && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.CUPHIDE);
				this.cup = false;
			}
			if (!this.safe && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 586 && Input.getMousePressPosition().y < 763) && (Input.getMousePressPosition().x > 702 && Input.getMousePressPosition().x < 907)) { //computer
				this.emitter.fireEvent(Level3Events.SAFE);
				this.safe = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.safe && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.SAFEHIDE);
				this.safe = false;
			}



			if (Input.isMouseJustPressed()) {
				let mousePosition = Input.getMousePressPosition();
				console.log("Mouse clicked at X:", mousePosition.x, " Y:", mousePosition.y);
			}
		}

		//Level 4
		else if(this.whatLevel == 4) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGF);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGB);
			} 
			if(Input.isJustPressed(HW3Controls.MOVE_UP)) {
				this.finished(PlayerStates.FACINGU);
			}
		}
		/*
		if(!this.clock2 && !this.phone && Input.isMouseJustPressed()) {
			console.log(Input.getMousePressPosition());
		}

		*/
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {whatLevel: this.whatLevel, currState: "FACINGR"};
	}
}