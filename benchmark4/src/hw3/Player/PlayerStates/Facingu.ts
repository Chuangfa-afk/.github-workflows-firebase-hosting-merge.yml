import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Level4Events } from "../../Scenes/Level4";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import MainMenu from "../../Scenes/MainMenu";

export default class Facingu extends PlayerState {
    protected emitter: Emitter = new Emitter();
	protected prevState: string;
	protected whatLevel: number = -1;
	protected timer: Timer = new Timer(100);


	protected trapdoor: Boolean = false;

	public onEnter(options: Record<string, any>): void {
		this.owner.animation.play(PlayerAnimations.FACINGU);
		this.whatLevel = options.whatLevel;
		this.prevState = options.currState;
	}

	public update(deltaT: number): void {        
        // If the player clicks left, go to Facingb
		if (!this.trapdoor && Input.isJustPressed(HW3Controls.MOVE_DOWN)){
			this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
			this.finished(this.prevState);
		} 

		if (!this.trapdoor && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 123 && Input.getMousePressPosition().y < 356) && (Input.getMousePressPosition().x > 326 && Input.getMousePressPosition().x < 555)) { //keyboard
			this.emitter.fireEvent(Level4Events.TRAPDOOR);
			this.trapdoor = true;
			this.timer.start(100);
		}
		if(this.timer.isStopped() && this.trapdoor && Input.isMouseJustPressed()) {
			this.emitter.fireEvent(Level4Events.TRAPDOORHIDE);
			this.trapdoor = false;
		}		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {whatLevel: this.whatLevel};
	}
}