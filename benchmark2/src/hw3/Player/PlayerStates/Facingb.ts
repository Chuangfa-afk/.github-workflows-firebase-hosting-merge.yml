import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";

export default class Facingb extends PlayerState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(PlayerAnimations.FACINGB);
	}

	public update(deltaT: number): void {
        // Adjust anything needed
        
        // If the player clicks left, go to Facingr
		if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
			this.finished(PlayerStates.FACINGR);
		} 
        // If the player clicks right, go to Facingl
        else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
            this.finished(PlayerStates.FACINGL);
        } else {
            // Update anything necessairy 
        }

        // Otherwise, do nothing (keep idling)
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}