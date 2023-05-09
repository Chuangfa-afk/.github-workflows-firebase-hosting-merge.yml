import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { HW3Controls } from "../../HW3Controls";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../../Scenes/Level1";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { Level2Events } from "../../Scenes/Level2";
import { Level3Events } from "../../Scenes/Level3";
import { Level4Events } from "../../Scenes/Level4";
import MainMenu from "../../Scenes/MainMenu";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import { HW3Events } from "../../HW3Events";
import Receiver from "../../../Wolfie2D/Events/Receiver";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { Level5Events } from "../../Scenes/Level5";
import { Level6Events } from "../../Scenes/Level6";

export default class Facingl extends PlayerState {
    protected emitter: Emitter = new Emitter();
	//Shows if drawers is visible 
	protected drawer: Boolean = false;
    //protected drawer2: Boolean = false;
	protected checkInSign: Boolean = false;
	protected timer: Timer = new Timer(100);
	protected whatLevel: number = -1;

	//Level2
	protected coffee: Boolean = false;
	protected picture: Boolean = false;

	//Level3
	protected light: Boolean = false;
	protected diploma: Boolean = false;
	protected trash: Boolean = false;
	protected computer: Boolean = false;
	protected flower: Boolean = false;
	protected exit: Boolean = false;

	//Level4
	protected stock: Boolean = false;
	protected hammer: Boolean = false;
	protected railing: Boolean = false;
	//Has the railing in possession
	protected checkedRailing: Boolean = false;
	protected takeRailing: Boolean = false;

	//Level5
	protected warning: Boolean = false;
	protected pliers: Boolean = false;
	protected key: Boolean = false;

	//Level6
	protected beaker: Boolean = false;
	protected beaker1: Boolean = false;
	protected beaker2: Boolean = false;
	protected beaker3: Boolean = false;
	protected beaker4: Boolean = false;
	protected beaker5: Boolean = false;
	protected trophy: Boolean = false;
	protected newtonscradle: Boolean = false;
	protected labsupplies: Boolean = false;
	protected databoard: Boolean = false;
	protected lowercabinets: Boolean = false


	public onEnter(options: Record<string, any>): void {
		if(options) {
			this.whatLevel = options.whatLevel;
		}
		if(this.whatLevel == 4) {
			if(options.checkedRailing) {
				this.checkedRailing = options.checkedRailing;
				this.hammer = options.hammer;
			}
		}
		if(this.takeRailing) {
			this.owner.animation.play(PlayerAnimations.FACINGL2);
		}
        else {
			this.owner.animation.play(PlayerAnimations.FACINGL);
		}
	}

	public update(deltaT: number): void {
		//Level 1
        if(this.whatLevel ==1) {
			// Adjust anything needed
			// If the player clicks left, go to Facingb
			if (!this.drawer && !this.checkInSign && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingf
			else if (!this.drawer && !this.checkInSign && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGF);
			} 

			if(!this.drawer && !this.checkInSign && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGB);
			}
			else if(!this.drawer && !this.checkInSign && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGF);
			}
			
