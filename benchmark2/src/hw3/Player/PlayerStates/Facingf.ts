import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";

export default class Facingf extends PlayerState {

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(PlayerAnimations.FACINGF);
	}

	public update(deltaT: number): void {
        // Adjust anything needed

        // If the player clicks left, go to Facingl
		if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
			this.finished(PlayerStates.FACINGL);
		} 
        // If the player clicks right, go to Facingr
        else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
            this.finished(PlayerStates.FACINGR);
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