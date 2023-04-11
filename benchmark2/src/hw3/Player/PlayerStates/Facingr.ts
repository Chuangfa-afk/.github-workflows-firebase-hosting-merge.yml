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
	protected key: Boolean = false;
	protected keyShow: Boolean = false;
	protected timer: Timer = new Timer(100);

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(PlayerAnimations.FACINGR);
	}

	public update(deltaT: number): void {
        // Adjust anything needed
        
        // If the player clicks left, go to Facingb
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
/*
		if(!this.clock2 && !this.phone && Input.isMouseJustPressed()) {
			console.log(Input.getMousePressPosition());
		}

		*/
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}