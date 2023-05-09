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
import Level4 from "./Level4";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Level6 from "./Level6";

export const Level5Events = {
    DIALOGUEHIDE: "DIALOGUEHIDE",
    //Facing F
    DOOR: "DOOR",
    LIGHT: "LIGHT",
    PUDDLE: "PUDDLE",
    //Facing L
    PLIERS: "PLIERS",
    PLIERSHIDE: "PLIERSHIDE",
    KEY: "KEY",
    KEYHIDE: "KEYHIDE",
    WARNING: "WARNING",
    WARNINGHIDE: "WARNINGHIDE",

    //Facing R
    WIRES: "WIRES",
    WIRESHIDE: "WIRESHIDE",
    SPEAKER: "SPEAKER",
    PIPE: "PIPE",

    //Facing B
    ELEVATOR: "ELEVATOR",
    
} as const;

export default class Level5 extends HW3Level {

    public static readonly MUSIC_KEY = "LEVEL_5_MUSIC";
    public static readonly MUSIC_PATH = "Level5_assets/music/Level_5.wav";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level5_assets/Level_5.json";

    public static readonly PLIERS_KEY = "BACKGROUND";
    public static readonly PLIERS_PATH = "Level5_assets/Pliers.png";

    public static readonly KEY_KEY = "KEY_KEY";
    public static readonly KEY_PATH = "Level5_assets/Key.png";

    public static readonly WIRES_KEY = "WIRES_KEY";
    public static readonly WIRES_PATH = "Level5_assets/Broken_Wires.png";

    public static readonly WARNING_KEY = "WARNING";
    public static readonly WARNING_PATH = "Level5_assets/Warning.png";

    protected background: Layer;
    public ui: Layer;
    public bg: HW3AnimatedSprite;
    public dialogue: Rect;
    public narration: Rect;
    public line1: Label;
    public line2: Label;

    //Sprites
    protected pliers: Sprite;
    protected key: Sprite;
    protected wires: Sprite;
    protected warning: Sprite;

    //Check Booleans
    protected hasPliers: Boolean = false;
    protected hasKey: Boolean = false;
    protected checkedWires: Boolean = false;
    protected powerUp: Boolean = false;
    protected canLeave: Boolean = false;
    protected canProgress: Boolean = false; //Has key and checked the door

