import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/HW3Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";

export default class Facingb extends PlayerState {
    protected emitter: Emitter = new Emitter();
	//Shows if signs are visible
	protected sign1: Boolean = false;
	protected sign2: Boolean = false;
    protected door: Boolean = false;
	protected timer: Timer = new Timer(100);

	public onEnter(options: Record<string, any>): void {
        this.owner.animation.play(PlayerAnimations.FACINGB);
	}

	public update(deltaT: number): void {
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
		else {
            // Update anything necessairy 
        }
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}