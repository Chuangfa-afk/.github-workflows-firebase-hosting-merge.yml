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

export const LeftAnimations = {
    IDLE: "IDLE",
    CLICK: "CLICK"
} as const;

/**
 * A class that represents a set of behavior for the mines.
 * @author PeteyLumpkins
 */
export default class LeftButtonBehavior implements AI {
    private owner: AnimatedSprite;
    private receiver: Receiver;
    private emitter: Emitter;

    /**
     * @see {AI.initializeAI}
     */
    initializeAI(owner: AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this.emitter = new Emitter();

        this.receiver = new Receiver();
        this.receiver.subscribe(HW3Events.LEFT);

        this.activate(options);
    }
    /**
     * @see {AI.activate}
     */
    activate(options: Record<string, any>): void {
        this.owner.animation.play(LeftAnimations.IDLE, true);
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
            default: {
                throw new Error("Unhandled event in MineBehavior! Event type: " + event.type);
            }
        }
    }

    /**
     * @see {Updatable.update}
     */
    update(deltaT: number): void {
        if(Input.isPressed(HW3Controls.MOVE_LEFT)) {
            this.emitter.fireEvent(HW3Events.LEFT);
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
        console.log("Going Left");
        this.owner.animation.play(LeftAnimations.CLICK, false);
    }
}





