import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Facingf from "./Facingf";
import { Level2Events } from "../../Scenes/Level2";
import { Level3Events } from "../../Scenes/Level3";
import { Level4Events } from "../../Scenes/Level4";
import MainMenu from "../../Scenes/MainMenu";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import { HW3Events } from "../../HW3Events";
import { Level5Events } from "../../Scenes/Level5";

export default class Facingb extends PlayerState {
    protected emitter: Emitter = new Emitter();
	//Shows if signs are visible
	protected sign1: Boolean = false;
	protected sign2: Boolean = false;
    protected door: Boolean = false;
	protected timer: Timer = new Timer(100);
	protected whatLevel: number = -1;

	//Level2
	protected clock: Boolean = false;
	protected boiler: Boolean = false;
	protected plant: Boolean = false;
	protected refrigerator: Boolean = false;

	//Level3
	protected clock2: Boolean = false;
	protected lockers: Boolean = false;

	//Level4
	protected note: Boolean = false;
	protected railing: Boolean = false;
	protected hole: Boolean = false;
	protected hammer: Boolean = false;
	protected ladder: Boolean = false;

	//Level5
	protected elevator: Boolean = false;

	//Level6
	protected entrancedoor: Boolean = false;
	protected clockl2: Boolean = false;
	protected notel1: Boolean = false;

	public onEnter(options: Record<string, any>): void {
		if(options) {
			this.whatLevel = options.whatLevel;
		}
		if(options.checkedRailing) {
			this.railing = options.checkedRailing;
			this.hammer = options.hammer;
			this.ladder = options.ladder;
		}
        this.owner.animation.play(PlayerAnimations.FACINGB);
	}

