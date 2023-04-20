import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import Jump from "./PlayerStates/Jump";
import Run from "./PlayerStates/Run";

import Facingf from "./PlayerStates/Facingf";
import Facingl from "./PlayerStates/Facingl";
import Facingr from "./PlayerStates/Facingr";
import Facingb from "./PlayerStates/Facingb";

import PlayerWeapon from "./PlayerWeapon";
import Input from "../../Wolfie2D/Input/Input";

import { HW3Controls } from "../HW3Controls";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import { HW3Events } from "../HW3Events";
import Dead from "./PlayerStates/Dead";

/**
 * Animation keys for the world spritesheet
 */
export const PlayerAnimations = {
    FACINGF: "FACINGF",
    FACINGL: "FACINGL",
    FACINGR: "FACINGR",
    FACINGB: "FACINGB",
} as const

/**
 * Tween animations the player can player.
 */
export const PlayerTweens = {
    FLIP: "FLIP",
    DEATH: "DEATH"
} as const

/**
 * Keys for the states the PlayerController can be in.
 */
export const PlayerStates = {
    /*IDLE: "IDLE",
    RUN: "RUN",
	JUMP: "JUMP",
    FALL: "FALL",*/
    DEAD: "DEAD",
    FACINGF: "FACINGF",
    FACINGL: "FACINGL",
    FACINGR: "FACINGR",
    FACINGB: "FACINGB",
} as const

/**
 * The controller that controls the player.
 */
export default class PlayerController extends StateMachineAI {

    /** The players game node */
    protected owner: HW3AnimatedSprite;
    
    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>){
        this.owner = owner;


        // Add the different states the player can be in to the PlayerController 
		/*this.addState(PlayerStates.IDLE, new Idle(this, this.owner));
		this.addState(PlayerStates.RUN, new Run(this, this.owner));
        this.addState(PlayerStates.JUMP, new Jump(this, this.owner));
        this.addState(PlayerStates.FALL, new Fall(this, this.owner));*/
        this.addState(PlayerStates.DEAD, new Dead(this, this.owner));
        this.addState(PlayerStates.FACINGF, new Facingf(this, this.owner));
        this.addState(PlayerStates.FACINGL, new Facingl(this, this.owner));
        this.addState(PlayerStates.FACINGR, new Facingr(this, this.owner));
        this.addState(PlayerStates.FACINGB, new Facingb(this, this.owner));
        
        this.owner.animation.play(PlayerAnimations.FACINGF, true);
        // Start the player in the Idle state
        this.initialize(PlayerStates.FACINGF);
    }


    public update(deltaT: number): void {
		super.update(deltaT);
	}

}