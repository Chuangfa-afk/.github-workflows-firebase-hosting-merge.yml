import AI from "../../Wolfie2D/DataTypes/Interfaces/AI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Receiver from "../../Wolfie2D/Events/Receiver";
import Input from "../../Wolfie2D/Input/Input";
import Graphic from "../../Wolfie2D/Nodes/Graphic";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Timer from "../../Wolfie2D/Timing/Timer";
import { HW3Controls } from "../HW3Controls";
import { HW3Events } from "../HW3Events";
import Emitter from "../../Wolfie2D/Events/Emitter";
import { Level1Events } from "../Scenes/HW3Level1";

export const ButtonAnimations = {
    IDLE: "IDLE",
    CLICK: "CLICK"
} as const;

/**
 * A class that represents a set of behavior for the mines.
 * @author PeteyLumpkins
 */
export default class ButtonBehavior implements AI {
    private owner: AnimatedSprite;
    private receiver: Receiver;
    private emitter: Emitter;
    private isLeft: Boolean;
    private isDialogueVisible: Boolean = false;

    /**
     * @see {AI.initializeAI}
     */
    initializeAI(owner: AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this.emitter = new Emitter();

        this.receiver = new Receiver();
        this.receiver.subscribe(HW3Events.LEFT);
        this.receiver.subscribe(HW3Events.RIGHT);
        this.receiver.subscribe(Level1Events.CLOCK1);
        this.receiver.subscribe(Level1Events.CLOCK1HIDE);
        this.receiver.subscribe(Level1Events.CLOCK2);
        this.receiver.subscribe(Level1Events.CLOCK2HIDE);
        this.receiver.subscribe(Level1Events.KEYPAD);
        this.receiver.subscribe(Level1Events.KEYPADHIDE);
        this.receiver.subscribe(Level1Events.PHONE);
        this.receiver.subscribe(Level1Events.PHONEHIDE);
        this.receiver.subscribe(Level1Events.KEY);
        this.receiver.subscribe(Level1Events.KEYHIDE);
        this.receiver.subscribe(Level1Events.DRAWER);
        this.receiver.subscribe(Level1Events.DRAWERHIDE);
        this.receiver.subscribe(Level1Events.ELEVATOR);
        this.receiver.subscribe(Level1Events.ELEVATORHIDE);
        this.receiver.subscribe(Level1Events.SIGN1);
        this.receiver.subscribe(Level1Events.SIGN1HIDE);
        this.receiver.subscribe(Level1Events.SIGN2);
        this.receiver.subscribe(Level1Events.SIGN2HIDE);

        this.isLeft = options.isLeft;

        this.activate(options);
    }
    /**
     * @see {AI.activate}
     */
    activate(options: Record<string, any>): void {
        this.owner.animation.play(ButtonAnimations.IDLE, true);
        
        this.receiver.ignoreEvents();
    }
    /**
     * @see {AI.handleEvent}
     */
    handleEvent(event: GameEvent): void { 
        switch(event.type) {
            case HW3Events.LEFT: {
                this.handleGoLeft(event);
                break;
            }
            case HW3Events.RIGHT: {
                this.handleGoRight(event);
                break;
            }
            case Level1Events.CLOCK1: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.CLOCK1HIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.CLOCK2: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.CLOCK2HIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.KEYPAD: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.KEYPADHIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.PHONE: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.PHONEHIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.KEY: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.KEYHIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.DRAWER: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.DRAWERHIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.ELEVATOR: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.ELEVATORHIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.SIGN1: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.SIGN1HIDE: {
                this.isDialogueVisible = false;
                break;
            }
            case Level1Events.SIGN2: {
                this.isDialogueVisible = true;
                break;
            }
            case Level1Events.SIGN2HIDE: {
                this.isDialogueVisible = false;
                break;
            }
            default: {
                throw new Error("Unhandled event in MineBehavior! Event type: " + event.type);
            }
        }
    }

    /**
     * @see {Updatable.update}
     */
    update(deltaT: number): void {
        if(!this.isDialogueVisible && this.isLeft && Input.isPressed(HW3Controls.MOVE_LEFT)) {
            this.emitter.fireEvent(HW3Events.LEFT);
        }
        if(!this.isDialogueVisible && !this.isLeft && Input.isPressed(HW3Controls.MOVE_RIGHT)) {
            this.emitter.fireEvent(HW3Events.RIGHT);
        }
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    /**
     * @see {AI.destroy}
     */
    destroy(): void { 
        this.receiver.destroy();
    }  

    protected handleGoLeft(event: GameEvent): void {
        if(this.isLeft) {
            this.owner.animation.play(ButtonAnimations.CLICK, false);
        }
    }
    protected handleGoRight(event: GameEvent): void {
        if(!this.isLeft) {
            this.owner.animation.play(ButtonAnimations.CLICK, false);
        }
    }
}