    protected emitter: Emitter;
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        this.emitter = new Emitter();
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        this.load.spritesheet(Level5.BACKGROUND_KEY, Level5.BACKGROUND_PATH);
        this.load.audio(Level5.MUSIC_KEY, Level5.MUSIC_PATH);
        this.load.image(Level5.PLIERS_KEY, Level5.PLIERS_PATH);
        this.load.image(Level5.KEY_KEY,Level5.KEY_PATH);
        this.load.image(Level5.WARNING_KEY, Level5.WARNING_PATH);
        this.load.image(Level5.WIRES_KEY, Level5.WIRES_PATH);
    }

    /**
     * Unload resources for level 1 - decide what to keep
     */
    public unloadScene(): void {

    }

    public startScene(): void {
        this.emitter.fireEvent(LevelEvents.LEVEL_5);
        //Subscribe to event
        this.receiver.subscribe(Level5Events.DIALOGUEHIDE);
        //FF
        this.receiver.subscribe(Level5Events.DOOR);
        this.receiver.subscribe(Level5Events.LIGHT);
        this.receiver.subscribe(Level5Events.PUDDLE);
        
        //FL
        this.receiver.subscribe(Level5Events.PLIERS);
        this.receiver.subscribe(Level5Events.PLIERSHIDE);
        this.receiver.subscribe(Level5Events.KEY);
        this.receiver.subscribe(Level5Events.KEYHIDE);
        this.receiver.subscribe(Level5Events.WARNING);
        this.receiver.subscribe(Level5Events.WARNINGHIDE);
        //FR
        this.receiver.subscribe(Level5Events.WIRES);
        this.receiver.subscribe(Level5Events.WIRESHIDE);
        this.receiver.subscribe(Level5Events.SPEAKER);
        this.receiver.subscribe(Level5Events.PIPE);

        //FB
        this.receiver.subscribe(Level5Events.ELEVATOR);

        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level5.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        this.nextLevel = Level6;

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: Level5.MUSIC_KEY, loop: true, holdReference: true});
    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            case Level5Events.DIALOGUEHIDE: {
                this.handleDialogueHide(event);
                break;
            }
            //FF
            case Level5Events.DOOR: {
                this.handleDoor(event);
                break;
            }
            case Level5Events.LIGHT: {
                this.handleLight(event);
                break;
            }
            case Level5Events.PUDDLE: {
                this.handlePuddle(event);
                break;
            }
            //FL
            case Level5Events.PLIERS: {
                this.handlePliers(event);
                break;
            }
            case Level5Events.PLIERSHIDE: {
                this.handlePliersHide(event);
                break;
            }
            case Level5Events.KEY: {
                this.handleKey(event);
                break;
            }
            case Level5Events.KEYHIDE: {
                this.handleKeyHide(event);
                break;
            }
            case Level5Events.WARNING: {
                this.handleWarning(event);
                break;
            }
            case Level5Events.WARNINGHIDE: {
                this.handleWarningHide(event);
                break;
            }

            //FR
            case Level5Events.WIRES: {
                this.handleWires(event);
                break;
            }
            case Level5Events.WIRESHIDE: {
                this.handleWiresHide(event);
                break;
            }
            case Level5Events.SPEAKER: {
                this.handleSpeaker(event);
                break;
            }
            case Level5Events.PIPE: {
                this.handlePipe(event);
                break;
            }

            //FB
            case Level5Events.ELEVATOR: {
                this.handleElevator(event);
                break;
            }


            case HW3Events.LEVEL_START: {
                Input.enableInput();
                this.handleLevelStart(event);
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
        if(Input.isJustPressed(HW3Controls.LEVEL_1)) {
            this.sceneManager.changeToScene(Level1);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_2)) {
            this.sceneManager.changeToScene(Level2);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_3)) {
            this.sceneManager.changeToScene(Level3);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_4)) {
            this.sceneManager.changeToScene(Level4);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_5)) {
            this.sceneManager.changeToScene(Level5);
        }
        else if(Input.isJustPressed(HW3Controls.LEVEL_6)) {
            this.sceneManager.changeToScene(Level6);
        }
        if(Input.isMouseJustPressed(0)) {
            this.narration.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
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

        this.narration = <Rect>this.add.graphic(GraphicType.RECT, HW3Layers.PRIMARY, { position: new Vec2(400, 500), size: new Vec2(1000, 100) });
        this.narration.scale = new Vec2(0.5, 0.5);
        this.narration.color = new Color(0, 0, 0, 0.5);
        this.narration.visible = false;   

        this.wires = this.add.sprite(Level5.WIRES_KEY, HW3Layers.PRIMARY);
        this.wires.position.set(350, 380);
        this.wires.scale = new Vec2(0.15, 0.15);
        this.wires.visible = false;
        
        this.warning = this.add.sprite(Level5.WARNING_KEY, HW3Layers.PRIMARY);
        this.warning.position.set(350, 380);
        this.warning.scale = new Vec2(0.125, 0.125);
        this.warning.visible = false;

        this.key = this.add.sprite(Level5.KEY_KEY, HW3Layers.PRIMARY);
        this.key.position.set(350, 380);
        this.key.scale = new Vec2(0.35, 0.35);
        this.key.visible = false;

        this.pliers = this.add.sprite(Level5.PLIERS_KEY, HW3Layers.PRIMARY);
        this.pliers.position.set(350, 380);
        this.pliers.scale = new Vec2(0.325, 0.325);
        this.pliers.visible = false;
    }

    protected handleLevelStart(event: GameEvent): void {
        this.narration.visible = true;

        const text1 = "I just climbed myself out of the nearest elevator door, but I";
        const text2 = "don't know where I am. Is this the boiler room?";
        this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
        this.line1.textColor = Color.WHITE;
        this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
        this.line2.textColor = Color.WHITE;
        this.line1.visible = true;
        this.line2.visible = true;
    }

    //Handle show dialogue with sprites
    protected handlePliers(event: GameEvent): void {
        if(!this.hasPliers) {
            this.dialogue.visible = true;
            this.pliers.visible = true;
            
            const text1 = "Wh-! Who keeps dropping their useful items in the";
            const text2 = "strangest of places?";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line1.visible = true;
            this.line2.visible = true;
        }
    }
    protected handlePliersHide(event: GameEvent): void {
        this.dialogue.visible = false;
        this.line1.visible = false;
        this.line2.visible = false;
        this.pliers.visible = false;
        this.hasPliers = true;
    }

    protected handleKey(event: GameEvent): void {
        if(!this.hasKey) {
            this.dialogue.visible = true;
            this.key.visible = true;
            
            const text1 = "A key? Stuck in the cracks of the wall? What";
            const text2 = "a weird place to hide one's keys...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line1.visible = true;
            this.line2.visible = true;
        }
    }
    protected handleKeyHide(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
            this.key.visible = false;
            this.hasKey = true;
        }
    }

    protected handleWarning(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            this.warning.visible = true;
            
            const text1 = "Hm...these warnings seem pretty serious...I";
            const text2 = "should probably follow them for my own safety.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line1.visible = true;
            this.line2.visible = true;
        }
    }
    protected handleWarningHide(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
            this.warning.visible = false;
        }
    }

    protected handleWires(event: GameEvent): void {
        if(!this.dialogue.visible) {
            if(!this.checkedWires) {
                this.dialogue.visible = true;
                this.wires.visible = true;
                
                const text1 = "I'm not an electrician, but those wires are clearly disconnected.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 26;
                this.line1.visible = true;
                this.checkedWires = true;
            }
            else if(this.hasPliers && this.checkedWires && !this.powerUp){
                this.dialogue.visible = true;
                this.wires.visible = true;

                const text1 = "Right! I'll use these insulated pliers to connect these wires.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 26;
                this.line1.visible = true;
                this.powerUp = true;
            }
            else if(this.powerUp) {
                this.dialogue.visible = true;

                const text1 = "The power's up and running now. I wonder what works now?";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 30;
                this.line1.visible = true;
            }
            else {
                this.dialogue.visible = true;
                this.wires.visible = true;

                const text1 = "Should I really mess with these wires?";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 26;
                this.line1.visible = true;
            }
        }
    }
    protected handleWiresHide(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
            this.wires.visible = false;
        }
    }

    //Handle show dialogue w/o sprites
    protected handleDialogueHide(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
        }
    }

    protected handleLight(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            const text1 = "The light's flickering.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handlePuddle(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            const text1 = "I wasn't assigned to this floor, so there's no way I'm cleaning that.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }

    protected handleSpeaker(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            const text1 = "It's an old speaker. The only sound coming from it is static.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }

    protected handlePipe(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            const text1 = "I'm not a repairman, so I'm definitely not fixing what happened there.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }

    protected handleDoor(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            if(!this.hasKey) {
                const text1 = "The door's locked. Typical. But it looks like it needs a";
                const text2 = "physical key rather than a key card this time.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
                this.line2.textColor = Color.WHITE;
                this.line1.visible = true;
                this.line2.visible = true;
            }
            else if(this.hasKey && this.canProgress) {
                const text1 = "Who cares! I wanna see what lies behind this door...";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
                this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END);
            }
            else {
                const text1 = "The key I found fits into the lock here perfectly!";
                const text2 = "Do I really want to go into this room, though?";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
                this.line2.textColor = Color.WHITE;
                this.line1.visible = true;
                this.line2.visible = true;
                this.canProgress = true;
            }
        }
    }
    
    protected handleElevator(event: GameEvent): void {
        if(!this.dialogue.visible) {
            this.dialogue.visible = true;
            if(!this.powerUp) {
                const text1 = "The elevator's still not working. Seems like";
                const text2 = "there's something wrong with the electricity.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
                this.line2.textColor = Color.WHITE;
                this.line1.visible = true;
                this.line2.visible = true;
            }
            else if(this.powerUp && !this.canLeave){
                const text1 = "The elevator's working now! I can use this to";
                const text2 = "leave if I want to!";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 465), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text2});
                this.line2.textColor = Color.WHITE;
                this.line1.visible = true;
                this.line2.visible = true;
                this.canLeave = true;
            }
            else if(this.powerUp && this.canLeave) {
                this.nextLevel = MainMenu;
            
                const text1 = "Yeah, I'm outta here. This place gives me the creeps!";
                const text2 = "I'm gonna find a new job somewhere else!";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 465), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text2});
                this.line2.textColor = Color.WHITE;
                this.line1.visible = true;
                this.line2.visible = true;

                this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END);
                location.reload();
            }
        }
    }

}