	public update(deltaT: number): void {
		//Level 1
		if(this.whatLevel == 1) {
			// Adjust anything needed
			// If the player clicks left, go to Facingr
			if (!this.sign1 && !this.sign2 && !this.door && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingl
			else if (!this.sign1 && !this.sign2 && !this.door && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			} 

			if (!this.sign1 && !this.sign2 && !this.door && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingl
			else if (!this.sign1 && !this.sign2 && !this.door && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
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
		}

		//Level 2 - clock, boiler, plant, refrigerator
		else if(this.whatLevel == 2) {
			if (!this.clock && !this.boiler && !this.plant && !this.refrigerator && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.clock && !this.boiler && !this.plant && !this.refrigerator && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			}

			if (!this.clock && !this.boiler && !this.plant && !this.refrigerator && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.clock && !this.boiler && !this.plant && !this.refrigerator && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGL);
			} 

			if (!this.clock && !this.boiler && !this.plant && !this.refrigerator && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 122 && Input.getMousePressPosition().y < 271) && (Input.getMousePressPosition().x > 790 && Input.getMousePressPosition().x < 950)) { //Clock
				this.emitter.fireEvent(Level2Events.CLOCK);
				this.clock = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.clock && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.CLOCKHIDE);
				this.clock = false;
			}
			if (!this.boiler && !this.clock && !this.plant && !this.refrigerator && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 509 && Input.getMousePressPosition().y < 599) && (Input.getMousePressPosition().x > 800 && Input.getMousePressPosition().x < 940)) { //boiler
				this.emitter.fireEvent(Level2Events.BOILER);
				this.boiler = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.boiler && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.BOILERHIDE);
				this.boiler = false;
			}
			if (!this.plant && !this.clock && !this.boiler && !this.refrigerator && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 416 && Input.getMousePressPosition().y < 502) && (Input.getMousePressPosition().x > 510 && Input.getMousePressPosition().x < 600)) { //plant
				this.emitter.fireEvent(Level2Events.PLANT);
				this.plant = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.plant && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.PLANTHIDE);
				this.plant = false;
			}
			if (!this.refrigerator && !this.clock && !this.boiler && !this.plant && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 256 && Input.getMousePressPosition().y < 669) && (Input.getMousePressPosition().x > 268 && Input.getMousePressPosition().x < 326)) { //Refri
				this.emitter.fireEvent(Level2Events.REFRIGERATOR);
				this.refrigerator = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.refrigerator && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.REFRIGERATORHIDE);
				this.refrigerator = false;
			}
		}
		
		//Level 3 - clock2, lockers
		else if(this.whatLevel == 3) {
			if (!this.clock2 && !this.lockers && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.clock2 && !this.lockers && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			} 

			if (!this.clock2 && !this.lockers && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.clock2 && !this.lockers && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGL);
			} 

			if (!this.clock2 && !this.lockers && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 208 && Input.getMousePressPosition().y < 269) && (Input.getMousePressPosition().x > 805 && Input.getMousePressPosition().x < 855)) { //Refri
				this.emitter.fireEvent(Level3Events.CLOCK);
				this.clock2 = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.clock2 && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.CLOCKHIDE);
				this.clock2 = false;
			}

			if (!this.lockers && !this.clock2 && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 369 && Input.getMousePressPosition().y < 632) && (Input.getMousePressPosition().x > 131 && Input.getMousePressPosition().x < 426)) { //Refri
				this.emitter.fireEvent(Level3Events.LOCKERS);
				this.lockers = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.lockers && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.LOCKERSHIDE);
				this.lockers = false;
			}
		}

		//Level 4 - note, hole, hammer, ladder
		else if(this.whatLevel == 4) {
			if (!this.ladder && !this.hole && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.ladder && !this.hole && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			} 

			if (!this.ladder && !this.hole && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGR);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.ladder && !this.hole && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGL);
			} 

			if(!this.ladder && !this.hole && Input.isJustPressed(HW3Controls.MOVE_UP)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGU);
			}

			if (!this.ladder && !this.hole && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 131 && Input.getMousePressPosition().y < 746) && (Input.getMousePressPosition().x > 207 && Input.getMousePressPosition().x < 642)) { //ladder
				this.emitter.fireEvent(Level4Events.LADDER);
				this.ladder = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.ladder && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level4Events.LADDERHIDE);
				this.ladder = false;
			}

			//No note, no railing, no hammer
			if (!this.hole && !this.note && !this.hammer && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 586 && Input.getMousePressPosition().y < 728) && (Input.getMousePressPosition().x > 955 && Input.getMousePressPosition().x < 1111)) { //note
				this.emitter.fireEvent(Level4Events.HOLE);
				this.note = true;
				this.hole = true;
				this.timer.start(100);
			}
			//Saw note w/o seeing railing and w/o hammer --> "seeing something shiny in cracks"
			else if(!this.hole && !this.railing && this.note && !this.hammer && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 586 && Input.getMousePressPosition().y < 728) && (Input.getMousePressPosition().x > 955 && Input.getMousePressPosition().x < 1111)) { //note
				this.emitter.fireEvent(Level4Events.HOLE);
				this.hole = true;
				this.timer.start(100);
			}
			//Saw note, saw railing, no hammer --> now will get hammer
			else if (this.note && this.railing && !this.hammer && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 586 && Input.getMousePressPosition().y < 728) && (Input.getMousePressPosition().x > 955 && Input.getMousePressPosition().x < 1111)) { //note
				this.emitter.fireEvent(Level4Events.HOLE);
				this.hammer = true;
				this.hole = true;
				this.timer.start(100);
			}
			//Saw note, saw railing, obtained hammer already --> "there's nothing else here"
			else if (this.railing && this.hammer && this.note && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 586 && Input.getMousePressPosition().y < 728) && (Input.getMousePressPosition().x > 955 && Input.getMousePressPosition().x < 1111)) { //note
				this.emitter.fireEvent(Level4Events.HOLE);
				this.hole = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.hole && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level4Events.HOLEHIDE);
				this.hole = false;
			}

			if(Input.isMouseJustPressed(0)) {
				console.log(Input.getMousePressPosition());
			}

		}
		//Level 5 - elevator
		else if(this.whatLevel == 5) {
			if(!this.elevator && Input.isJustPressed(HW3Controls.MOVE_LEFT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			}
			else if(!this.elevator && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			}

			if(!this.elevator && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGR);
			}
			else if(!this.elevator && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGL);
			}
			if (!this.elevator && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 151 && Input.getMousePressPosition().y < 721) && (Input.getMousePressPosition().x > 331 && Input.getMousePressPosition().x < 872)) { //note
				this.emitter.fireEvent(Level5Events.ELEVATOR);
				this.elevator = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.elevator && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level5Events.DIALOGUEHIDE);
				this.elevator = false;
			}

			if(Input.isMouseJustPressed(0)) {
				console.log(Input.getMousePressPosition());
			}
		}

		//Level 6
		else if(this.whatLevel == 6) {
			if(Input.isJustPressed(HW3Controls.MOVE_LEFT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGR);
			}
			else if(Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGL);
			}

			if(Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGR);
			}
			else if(Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGL);
			}
		}
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		if(this.whatLevel == 4) {
			return {whatLevel: this.whatLevel, currState: "FACINGB", checkedRailing: this.railing, hammer: this.hammer, ladder: this.ladder};
		}
		return {whatLevel: this.whatLevel, currState: "FACINGB"};
	}
}