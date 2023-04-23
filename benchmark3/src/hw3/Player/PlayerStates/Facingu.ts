import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";

export default class Facingu extends PlayerState {
    protected emitter: Emitter = new Emitter();
	protected prevState: string;
	protected whatLevel: number = -1;

	public onEnter(options: Record<string, any>): void {
		this.owner.animation.play(PlayerAnimations.FACINGU);
		this.whatLevel = options.whatLevel;
		this.prevState = options.currState;
	}

	public update(deltaT: number): void {
        // Adjust anything needed
        
        // If the player clicks left, go to Facingb
		if (Input.isJustPressed(HW3Controls.MOVE_DOWN)){
			this.finished(this.prevState);
		} 
        
        // Otherwise, do nothing (keep idling)
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {whatLevel: this.whatLevel};
	}
}