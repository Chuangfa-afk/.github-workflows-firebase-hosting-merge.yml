import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";

export default class Facingl extends PlayerState {
    protected emitter: Emitter = new Emitter();
	//Shows if drawers is visible 
	protected drawer: Boolean = false;
    //protected drawer2: Boolean = false;
	protected checkInSign: Boolean = false;
	protected timer: Timer = new Timer(100);
	protected whatLevel: number = -1;

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
		}
        // Otherwise, do nothing (keep idling)
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {whatLevel: this.whatLevel, currState: "FACINGL"};
	}
}