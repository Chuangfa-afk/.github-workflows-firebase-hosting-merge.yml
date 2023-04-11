import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Level1Events } from "../../Scenes/HW3Level1";

export default class Facingr extends PlayerState {
	protected emitter: Emitter = new Emitter();
	//Shows if clock2 is visible
	protected clock2: Boolean = false;
	protected phone: Boolean = false;
	protected timer: Timer = new Timer(100);

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(PlayerAnimations.FACINGR);
	}

	public update(deltaT: number): void {
        // Adjust anything needed
        
        // If the player clicks left, go to Facingb
		if (!this.clock2 && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
			this.finished(PlayerStates.FACINGF);
		} 
        // If the player clicks right, go to Facingb
        else if (!this.clock2 && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
            this.finished(PlayerStates.FACINGB);
        } 
		
		if (!this.clock2 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 200 && Input.getMousePressPosition().y < 320) && (Input.getMousePressPosition().x > 925 && Input.getMousePressPosition().x < 1050)) { //Clock1
			this.emitter.fireEvent(Level1Events.CLOCK2);
			this.clock2 = true;
			this.timer.start(100);
		}
		if(this.timer.isStopped() && this.clock2 && Input.isMouseJustPressed()) { //Hide Clock1
			this.clock2 = false;
			this.emitter.fireEvent(Level1Events.CLOCK2HIDE);
		}
		

        // Otherwise, do nothing (keep idling)
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}