			if(!this.drawer && !this.checkInSign && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 440 && Input.getMousePressPosition().y < 800) && (Input.getMousePressPosition().x > 300 && Input.getMousePressPosition().x < 900)) { //Drawer 
				this.emitter.fireEvent(Level1Events.DRAWER);
				if(!this.drawer) {
					this.drawer = true;
					this.timer.start(100);
				}
			}
			if(this.timer.isStopped() && this.drawer && !this.checkInSign && Input.isMouseJustPressed()) { //Hide Drawer 
				this.drawer = false;
				this.emitter.fireEvent(Level1Events.DRAWERHIDE);
			}
			if(!this.checkInSign && !this.drawer && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 180 && Input.getMousePressPosition().y < 370) && (Input.getMousePressPosition().x > 300 && Input.getMousePressPosition().x < 900)) {
				this.emitter.fireEvent(Level1Events.CHECKINSIGN);
				if(!this.checkInSign) {
					this.checkInSign = true;
					this.timer.start(100);
				}
			}
			if(this.timer.isStopped() && this.checkInSign && !this.drawer && Input.isMouseJustPressed()) { //Hide sign
				this.checkInSign = false;
				this.emitter.fireEvent(Level1Events.CHECKINSIGNHIDE);
			}
		}

		//Level 2 - coffee, picture
		else if(this.whatLevel == 2) {
			if (!this.coffee && !this.picture && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.coffee && !this.picture && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGF);
			} 

			if(!this.coffee && !this.picture && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGB);
			}
			else if(!this.coffee && !this.picture && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGF);
			}

			if (!this.coffee && !this.picture && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 335 && Input.getMousePressPosition().y < 537) && (Input.getMousePressPosition().x > 663 && Input.getMousePressPosition().x < 888)) { //coffee
				this.emitter.fireEvent(Level2Events.COFFEE);
				this.coffee = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.coffee && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.COFFEEHIDE);
				this.coffee = false;
			}

			if (!this.picture && !this.coffee && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 224 && Input.getMousePressPosition().y < 423) && (Input.getMousePressPosition().x > 240 && Input.getMousePressPosition().x < 577)) { //coffee
				this.emitter.fireEvent(Level2Events.PICTURE);
				this.picture = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.picture && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level2Events.PICTUREHIDE);
				this.picture = false;
			}
		}

		//Level 3 - light, diploma, trash, computer, flower, exit
		else if(this.whatLevel == 3) {
			if (!this.light && !this.diploma && !this.trash && !this.computer && !this.flower && !this.exit && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.light && !this.diploma && !this.trash && !this.computer && !this.flower && !this.exit && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGF);
			} 

			if(!this.light && !this.diploma && !this.trash && !this.computer && !this.flower && !this.exit && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGB);
			}
			else if(!this.light && !this.diploma && !this.trash && !this.computer && !this.flower && !this.exit && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGF);
			}

			if (!this.light && !this.diploma && !this.trash && !this.computer && !this.flower && !this.exit && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 211 && Input.getMousePressPosition().y < 430) && (Input.getMousePressPosition().x > 562 && Input.getMousePressPosition().x < 722)) { //coffee
				this.emitter.fireEvent(Level3Events.LIGHT);
				this.light = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.light && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.LIGHTHIDE);
				this.light = false;
			}
			if (!this.diploma && !this.light && !this.trash && !this.computer && !this.flower && !this.exit && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 391 && Input.getMousePressPosition().y < 472) && (Input.getMousePressPosition().x > 418 && Input.getMousePressPosition().x < 518)) { //coffee
				this.emitter.fireEvent(Level3Events.DIPLOMA);
				this.diploma = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.diploma && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.DIPLOMAHIDE);
				this.diploma = false;
			}
			if (!this.trash && !this.light && !this.diploma && !this.computer && !this.flower && !this.exit && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 607 && Input.getMousePressPosition().y < 768) && (Input.getMousePressPosition().x > 291 && Input.getMousePressPosition().x < 420)) { //coffee
				this.emitter.fireEvent(Level3Events.TRASH);
				this.trash = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.trash && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.TRASHHIDE);
				this.trash = false;
			}
			if (!this.computer && !this.light && !this.diploma && !this.trash && !this.flower && !this.exit && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 221 && Input.getMousePressPosition().y < 386) && (Input.getMousePressPosition().x > 750 && Input.getMousePressPosition().x < 940)) { //coffee
				this.emitter.fireEvent(Level3Events.COMPUTERL);
				this.computer = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.computer && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.COMPUTERLHIDE);
				this.computer = false;
			}
			if (!this.flower && !this.light && !this.diploma && !this.trash && !this.computer && !this.exit && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 203 && Input.getMousePressPosition().y < 412) && (Input.getMousePressPosition().x > 1013 && Input.getMousePressPosition().x < 1085)) { //coffee
				this.emitter.fireEvent(Level3Events.FLOWER);
				this.flower = true;
				this.timer.start(100); 
			}
			if(this.timer.isStopped() && this.flower && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.FLOWERHIDE);
				this.flower = false;
			}
			if (!this.exit && !this.light && !this.diploma && !this.trash && !this.computer && !this.flower && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 79 && Input.getMousePressPosition().y < 165) && (Input.getMousePressPosition().x > 915 && Input.getMousePressPosition().x < 1106)) { //coffee
				this.emitter.fireEvent(Level3Events.EXIT);
				this.exit = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.exit && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level3Events.EXITHIDE);
				this.exit = false;
			}
		}

		//Level 4 - stock
		else if(this.whatLevel == 4) {
			if (!this.stock && !this.railing && Input.isJustPressed(HW3Controls.MOVE_LEFT)){
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGB);
			} 
			// If the player clicks right, go to Facingr
			else if (!this.stock && !this.railing && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGF);
			} 

			if(!this.stock && !this.railing && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGB);
			}
			else if(!this.stock && !this.railing && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGF);
			}

			if(!this.stock && !this.railing && Input.isJustPressed(HW3Controls.MOVE_UP)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGU);
			}

			if(!this.stock && !this.railing && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 145 && Input.getMousePressPosition().y < 566) && (Input.getMousePressPosition().x > 283 && Input.getMousePressPosition().x < 560)) {
				this.emitter.fireEvent(Level4Events.STOCK);
				this.stock = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.stock && !this.railing && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level4Events.STOCKHIDE);
				this.stock = false;
			}

			//Maybe checked railing, no hammer
			if(!this.takeRailing && !this.hammer && !this.railing && !this.stock && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 567 && Input.getMousePressPosition().y < 740) && (Input.getMousePressPosition().x > 565 && Input.getMousePressPosition().x < 1059)) {
				this.emitter.fireEvent(Level4Events.RAILING);
				this.railing = true;
				this.checkedRailing = true;
				this.timer.start(100);
			}
			//Checked, has hammer
			if(!this.takeRailing && this.checkedRailing && this.hammer && !this.railing && !this.stock && Input.isMouseJustPressed() && (Input.getMousePressPosition().y > 567 && Input.getMousePressPosition().y < 740) && (Input.getMousePressPosition().x > 565 && Input.getMousePressPosition().x < 1059)) {
				this.emitter.fireEvent(Level4Events.RAILING);
				this.railing = true;
				this.takeRailing = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && !this.takeRailing && this.railing && !this.stock && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level4Events.RAILINGHIDE);
				this.railing = false;
			}
			else if(this.timer.isStopped() && this.takeRailing && this.railing && !this.stock && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level4Events.RAILINGHIDE);
				this.railing = false;
				this.owner.animation.play(PlayerAnimations.FACINGL2);
			}
		}
		//Level 5
		else if(this.whatLevel == 5) {
			if(!this.warning && !this.pliers && !this.key && Input.isJustPressed(HW3Controls.MOVE_LEFT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGB);
			}
			else if(!this.warning && !this.pliers && !this.key && Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGF);
			}

			if(!this.warning && !this.pliers && !this.key && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGB);
			}
			else if(!this.warning && !this.pliers && !this.key && Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGF);
			}
			//Warning
			if(!this.warning && !this.pliers && !this.key && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 217 && Input.getMousePressPosition().y < 420) && (Input.getMousePressPosition().x > 476 && Input.getMousePressPosition().x < 674)) {
				this.emitter.fireEvent(Level5Events.WARNING);
				this.warning = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && this.warning && !this.pliers && !this.key && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level5Events.WARNINGHIDE);
				this.warning = false;
			}
			//Pliers
			if(!this.warning && !this.pliers && !this.key && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 592 && Input.getMousePressPosition().y < 789) && (Input.getMousePressPosition().x > 379 && Input.getMousePressPosition().x < 525)) {
				this.emitter.fireEvent(Level5Events.PLIERS);
				this.pliers = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && !this.warning && this.pliers && !this.key && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level5Events.PLIERSHIDE);
				this.pliers = false;
			}
			//Key
			if(!this.warning && !this.pliers && !this.key && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 598 && Input.getMousePressPosition().y < 730) && (Input.getMousePressPosition().x > 972 && Input.getMousePressPosition().x < 1075)) {
				this.emitter.fireEvent(Level5Events.KEY);
				this.key = true;
				this.timer.start(100);
			}
			if(this.timer.isStopped() && !this.warning && !this.pliers && this.key && Input.isMouseJustPressed()) {
				this.emitter.fireEvent(Level5Events.KEYHIDE);
				this.key = false;
			}

			if(Input.isMouseJustPressed(0)) {
				console.log(Input.getMousePressPosition());
			}
		}

		//Level 6
		else if(this.whatLevel == 6) {
			if(Input.isJustPressed(HW3Controls.MOVE_LEFT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGB);
			}
			else if(Input.isJustPressed(HW3Controls.MOVE_RIGHT)) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.finished(PlayerStates.FACINGF);
			}

			if(Input.isMouseJustPressed(0) && Input.getMousePressPosition().x < 90) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.LEFT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.LEFT);
				this.finished(PlayerStates.FACINGB);
			}
			else if(Input.isMouseJustPressed(0) && Input.getMousePressPosition().x > 1116) {
				this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.RIGHT_AUDIO_KEY, loop: false, holdReference: false});
				this.emitter.fireEvent(HW3Events.RIGHT);
				this.finished(PlayerStates.FACINGF);
			}

			if(Input.isMouseJustPressed(0)) {
				console.log(Input.getMousePressPosition().x);
				console.log(Input.getMousePressPosition().y);
			}

			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 441 && Input.getMousePressPosition().y < 525) && (Input.getMousePressPosition().x > 486 && Input.getMousePressPosition().x < 569)) {
				this.emitter.fireEvent(Level6Events.BEAKER);
				this.beaker1 = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 209 && Input.getMousePressPosition().y < 283) && (Input.getMousePressPosition().x > 349 && Input.getMousePressPosition().x < 402)) {
				this.emitter.fireEvent(Level6Events.BEAKER1);
				this.beaker1 = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 338 && Input.getMousePressPosition().y < 403) && (Input.getMousePressPosition().x > 406 && Input.getMousePressPosition().x < 447)) {
				this.emitter.fireEvent(Level6Events.BEAKER2);
				this.beaker2 = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 334 && Input.getMousePressPosition().y < 406) && (Input.getMousePressPosition().x > 504 && Input.getMousePressPosition().x < 573)) {
				this.emitter.fireEvent(Level6Events.BEAKER3);
				this.beaker3 = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 340 && Input.getMousePressPosition().y < 400) && (Input.getMousePressPosition().x > 647 && Input.getMousePressPosition().x < 706)) {
				this.emitter.fireEvent(Level6Events.BEAKER4);
				this.beaker4 = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 448 && Input.getMousePressPosition().y < 529) && (Input.getMousePressPosition().x > 341 && Input.getMousePressPosition().x < 406)) {//
				this.emitter.fireEvent(Level6Events.BEAKER5);
				this.beaker5 = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 325 && Input.getMousePressPosition().y < 400) && (Input.getMousePressPosition().x > 574 && Input.getMousePressPosition().x < 642)) {
				this.emitter.fireEvent(Level6Events.TROPHY);
				this.trophy = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 461 && Input.getMousePressPosition().y < 521) && (Input.getMousePressPosition().x > 614 && Input.getMousePressPosition().x < 696)) {
				this.emitter.fireEvent(Level6Events.NEWTONSCRADLE);
				this.newtonscradle = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 196 && Input.getMousePressPosition().y < 279) && (Input.getMousePressPosition().x > 407 && Input.getMousePressPosition().x < 710)) {
				this.emitter.fireEvent(Level6Events.LABSUPPLIES);
				this.labsupplies = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 168 && Input.getMousePressPosition().y < 585) && (Input.getMousePressPosition().x > 890 && Input.getMousePressPosition().x < 1106)) {
				this.emitter.fireEvent(Level6Events.DATABOARD);
				this.databoard = true;
				this.timer.start(100);
			}
			if(!this.beaker && !this.beaker1 && !this.beaker2 && !this.beaker3 && !this.beaker4 && !this.beaker5 && !this.trophy && !this.newtonscradle && !this.labsupplies && !this.databoard && !this.lowercabinets && Input.isMouseJustPressed(0) && (Input.getMousePressPosition().y > 554 && Input.getMousePressPosition().y < 735) && (Input.getMousePressPosition().x > 286 && Input.getMousePressPosition().x < 739)) {
				this.emitter.fireEvent(Level6Events.LOWERCABINETS);
				this.lowercabinets = true;
				this.timer.start(100);
			}

			if(this.timer.isStopped() && (this.beaker || this.beaker1 || this.beaker2 || this.beaker3 || this.beaker4 || this.beaker5 || this.trophy || this.newtonscradle || this.labsupplies || this.databoard || this.lowercabinets) && Input.isMouseJustPressed()) { 
				this.beaker = false;
				this.beaker1 = false;
				this.beaker2 = false;
				this.beaker3 = false;
				this.beaker4 = false;
				this.beaker5 = false;
				this.trophy = false;
				this.newtonscradle = false;
				this.labsupplies = false;
				this.databoard = false;
				this.lowercabinets = false;
				this.emitter.fireEvent(Level6Events.DIALOGUEHIDE);
				this.emitter.fireEvent(Level6Events.BEAKERHIDE);
				this.emitter.fireEvent(Level6Events.BEAKER1HIDE);
				this.emitter.fireEvent(Level6Events.BEAKER2HIDE);
				this.emitter.fireEvent(Level6Events.BEAKER3HIDE);
				this.emitter.fireEvent(Level6Events.BEAKER4HIDE);
				this.emitter.fireEvent(Level6Events.BEAKER5HIDE);
			}
		}

	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		if(this.whatLevel == 4) {
			return {whatLevel: this.whatLevel, currState: "FACINGL", checkedRailing: this.checkedRailing, hammer: this.hammer};
		}
		return {whatLevel: this.whatLevel, currState: "FACINGL"};
	}
}