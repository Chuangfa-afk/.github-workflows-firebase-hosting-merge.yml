import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level, { HW3Layers } from "./Level";
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
import Level2 from "./Level2";
import { LevelEvents } from "./Level";
import { HW3Controls } from "../HW3Controls";
import Level3 from "./Level3";
import Level4 from "./Level4";

export const Level1Events = {
    //Facing F
    CLOCK1: "CLOCK1",
    CLOCK1HIDE: "CLOCK1HIDE",
    KEYPAD: "KEYPAD",
    KEYPADHIDE: "KEYPADHIDE",
    ELEVATOR: "ELEVATOR",
    ELEVATORHIDE: "ELEVATORHIDE",
    //Facing L
    DRAWER: "DRAWER",
    DRAWERHIDE: "DRAWERHIDE",
    CHECKINSIGN: "CHECKINSIGN",
    CHECKINSIGNHIDE: "CHECKINSIGNHIDE",
    //Facing R
    CLOCK2: "CLOCK2",
    CLOCK2HIDE: "CLOCK2HIDE",
    PHONE: "PHONE",
    PHONEHIDE: "PHONEHIDE",
    KEY: "KEY",
    KEYHIDE: "KEYHIDE",
    //Facing B
    SIGN1: "SIGN1",
    SIGN1HIDE: "SIGN1HIDE",
    SIGN2: "SIGN2",
    SIGN2HIDE: "SIGN2HIDE",
    DOOR: "DOOR",
    DOORHIDE: "DOORHIDE", 
    
} as const;
/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level1 extends HW3Level {

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level1_assets/Level_1.json";

    public static LEFT_KEY: string = "LEFT";
    public static LEFT_PATH = "Level_assets/spritesheets/Left Button.json";

    public static RIGHT_KEY: string = "RIGHT";
    public static RIGHT_PATH = "Level_assets/spritesheets/Right Button.json";

    public static readonly CLOCK1_KEY = "CLOCK1";
    public static readonly CLOCK1_PATH = "Level1_assets/clock1.png";
    public static readonly CLOCK2_KEY = "CLOCK2";
    public static readonly CLOCK2_PATH = "Level1_assets/clock2.png";
    public static readonly KEY_KEY = "KEY";
    public static readonly KEY_PATH = "Level1_assets/Key_icon.png";

    public static readonly DRAWER1_KEY = "DRAWER1";
    public static readonly DRAWER1_PATH = "Level1_assets/drawer1.png";
    public static readonly DRAWER2_KEY = "DRAWER2";
    public static readonly DRAWER2_PATH = "Level1_assets/Drawer2.png";

    public static readonly SIGN1_KEY = "SIGN1";
    public static readonly SIGN1_PATH = "Level1_assets/sign1.png";
    public static readonly SIGN2_KEY = "SIGN2";
    public static readonly SIGN2_PATH = "Level1_assets/Sign2.png";

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
        this.load.spritesheet(Level1.BACKGROUND_KEY, Level1.BACKGROUND_PATH);
        this.load.spritesheet(Level1.LEFT_KEY, Level1.LEFT_PATH);
        this.load.spritesheet(Level1.RIGHT_KEY, Level1.RIGHT_PATH);
        this.load.image(Level1.CLOCK1_KEY, Level1.CLOCK1_PATH);
        this.load.image(Level1.CLOCK2_KEY, Level1.CLOCK2_PATH);
        this.load.image(Level1.KEY_KEY, Level1.KEY_PATH);
        this.load.image(Level1.DRAWER1_KEY, Level1.DRAWER1_PATH);
        this.load.image(Level1.DRAWER2_KEY, Level1.DRAWER2_PATH);
        this.load.image(Level1.SIGN1_KEY, Level1.SIGN1_PATH);
        this.load.image(Level1.SIGN2_KEY, Level1.SIGN2_PATH);
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
        this.emitter.fireEvent(LevelEvents.LEVEL_1);
        //Subscribe to event
        //FF
        this.receiver.subscribe(Level1Events.CLOCK1);
        this.receiver.subscribe(Level1Events.CLOCK1HIDE);
        this.receiver.subscribe(Level1Events.KEYPAD);
        this.receiver.subscribe(Level1Events.KEYPADHIDE);
        this.receiver.subscribe(Level1Events.ELEVATOR);
        this.receiver.subscribe(Level1Events.ELEVATORHIDE);
        //FL
        this.receiver.subscribe(Level1Events.DRAWER);
        this.receiver.subscribe(Level1Events.DRAWERHIDE);
        this.receiver.subscribe(Level1Events.CHECKINSIGN);
        this.receiver.subscribe(Level1Events.CHECKINSIGNHIDE);
        //FR
        this.receiver.subscribe(Level1Events.CLOCK2);
        this.receiver.subscribe(Level1Events.CLOCK2HIDE);
        this.receiver.subscribe(Level1Events.PHONE)
        this.receiver.subscribe(Level1Events.PHONEHIDE);
        this.receiver.subscribe(Level1Events.KEY);
        this.receiver.subscribe(Level1Events.KEYHIDE);
        //FB
        this.receiver.subscribe(Level1Events.SIGN1);
        this.receiver.subscribe(Level1Events.SIGN1HIDE);
        this.receiver.subscribe(Level1Events.SIGN2);
        this.receiver.subscribe(Level1Events.SIGN2HIDE);
        this.receiver.subscribe(Level1Events.DOOR);
        this.receiver.subscribe(Level1Events.DOORHIDE);

        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level1.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        // Set the next level to be Level2
        this.nextLevel = Level2;

        
    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            //FF
            case Level1Events.CLOCK1: {
                this.handleClock1Press(event);
                break;
            }
            case Level1Events.CLOCK1HIDE: {
                this.handleClock1Hide(event);
                break;
            }
            case Level1Events.KEYPAD: {
                this.handleKeypadPress(event);
                break;
            }
            case Level1Events.KEYPADHIDE: {
                this.handleKeypadHide(event);
                break;
            }
            case Level1Events.ELEVATOR: {
                this.handleElevatorPress(event);
                break;
            }
            case Level1Events.ELEVATORHIDE: {
                this.handleKeypadHide(event);
                break;
            }
            //FL
            case Level1Events.DRAWER: {
                this.handleDrawerPress(event);
                break;
            }
            case Level1Events.DRAWERHIDE: {
                this.handleDrawerHide(event);
                break;
            }
            case Level1Events.CHECKINSIGN: {
                this.handleCheckInSignPress(event);
                break;
            }
            case Level1Events.CHECKINSIGNHIDE: {
                this.handleKeypadHide(event);
                break;
            }
            //FR
            case Level1Events.CLOCK2: {
                this.handleClock2Press(event);
                break;
            }
            case Level1Events.CLOCK2HIDE: {
                this.handleClock2Hide(event);
                break;
            }
            
            case Level1Events.PHONE: {
                this.handlePhonePress(event);
                break;
            }
            case Level1Events.PHONEHIDE: {
                this.handleKeypadHide(event);
                break;
            }
            case Level1Events.KEY: {
                this.handlePlantPress(event);
                break;
            }
            case Level1Events.KEYHIDE: {
                this.handleKeyHide(event);
                break;
            }
            //FB
            case Level1Events.SIGN1: {
                this.handleSign1Press(event);
                break;
            }
            case Level1Events.SIGN1HIDE: {
                this.handleSign1Hide(event);
                break;
            }
            case Level1Events.SIGN2: {
                this.handleSign2Press(event);
                break;
            }
            case Level1Events.SIGN2HIDE: {
                this.handleSign2Hide(event);
                break;
            }
            case Level1Events.DOOR: {
                this.handleDoorPress(event);
                break;
            }
            case Level1Events.DOORHIDE: {
                this.handleKeypadHide(event);
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

    /**
     * I had to override this method to adjust the viewport for the first level. I screwed up 
     * when I was making the tilemap for the first level is what it boils down to.
     * 
     * - Peter
     */
    protected initializeViewport(): void {
        super.initializeViewport();
        this.viewport.setBounds(16, 16, 496, 512);
    }

    protected initializeUserInterface(): void {
        //Put all images here
        this.primary = this.add.sprite(Level1.CLOCK1_KEY, HW3Layers.PRIMARY);
        this.primary.position.set(350, 380);
        this.primary.scale = new Vec2(0.25, 0.25);
        this.primary.visible = false;

        this.clock2 = this.add.sprite(Level1.CLOCK2_KEY, HW3Layers.PRIMARY);
        this.clock2.position.set(350, 380);
        this.clock2.scale = new Vec2(0.25, 0.25);
        this.clock2.visible = false;

        this.dialogue = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.PRIMARY, { position: new Vec2(400, 500), size: new Vec2(1000, 100) });
        this.dialogue.scale = new Vec2(0.5, 0.5);
        this.dialogue.color = new Color(0, 0, 0, 0.5);
        this.dialogue.visible = false;    
        
        this.key = this.add.sprite(Level1.KEY_KEY, HW3Layers.PRIMARY);
        this.key.position.set(350, 380);
        this.key.scale = new Vec2(0.1, 0.1);
        this.key.visible = false;
        
        this.drawer1 = this.add.sprite(Level1.DRAWER1_KEY, HW3Layers.PRIMARY);
        this.drawer1.position.set(350, 380);
        this.drawer1.scale = new Vec2(0.25, 0.25);
        this.drawer1.visible = false;

        this.drawer2 = this.add.sprite(Level1.DRAWER2_KEY, HW3Layers.PRIMARY);
        this.drawer2.position.set(350, 380);
        this.drawer2.scale = new Vec2(0.25, 0.25);
        this.drawer2.visible = false;

        this.sign1 = this.add.sprite(Level1.SIGN1_KEY, HW3Layers.PRIMARY);
        this.sign1.position.set(350, 380);
        this.sign1.scale = new Vec2(0.25, 0.25);
        this.sign1.visible = false;

        this.sign2 = this.add.sprite(Level1.SIGN2_KEY, HW3Layers.PRIMARY);
        this.sign2.position.set(350, 380);
        this.sign2.scale = new Vec2(0.25, 0.25);
        this.sign2.visible = false;
    }

    //Show dialogue with sprites
    protected handleClock1Press(event: GameEvent): void {
        if(!this.primary.visible) {
            this.primary.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "It's just a clock.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleClock1Hide(event: GameEvent): void {
        if(this.primary.visible) {
            this.primary.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handleClock2Press(event: GameEvent): void {
        if(!this.clock2.visible) {
            this.clock2.visible = true;
            this.dialogue.visible = true;

            const text1 = "Oh, would you look at the time- I'm going to be late!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleClock2Hide(event: GameEvent): void {
        if(this.clock2.visible) {
            this.clock2.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }
    protected handlePlantPress(event: GameEvent): void {
        if(!this.key.visible) {
            this.key.visible = true;
            this.dialogue.visible = true;

            const text1 = "A key? Maybe there's something it can open around here...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;

            this.hasKey = true;
        }
    }
    protected handleKeyHide(event: GameEvent): void {
        if(this.key.visible) {
            this.key.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handleDrawerPress(event: GameEvent): void {
        if(!this.drawer1.visible && !this.hasKey) {
            this.drawer1.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "There's just a To-Do list that goes on and on about the plants.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if(!this.drawer2.visible && this.hasKey) {
            this.drawer2.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "The key I found opens this drawer!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
            const text2 = "And look! Someone's ID! I can use this to access the elevator.";
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line2.visible = true;

            this.hasId = true;
        }
    }
    protected handleDrawerHide(event: GameEvent): void {
        if(this.drawer1.visible) {
            this.drawer1.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
        else if(this.drawer2.visible) {
            this.drawer2.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
        }
    }
    protected handleSign1Press(event: GameEvent): void {
        if(!this.sign1.visible) {
            this.sign1.visible = true;
            this.dialogue.visible = true;

            const text1 = "Huh, the check-in desk is closed already. If only they were here to help.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleSign1Hide(event: GameEvent): void {
        if(this.sign1.visible) {
            this.sign1.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }
    protected handleSign2Press(event: GameEvent): void {
        if(!this.sign2.visible) {
            this.sign2.visible = true;
            this.dialogue.visible = true;

            const text1 = "So many rooms to clean.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleSign2Hide(event: GameEvent): void {
        if(this.sign2.visible) {
            this.sign2.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    //General dialogue boxes --> no images required
    protected handleKeypadPress(event: GameEvent): void {
        if(!this.dialogue.visible) {
            if(!this.hasId) {
                this.dialogue.visible = true;

                const text1 = "I don't have my ID on me. Maybe there's one lying around...";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
            }
            else {
                this.dialogue.visible = true;
                const text1 = "It worked! Now I can finally get to work.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
                this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END);
            }
        }
    }
    protected handlePhonePress(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            const text1 = "The phone's dead...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleCheckInSignPress(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;

            const text1 = "What a cheesy sign...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleDoorPress(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;

            const text1 = "I can't leave!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleKeypadHide(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handleElevatorPress(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;

            const text1 = "If I want to enter the elevator, I need to access the keypad.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }

}