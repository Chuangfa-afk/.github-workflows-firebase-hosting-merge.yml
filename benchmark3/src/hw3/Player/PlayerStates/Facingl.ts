import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Level2Events } from "../../Scenes/Level2";
import { Level3Events } from "../../Scenes/Level3";
import { Level4Events } from "../../Scenes/Level4";

export default class Facingl extends PlayerState {
    protected emitter: Emitter = new Emitter();
	//Shows if drawers is visible 
	protected drawer: Boolean = false;
    //protected drawer2: Boolean = false;
	protected checkInSign: Boolean = false;
	protected timer: Timer = new Timer(100);
	protected whatLevel: number = -1;

	//Level2
	protected coffee: Boolean = false;
	protected picture: Boolean = false;

	//Level3
	protected light: Boolean = false;
	protected diploma: Boolean = false;
	protected trash: Boolean = false;
	protected computer: Boolean = false;
	protected flower: Boolean = false;
	protected exit: Boolean = false;

	//Level4
	protected stock: Boolean = false;

	public onEnter(options: Record<string, any>): void {
		if(options) {
			this.whatLevel = options.whatLevel;
		}
        this.owner.animation.play(PlayerAnimations.FACINGL);
		console.log(this.whatLevel);
	}

	public update(deltaT: number): void {
		//Level 1
        if(this.whatLevel ==1) {
			// Adjust anything needed
        
			// If the player clicks left, go to Facingb
			if (!this.drawer && !this.checkInSign && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingf
			else if (!this.drawer && !this.checkInSign && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGF);
			} 
			
			if(!this.drawer && !this.checkInSign && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 440 && Input.getMousePressPosition().y < 800) && (Input.getMousePressPosition().x > 300 && Input.getMousePressPosition().x < 900)) { //Drawer 
				this.emitter.fireEvent(Level1Events.DRAWER);
				if(!this.drawer) {
					this.drawer = true;
					this.timer.start(100);
				}
			}
			if(this.timer.isStopped() && this.drawer && !this.checkInSign && Input.isMouseJustPressed()) { //Hide Drawer 
				this.drawer = false;
				this.emitter.fireEvent(Level1Events.DRAWERHIDE);
			}
			if(!this.checkInSign && !this.drawer && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 180 && Input.getMousePressPosition().y < 370) && (Input.getMousePressPosition().x > 300 && Input.getMousePressPosition().x < 900)) {
				this.emitter.fireEvent(Level1Events.CHECKINSIGN);
				if(!this.checkInSign) {
					this.checkInSign = true;
					this.timer.start(100);
				}
			}
			if(this.timer.isStopped() && this.checkInSign && !this.drawer && Input.isMouseJustPressed()) { //Hide sign
				this.checkInSign = false;
				this.emitter.fireEvent(Level1Events.CHECKINSIGNHIDE);
			}
		}

		//Level 2
		else if(this.whatLevel == 2) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGF);
			} 

			if (!this.coffee && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 335 && Input.getMousePressPosition().y < 537) && (Input.getMousePressPosition().x > 663 && Input.getMousePressPosition().x < 888)) { //coffee
				this.emitter.fireEvent(Level2Events.COFFEE);
				this.coffee = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.coffee && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.COFFEEHIDE);
				this.coffee = false;
			}

			if (!this.picture && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 224 && Input.getMousePressPosition().y < 423) && (Input.getMousePressPosition().x > 240 && Input.getMousePressPosition().x < 577)) { //coffee
				this.emitter.fireEvent(Level2Events.PICTURE);
				this.picture = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.picture && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.PICTUREHIDE);
				this.picture = false;
			}

			// if (Input.isMouseJustPressed()) {
			// 	let mousePosition = Input.getMousePressPosition();
			// 	console.log("Mouse clicked at X:", mousePosition.x, " Y:", mousePosition.y);
			// }
		}

		//Level 3
		else if(this.whatLevel == 3) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGF);
			} 

			if (!this.light && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 211 && Input.getMousePressPosition().y < 430) && (Input.getMousePressPosition().x > 562 && Input.getMousePressPosition().x < 722)) { //coffee
				this.emitter.fireEvent(Level3Events.LIGHT);
				this.light = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.light && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.LIGHTHIDE);
				this.light = false;
			}
			if (!this.diploma && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 391 && Input.getMousePressPosition().y < 472) && (Input.getMousePressPosition().x > 418 && Input.getMousePressPosition().x < 518)) { //coffee
				this.emitter.fireEvent(Level3Events.DIPLOMA);
				this.diploma = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.diploma && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.DIPLOMAHIDE);
				this.diploma = false;
			}
			if (!this.trash && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 607 && Input.getMousePressPosition().y < 768) && (Input.getMousePressPosition().x > 291 && Input.getMousePressPosition().x < 420)) { //coffee
				this.emitter.fireEvent(Level3Events.TRASH);
				this.trash = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.trash && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.TRASHHIDE);
				this.trash = false;
			}
			if (!this.computer && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 221 && Input.getMousePressPosition().y < 386) && (Input.getMousePressPosition().x > 750 && Input.getMousePressPosition().x < 940)) { //coffee
				this.emitter.fireEvent(Level3Events.COMPUTERL);
				this.computer = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.computer && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.COMPUTERLHIDE);
				this.computer = false;
			}
			if (!this.flower && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 203 && Input.getMousePressPosition().y < 412) && (Input.getMousePressPosition().x > 1013 && Input.getMousePressPosition().x < 1085)) { //coffee
				this.emitter.fireEvent(Level3Events.FLOWER);
				this.flower = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.flower && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.FLOWERHIDE);
				this.flower = false;
			}
			if (!this.exit && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 79 && Input.getMousePressPosition().y < 165) && (Input.getMousePressPosition().x > 915 && Input.getMousePressPosition().x < 1106)) { //coffee
				this.emitter.fireEvent(Level3Events.EXIT);
				this.exit = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.exit && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.EXITHIDE);
				this.exit = false;
			}
			



			// if (Input.isMouseJustPressed()) {
			// 	let mousePosition = Input.getMousePressPosition();
			// 	console.log("Mouse clicked at X:", mousePosition.x, " Y:", mousePosition.y);
			// }
		}

		//Level 4
		else if(this.whatLevel == 4) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGF);
			} 
			if(Input.isJustPressed(HW3Controls.MOVE_UP)) {
				this.finished(PlayerStates.FACINGU);
			}

			if (!this.stock && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 145 && Input.getMousePressPosition().y < 566) && (Input.getMousePressPosition().x > 283 && Input.getMousePressPosition().x < 560)) { //coffee
				this.emitter.fireEvent(Level4Events.STOCK);
				this.stock = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.stock && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level4Events.STOCKHIDE);
				this.stock = false;
			}

			if (Input.isMouseJustPressed()) {
				let mousePosition = Input.getMousePressPosition();
				console.log("Mouse clicked at X:", mousePosition.x, " Y:", mousePosition.y);
			}
		}
        // Otherwise, do nothing (keep idling)
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {whatLevel: this.whatLevel, currState: "FACINGL"};
	}
}