import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level, { HW3Layers, LevelEvents } from "./Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Layer from "../../Wolfie2D/Scene/Layer";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import PlayerController from "../Player/PlayerController";
import Emitter from "../../Wolfie2D/Events/Emitter";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { HW3Events } from "../HW3Events";
import Input from "../../Wolfie2D/Input/Input";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Color from "../../Wolfie2D/Utils/Color";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Level1 from "./Level1";
import Level3 from "./Level3";
import Game from "../../Wolfie2D/Loop/Game";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { HW3Controls } from "../HW3Controls";
import Level4 from "./Level4";

export const Level2Events = {
    //Facing F
    MICROWAVE: "MICROWAVE",
    MICROWAVEHIDE: "MICROWAVEHIDE",
    DOORHAND: "DOORHAND",
    DOORHANDHIDE: "DOORHANDHIDE",
    //Facing L

    //Facing R

    //Facing B
    CLOCK: "CLOCK",
    CLOCKHIDE: "CLOCKHIDE",
    BOILER: "BOILER",
    BOILERHIDE: "BOILERHIDE",
    REFRIGERATOR: "REFRIGERATOR",
    REFRIGERATORHIDE: "REFRIGERATORHIDE",
    PLANT: "PLANT",
    PLANTHIDE: "PLANTHIDE",
    WATER_PLANT: "WATER_PLANT",
    IGNORE_PLANT: "IGNORE_PLANT",
} as const;
/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level2 extends HW3Level {

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level2_assets/Level_2.json";

    public static readonly MICROWAVE_KEY = "MICROWAVE";
    public static readonly MICROWAVE_PATH = "Level2_assets/F_microwave.png";

    public static readonly CLOCK_KEY = "CLOCK";
    public static readonly CLOCK_PATH = "Level2_assets/Clock.png"

    



    protected background: Layer;
    public ui: Layer;
    public bg: HW3AnimatedSprite;
    public primary: Sprite;
    public clock2: Sprite;
    public key: Sprite;
    public dialogue: Rect;
    public line1: Label;
    public line2: Label;
    public drawer1: Sprite;
    public drawer2: Sprite;
    public sign1: Sprite;
    public sign2: Sprite;

    //facingF
    public microwave: Sprite;
    public doorhand: Sprite;

    //facingB
    public clock: Sprite;
    public waterButton: Button;
    public ignoreButton: Button;

    protected emitter: Emitter;
    public hasId: Boolean = false;
    public hasKey: Boolean = false;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        this.emitter = new Emitter();
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        this.load.spritesheet(Level2.BACKGROUND_KEY, Level2.BACKGROUND_PATH);
        this.load.image(Level2.MICROWAVE_KEY, Level2.MICROWAVE_PATH);
        this.load.image(Level2.CLOCK_KEY, Level2.CLOCK_PATH);
    }

    /**
     * Unload resources for level 1 - decide what to keep
     */
    public unloadScene(): void {
        /*
        this.load.keepAudio(this.levelMusicKey);
        this.load.keepAudio(this.jumpAudioKey);
        this.load.keepAudio(this.tileDestroyedAudioKey);
        */
        this.load.keepSpritesheet(Level1.LEFT_KEY);
        this.load.keepSpritesheet(Level1.RIGHT_KEY);
    }

    public startScene(): void {
        this.emitter.fireEvent(LevelEvents.LEVEL_2);
        //Subscribe to event
        //FF
        this.receiver.subscribe(Level2Events.MICROWAVE);
        this.receiver.subscribe(Level2Events.MICROWAVEHIDE);
        this.receiver.subscribe(Level2Events.DOORHAND);
        this.receiver.subscribe(Level2Events.DOORHANDHIDE);
        
        //FL
        
        //FR
        
        //FB
        this.receiver.subscribe(Level2Events.CLOCK);
        this.receiver.subscribe(Level2Events.CLOCKHIDE);
        this.receiver.subscribe(Level2Events.BOILER);
        this.receiver.subscribe(Level2Events.BOILERHIDE);
        this.receiver.subscribe(Level2Events.PLANT);
        this.receiver.subscribe(Level2Events.PLANTHIDE);
        this.receiver.subscribe(Level2Events.REFRIGERATOR);
        this.receiver.subscribe(Level2Events.REFRIGERATORHIDE);
        this.receiver.subscribe(Level2Events.WATER_PLANT);
        this.receiver.subscribe(Level2Events.IGNORE_PLANT);





        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level2.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        this.nextLevel = Level3;

        //this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END);
    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            //FF
            case Level2Events.MICROWAVE: {
                this.handleMicrowavePress(event);
                break;
            }
            case Level2Events.MICROWAVEHIDE: {
                this.handleMicrowaveHide(event);
                break;
            }
            case Level2Events.DOORHAND: {
                this.handleDoorHand(event);
                break;
            }
            case Level2Events.DOORHANDHIDE: {
                this.handleDoorHandHide(event);
                break;
            }

            //FL

            //FR

            //FB
            case Level2Events.CLOCK: {
                this.handleClock(event);
                break;
            }
            case Level2Events.CLOCKHIDE: {
                this.handleClockHide(event);
                break;
            }
            case Level2Events.BOILER: {
                this.handleBoiler(event);
                break;
            }
            case Level2Events.BOILERHIDE: {
                this.handleBoilerHide(event);
                break;
            }
            case Level2Events.PLANT: {
                this.handlePlant(event);
                break;
            }
            case Level2Events.PLANTHIDE: {
                this.handlePlantHide(event);
                break;
            }
            // case Level2Events.REFRIGERATOR: {
            //     this.handleRefrigerator(event);
            //     break;
            // }
            // case Level2Events.REFRIGERATORHIDE: {
            //     this.handleRefrigeratorHide(event);
            //     break;
            // }

            case Level2Events.WATER_PLANT: {
                this.handleWaterPlant(event);
                break;
            }
            case Level2Events.IGNORE_PLANT: {
                this.handleIgnorePlant(event);
                break;
            }
            



            case HW3Events.LEVEL_START: {
                Input.enableInput();
                break;
            }
            case HW3Events.PLAYER_ENTERED_LEVEL_END: {
                super.handleEnteredLevelEnd();
                break;
            }
            case HW3Events.LEVEL_END: {
                this.sceneManager.changeToScene(this.nextLevel);
                break;
            }
            // Default: Throw an error! No unhandled events allowed.
            default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
        }
    }

    public updateScene(deltaT: number): void {
        super.updateScene(deltaT);
        if(Input.isJustPressed(HW3Controls.LEVEL_1,)) {
            this.sceneManager.changeToScene(Level1);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_2,)) {
            this.sceneManager.changeToScene(Level2);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_3,)) {
            this.sceneManager.changeToScene(Level3);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_4,)) {
            this.sceneManager.changeToScene(Level4);
        }
    }


    protected initializeViewport(): void {
        super.initializeViewport();
        this.viewport.setBounds(16, 16, 496, 512);
    }

    protected initializeUserInterface(): void {
        //Put all images here
        this.dialogue = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.PRIMARY, { position: new Vec2(400, 500), size: new Vec2(1000, 100) });
        this.dialogue.scale = new Vec2(0.5, 0.5);
        this.dialogue.color = new Color(0, 0, 0, 0.5);
        this.dialogue.visible = false;    

        this.microwave = this.add.sprite(Level2.MICROWAVE_KEY, HW3Layers.PRIMARY);
        // this.microwave.position.set(350, 380);
        this.microwave.position.set(600, 800);

        this.microwave.scale = new Vec2(0.1, 0.1);
        this.microwave.visible = false;

        this.clock = this.add.sprite(Level2.CLOCK_KEY, HW3Layers.PRIMARY);
        this.clock.position.set(350, 380);
        this.clock.scale = new Vec2(0.1, 0.1);
        this.clock.visible = false;

        

        

        
        
    }

    //Handle show dialogue with sprites
    protected handleClock(event: GameEvent): void {
        if(!this.clock.visible) {
            this.clock.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "ops! no battery. It stucks in 12:22";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 50;
            this.line1.visible = true;
        }
    }

    protected handleClockHide(event: GameEvent): void {
        if(this.clock.visible) {
            this.clock.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    //Handle show general dialogue boxes --> no images required
    protected handleMicrowavePress(event: GameEvent): void {
        if(!this.microwave.visible) {
            this.microwave.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "It is locked... and smell something bad";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    
    }
    protected handleMicrowaveHide(event: GameEvent): void {
        if(this.microwave.visible) {
            this.microwave.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
        
    }

    protected handleDoorHand(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const passcode = prompt("Enter the 4 magic digits to get out of here.");
            if (passcode === "1222") {
                const text1 = "You are Correct! heading to the Office Room.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
                this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END);
                // You can add any additional logic here for what happens when the correct passcode is entered
            } else {
                const text1 = "Beep, this is not the 4 magic digits. Hint: Clock";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
            }
    }
    }

    protected handleDoorHandHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handleBoiler(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "The water is still warm...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }

    protected handleBoilerHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handlePlant(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "The plant seems to be healthy";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handlePlantHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handleWaterPlant(event: GameEvent): void {
        alert("Water!!!");
    }
    
    protected handleIgnorePlant(event: GameEvent): void {
        alert("Ignored...");
    }
    
    
    
    
    

    

}