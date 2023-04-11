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
		if (Input.isJustPressed(HW3Controls.MOVE_LEFT)){
			this.finished(PlayerStates.FACINGR);
		} 
        // If the player clicks right, go to Facingl
        else if (Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
            this.finished(PlayerStates.FACINGL);
        } 
        else if (Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 400 && Input.getMousePressPosition().y < 600) && (Input.getMousePressPosition().x > 200 && Input.getMousePressPosition().x < 300)) { //Sign1 
            console.log("test1");
            this.emitter.fireEvent(Level1Events.SIGN1);
			if(!this.sign1) {
				this.sign1 = true;
				this.timer.start(100);
			}
        }
		else if(this.timer.isStopped() && this.sign1 && Input.isMouseJustPressed() && ((Input.getMousePosition().y > 165 && Input.getMousePosition().y < 650) && (Input.getMousePressPosition().x > 375 && Input.getMousePosition().x < 850))) { //Hide Sign1 
			this.sign1 = false;
			this.emitter.fireEvent(Level1Events.SIGN1HIDE);
		}
        else if (Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 400 && Input.getMousePressPosition().y < 600) && (Input.getMousePressPosition().x > 800 && Input.getMousePressPosition().x < 900)) { //Sign2 
            console.log("test2");
            this.emitter.fireEvent(Level1Events.SIGN2);
			if(!this.sign2) {
				this.sign2 = true;
				this.timer.start(100);
			}
        }
		else if(this.timer.isStopped() && this.sign2 && Input.isMouseJustPressed() && ((Input.getMousePosition().y > 165 && Input.getMousePosition().y < 650) && (Input.getMousePressPosition().x > 375 && Input.getMousePosition().x < 850))) { //Hide Sign2 
			this.sign2 = false;
			this.emitter.fireEvent(Level1Events.SIGN2HIDE);
		}
		else if(!this.sign1 && !this.sign2 && !this.door && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 400 && Input.getMousePressPosition().y < 900) && (Input.getMousePressPosition().x > 400 && Input.getMousePressPosition().x < 800)) {
            console.log("test3");
            this.emitter.fireEvent(Level1Events.DOOR);
			if(!this.door) {
				this.door = true;
				this.timer.start(100);
			}
		}
		else if(this.timer.isStopped() && this.door && Input.isMouseJustPressed()) { //Hide sign
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