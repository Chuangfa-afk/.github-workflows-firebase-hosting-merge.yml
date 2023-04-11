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
        if (!this.door && !this.sign2 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 350 && Input.getMousePressPosition().y < 450) && (Input.getMousePressPosition().x > 210 && Input.getMousePressPosition().x < 500)) { //Sign1 
            console.log(Input.getGlobalMousePosition().x);
            console.log(Input.getGlobalMousePosition().y);
            this.emitter.fireEvent(Level1Events.SIGN1);
			if(!this.sign1) {
				this.sign1 = true;
				this.timer.start(100);
			}
        }
		if(this.timer.isStopped() && this.sign1 && Input.isMouseJustPressed() && ((Input.getMousePosition().y > 165 && Input.getMousePosition().y < 650) && (Input.getMousePressPosition().x > 375 && Input.getMousePosition().x < 850))) { //Hide Sign1 
			this.sign1 = false;
			this.emitter.fireEvent(Level1Events.SIGN1HIDE);
		}
        if (!this.door && !this.sign1 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 350 && Input.getMousePressPosition().y < 450) && (Input.getMousePressPosition().x > 800 && Input.getMousePressPosition().x < 900)) { //Sign2 
            console.log(Input.getGlobalMousePosition().x);
            console.log(Input.getGlobalMousePosition().y);
            this.emitter.fireEvent(Level1Events.SIGN2);
			if(!this.sign2) {
				this.sign2 = true;
				this.timer.start(100);
			}
        }
		if(this.timer.isStopped() && this.sign2 && Input.isMouseJustPressed() && ((Input.getMousePosition().y > 300 && Input.getMousePosition().y < 650) && (Input.getMousePressPosition().x > 375 && Input.getMousePosition().x < 800))) { //Hide Sign2 
			this.sign2 = false;
			this.emitter.fireEvent(Level1Events.SIGN2HIDE);
		}
		if(!this.sign1 && !this.sign2 && !this.door && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 200 && Input.getMousePressPosition().y < 700) && (Input.getMousePressPosition().x > 400 && Input.getMousePressPosition().x < 800)) {
            console.log(Input.getGlobalMousePosition().x);
            console.log(Input.getGlobalMousePosition().y);
            this.emitter.fireEvent(Level1Events.DOOR);
			if(!this.door) {
				this.door = true;
				this.timer.start(100);
			}
		}
		if(this.timer.isStopped() && this.door && Input.isMouseJustPressed()) { //Hide sign
			this.door = false;
			this.emitter.fireEvent(Level1Events.DOORHIDE);
		} else {
            // Update anything necessairy 
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}