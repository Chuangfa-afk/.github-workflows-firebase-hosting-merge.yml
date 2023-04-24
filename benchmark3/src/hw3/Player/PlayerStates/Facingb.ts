import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Facingf from "./Facingf";
import { Level2Events } from "../../Scenes/Level2";

export default class Facingb extends PlayerState {
    protected emitter: Emitter = new Emitter();
	//Shows if signs are visible
	protected sign1: Boolean = false;
	protected sign2: Boolean = false;
    protected door: Boolean = false;
	protected timer: Timer = new Timer(100);
	protected whatLevel: number = -1;

	//Level2
	protected clock: Boolean = false;

	public onEnter(options: Record<string, any>): void {
		if(options) {
			this.whatLevel = options.whatLevel;
		}
        this.owner.animation.play(PlayerAnimations.FACINGB);
		console.log(this.whatLevel);
	}

	public update(deltaT: number): void {
		//Level 1
		if(this.whatLevel == 1) {
			// Adjust anything needed
			
			// If the player clicks left, go to Facingr
			if (!this.sign1 && !this.sign2 && !this.door && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingl
			else if (!this.sign1 && !this.sign2 && !this.door && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGL);
			} 
			//Sign1
			if (!this.door && !this.sign2 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 315 && Input.getMousePressPosition().y < 512) && (Input.getMousePressPosition().x > 206 && Input.getMousePressPosition().x < 338)) { //Sign1 
				this.emitter.fireEvent(Level1Events.SIGN1);
				if(!this.sign1) {
					this.sign1 = true;
					this.timer.start(100);
				}
			}
			if(this.timer.isStopped() && this.sign1 && !this.sign2 && Input.isMouseJustPressed()) { //Hide Sign1 
				this.sign1 = false;
				this.emitter.fireEvent(Level1Events.SIGN1HIDE);
			}
			//Sign 2
			if (!this.door && !this.sign1 && !this.sign2 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 315 && Input.getMousePressPosition().y < 512) && (Input.getMousePressPosition().x > 863 && Input.getMousePressPosition().x < 995)) { //Sign2 
				this.emitter.fireEvent(Level1Events.SIGN2);
				if(!this.sign2) {
					this.sign2 = true;
					this.timer.start(100);
				}
			}
			if(this.timer.isStopped() && this.sign2 && !this.sign1 && Input.isMouseJustPressed()) { //Hide Sign2 
				this.sign2 = false;
				this.emitter.fireEvent(Level1Events.SIGN2HIDE);
			}
			//Door
			if(!this.sign1 && !this.sign2 && !this.door && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 200 && Input.getMousePressPosition().y < 700) && (Input.getMousePressPosition().x > 400 && Input.getMousePressPosition().x < 800)) { //Door
				this.emitter.fireEvent(Level1Events.DOOR);
				if(!this.door) {
					this.door = true;
					this.timer.start(100);
				}
			}
			if(this.timer.isStopped() && this.door && !this.sign1 && !this.sign2 && Input.isMouseJustPressed()) { //Hide door
				this.door = false;
				this.emitter.fireEvent(Level1Events.DOORHIDE);
			}
		}

		//Level 2
		else if(this.whatLevel == 2) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGL);
			} 
			if (!this.clock && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 122 && Input.getMousePressPosition().y < 271) && (Input.getMousePressPosition().x > 570 && Input.getMousePressPosition().x < 683)) { //Clock
				this.emitter.fireEvent(Level2Events.CLOCK);
				this.clock = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.clock && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.CLOCKHIDE);
				this.clock = false;
			}

			if (Input.isMouseJustPressed()) {
				let mousePosition = Input.getMousePressPosition();
				console.log("Mouse clicked at X:", mousePosition.x, " Y:", mousePosition.y);
			}

		}
		
		//Level 3
		else if(this.whatLevel == 3) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGL);
			} 
		}

		//Level 4
		else if(this.whatLevel == 4) {
			if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.finished(PlayerStates.FACINGL);
			} 
			if(Input.isJustPressed(HW3Controls.MOVE_UP)) {
				this.finished(PlayerStates.FACINGU);
			}
		}
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {whatLevel: this.whatLevel, currState: "FACINGB"};
	}
}