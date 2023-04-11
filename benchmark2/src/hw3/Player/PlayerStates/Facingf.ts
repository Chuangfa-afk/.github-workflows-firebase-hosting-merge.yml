import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/HW3Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";

export default class Facingf extends PlayerState {
	protected emitter: Emitter = new Emitter();
	//Shows if clock1 is visible
	protected clock1: Boolean = false;
	protected keypad: Boolean = false;
	protected timer: Timer = new Timer(100);
	
	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(PlayerAnimations.FACINGF);
	}

	public update(deltaT: number): void {
        // Adjust anything needed

        // If the player clicks left, go to Facingl
		if (!this.clock1 && !this.keypad && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
			this.finished(PlayerStates.FACINGL);
		} 
        // If the player clicks right, go to Facingr
        else if (!this.clock1 && !this.keypad && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
            this.finished(PlayerStates.FACINGR);
        } 
		
		
		if (!this.clock1 && !this.keypad && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 190 && Input.getMousePressPosition().y < 320) && (Input.getMousePressPosition().x > 900 && Input.getMousePressPosition().x < 1000)) { //Clock1
			this.emitter.fireEvent(Level1Events.CLOCK1);
			this.clock1 = true;
			this.timer.start(100);
        }
		if(this.timer.isStopped() && this.clock1 && Input.isMouseJustPressed()) { //Hide Clock1
			this.clock1 = false;
			this.emitter.fireEvent(Level1Events.CLOCK1HIDE);
		}
		
		if(!this.keypad && !this.clock1 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 400 && Input.getMousePressPosition().y < 480) && (Input.getMousePressPosition().x > 300 && Input.getMousePressPosition().x < 440)) {
			this.emitter.fireEvent(Level1Events.KEYPAD);
			if(!this.keypad) {
				this.keypad = true;
				this.timer.start(100);
			}
		}
		else if(this.timer.isStopped() && this.keypad && Input.isMouseJustPressed()) { //Hide keypad
			this.keypad = false;
			this.emitter.fireEvent(Level1Events.KEYPADHIDE);
		}
        // Otherwise, do nothing (keep idling)
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}