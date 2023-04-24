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
import MainMenu from "./MainMenu";
import { HW3Controls } from "../HW3Controls";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";

export const Level4Events = {
    //Facing F
    ELEVATOR: "ELEVATOR",
    ELEVATORHIDE: "ELEVATORHIDE",
    SIGN: "SIGN",
    SIGNHIDE: "SIGNHIDE",
    BUTTONS: "BUTTONS",
    BUTTONSHIDE: "BUTTONSHIDE",
    //Facing L

    //Facing R
    HELPSIGN: "HELPSIGN",
    HELPSIGNHIDE: "HELPSIGNHIDE",
    //Facing B
    HOLE: "HOLE",
    HOLEHIDE: "HOLEHIDE",
    
} as const;

export default class Level4 extends HW3Level {

    public static readonly MUSIC_KEY = "LEVEL_4_MUSIC";
    public static readonly MUSIC_PATH = "Level4_assets/music/Level_4.wav";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level4_assets/Level_4.json";

    public static readonly SIGN_KEY = "SIGN";
    public static readonly SIGN_PATH = "Level4_assets/sign.png";

    public static readonly HAMMER_KEY = "HAMMER";
    public static readonly HAMMER_PATH = "Level4_assets/hammer.png";

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

    //FacingF
    public sign: Sprite;
    public hammer: Sprite;

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
        this.load.spritesheet(Level4.BACKGROUND_KEY, Level4.BACKGROUND_PATH);
        this.load.audio(Level4.MUSIC_KEY, Level4.MUSIC_PATH);
        this.load.image(Level4.SIGN_KEY, Level4.SIGN_PATH);
        this.load.image(Level4.HAMMER_KEY, Level4.HAMMER_PATH);
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
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: Level4.MUSIC_KEY});

    }

    public startScene(): void {
        this.emitter.fireEvent(LevelEvents.LEVEL_4);
        //Subscribe to event
        //FF
        this.receiver.subscribe(Level4Events.BUTTONS);
        this.receiver.subscribe(Level4Events.BUTTONSHIDE);
        this.receiver.subscribe(Level4Events.SIGN);
        this.receiver.subscribe(Level4Events.SIGNHIDE);
        this.receiver.subscribe(Level4Events.ELEVATOR);
        this.receiver.subscribe(Level4Events.ELEVATORHIDE);
        //FL
        
        //FR
        this.receiver.subscribe(Level4Events.HELPSIGN);
        this.receiver.subscribe(Level4Events.HELPSIGNHIDE);
        //FB
        this.receiver.subscribe(Level4Events.HOLE);
        this.receiver.subscribe(Level4Events.HOLEHIDE);

        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level4.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        this.nextLevel = MainMenu;
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: Level4.MUSIC_KEY, loop: true, holdReference: true});

    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            //FF
            case Level4Events.BUTTONS: {
                this.handleButtons(event);
                break;
            }
            case Level4Events.BUTTONSHIDE: {
                this.handleButtonsHide(event);
                break;
            }
            case Level4Events.SIGN: {
                this.handleSign(event);
                break;
            }
            case Level4Events.SIGNHIDE: {
                this.handleSignHide(event);
                break;
            }
            case Level4Events.ELEVATOR: {
                this.handleElevator(event);
                break;
            }
            case Level4Events.ELEVATORHIDE: {
                this.handleElevatorHide(event);
                break;
            }
            
            //FL

            //FR
            case Level4Events.HELPSIGN: {
                this.handleHelpSign(event);
                break;
            }
            case Level4Events.HELPSIGNHIDE: {
                this.handleHelpSignHide(event);
                break;
            }
            //FB
            case Level4Events.HOLE: {
                this.handleHole(event);
                break;
            }
            case Level4Events.HOLEHIDE: {
                this.handleHoleHide(event);
                break;
            }


            //Facing Up (FU)
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

        this.sign = this.add.sprite(Level4.SIGN_KEY, HW3Layers.PRIMARY);
        this.sign.position.set(350, 380);
        this.sign.scale = new Vec2(0.2, 0.2);
        this.sign.visible = false;

        this.hammer = this.add.sprite(Level4.HAMMER_KEY, HW3Layers.PRIMARY);
        this.hammer.position.set(350, 380);
        this.hammer.scale = new Vec2(0.2, 0.2);
        this.hammer.visible = false;
        
        
    }

    //Handle show dialogue with sprites
    

    //Handle show general dialogue boxes --> no images required
    protected handleSign(event: GameEvent): void {
        if(!this.sign.visible) {
            this.sign.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "Warning Sign";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 50;
            this.line1.visible = true;
        }

    }
    protected handleSignHide(event: GameEvent): void {
        if(this.sign.visible) {
            this.sign.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handleElevator(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "You came from Here. And it's suddenly down :(";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleElevatorHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    protected handleButtons(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "It seems to be broken, not working";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }

    }
    protected handleButtonsHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    protected handleHelpSign(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "Try to look for Help? ";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;

            const text2 = "Hint: The possible directions to look at are not just left and right :)"
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 485), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line2.visible = true;
        }

    }
    protected handleHelpSignHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
            this.line2.visible = false;
        }
    }

    protected handleHole(event: GameEvent): void {
        if(!this.hammer.visible) {
            this.hammer.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "There is a hammer. Maybe could be break something";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 30;
            this.line1.visible = true;
        }
    }

    protected handleHoleHide(event: GameEvent): void {
        if(this.hammer.visible) {
            this.hammer.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    


}