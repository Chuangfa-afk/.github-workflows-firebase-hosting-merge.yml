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
import Level4 from "./Level4";
import Level5 from "./Level5";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";

export const Level6Events = {
    //Facing F
    CLOCK1: "CLOCK1",
    LOCKEDCABINET: "LOCKEDCABINET",
    LOCKEDCABINETHIDE: "LOCKEDCABINETHIDE",
    WINDOW: "WINDOW",
    STAIRCASE: "STAIRCASE",
    DATABOARD: "DATABOARD",
    //Facing L
    BEAKER: "BEAKER",
    BEAKER1: "BEAKER1",
    BEAKER2: "BEAKER2",
    BEAKER3: "BEAKER3",
    BEAKER4: "BEAKER4",
    BEAKER5: "BEAKER5",
    NEWTONSCRADLE: "NEWTONSCRADLE", 
    TROPHY: "TROPHY",
    //Facing R
    BOARD1: "BOARD1",
    BOARD1HIDE: "BOARD1HIDE",
    BOARD2: "BOARD2",
    BOARD2HIDE: "BOARD2HIDE",
    REDBUTTON: "REDBUTTON",
    //Facing B
    CLOCK2: "CLOCK2",
    NOTE1: "NOTE1",
    NOTE1HIDE: "NOTE1HIDE",
    ENTRANCEDOOR: "ENTRANCE DOOR",
    
} as const;

export default class Level6 extends HW3Level {

    public static readonly MUSIC_KEY = "LEVEL_6_MUSIC";
    public static readonly MUSIC_PATH = "Level6_assets/music/Level_6.wav";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level6_assets/Level_6.json";

    public static readonly BEAKER_KEY = "Beaker";
    public static readonly BEAKER_PATH = "Level6_assets/Beaker.png";

    public static readonly BOARD1_KEY = "BOARD1";
    public static readonly BOARD1_PATH = "Level6_assets/Board1.png";

    public static readonly BOARD2_KEY = "BOARD2";
    public static readonly BOARD2_PATH = "Level6_assets/Board2/.png";

    public static readonly NOTE1_KEY = "NOTE1";
    public static readonly NOTE1_PATH = "Level6_assets/Note1.png";

    public static readonly CLOCKCABINET_KEY = "CLOCKCABINET";
    public static readonly CLOCKCABINET_PATH = "Level6_assets/ClockCabinet.png";

    protected background: Layer;
    public ui: Layer;
    public bg: HW3AnimatedSprite;
    public primary: Sprite;
    public clock2: Sprite;
    public key: Sprite;
    public dialogue: Rect;
    public narration: Rect;
    public line1: Label;
    public line2: Label;
    public drawer1: Sprite;
    public drawer2: Sprite;
    public sign1: Sprite;
    public sign2: Sprite;

    //FacingF
    public sign: Sprite;
    public hammer: Sprite;
    public stocks: Sprite;
    public note: Sprite;
    public goodjob: Sprite;

    protected emitter: Emitter;
    public hasId: Boolean = false;
    public hasKey: Boolean = false;
    public hasHammer: Boolean = false;
    public hasNote: Boolean = false;
    protected checkedRailing: Boolean = false;
    protected hasRailing: Boolean = false;
    protected checkedLadder: Boolean = false;
    protected checkedTrapdoor: Boolean = false;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        this.emitter = new Emitter();
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        this.load.spritesheet(Level6.BACKGROUND_KEY, Level6.BACKGROUND_PATH);
        this.load.audio(Level6.MUSIC_KEY, Level6.MUSIC_PATH);
        this.load.image(Level6.BEAKER_KEY, Level6.BEAKER_PATH);
        this.load.image(Level6.BOARD1_KEY, Level6.BOARD1_PATH);
        this.load.image(Level6.BOARD2_KEY, Level6.BOARD2_PATH);
        this.load.image(Level6.NOTE1_KEY, Level6.NOTE1_PATH);
        this.load.image(Level6.CLOCKCABINET_KEY, Level6.CLOCKCABINET_PATH);
    }

    /**
     * Unload resources for level 1 - decide what to keep
     */
    public unloadScene(): void {
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: Level6.MUSIC_KEY});
    }

    public startScene(): void {
        this.emitter.fireEvent(LevelEvents.LEVEL_6);
        //Subscribe to event
        //FF
        this.receiver.subscribe(Level6Events.CLOCK1);
        this.receiver.subscribe(Level6Events.WINDOW);
        this.receiver.subscribe(Level6Events.STAIRCASE);
        this.receiver.subscribe(Level6Events.LOCKEDCABINET);
        this.receiver.subscribe(Level6Events.LOCKEDCABINETHIDE);

        //FL
        this.receiver.subscribe(Level6Events.BEAKER);
        this.receiver.subscribe(Level6Events.BEAKER1);
        this.receiver.subscribe(Level6Events.BEAKER2);
        this.receiver.subscribe(Level6Events.BEAKER3);
        this.receiver.subscribe(Level6Events.BEAKER4);
        this.receiver.subscribe(Level6Events.BEAKER5);
        this.receiver.subscribe(Level6Events.NEWTONSCRADLE);
        this.receiver.subscribe(Level6Events.TROPHY);
        this.receiver.subscribe(Level6Events.DATABOARD);
        
        //FR
        this.receiver.subscribe(Level6Events.BOARD1);
        this.receiver.subscribe(Level6Events.BOARD1HIDE);
        this.receiver.subscribe(Level6Events.BOARD2);
        this.receiver.subscribe(Level6Events.BOARD2HIDE);
        this.receiver.subscribe(Level6Events.REDBUTTON);

        //FB
        this.receiver.subscribe(Level6Events.NOTE1);
        this.receiver.subscribe(Level6Events.NOTE1HIDE);
        this.receiver.subscribe(Level6Events.CLOCK2);
        this.receiver.subscribe(Level6Events.ENTRANCEDOOR);

        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level6.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        this.nextLevel = Level5;
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: Level6.MUSIC_KEY, loop: true, holdReference: true});

    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            //FF
            case Level6Events.CLOCK1: {
                this.handleClock1(event);
                break;
            }
            case Level6Events.WINDOW: {
                this.handleWindow(event);
                break;
            }
            case Level6Events.STAIRCASE: {
                this.handleStaircase(event);
                break;
            }
            case Level6Events.LOCKEDCABINET: {
                this.handleLockedCabinet(event);
                break;
            }
            case Level6Events.LOCKEDCABINETHIDE: {
                this.handleLockedCabinetHide(event);
                break;
            }
            
            //FL
            case Level6Events.BEAKER: {
                this.handleBeaker(event);
                break;
            }
            case Level6Events.BEAKER1: {
                this.handleBeaker1(event);
                break;
            }
            case Level6Events.BEAKER2: {
                this.handleBeaker2(event);
                break;
            }
            case Level6Events.BEAKER3: {
                this.handleBeaker3(event);
                break;
            }
            case Level6Events.BEAKER4: {
                this.handleBeaker4(event);
                break;
            }
            case Level6Events.BEAKER5: {
                this.handleBeaker5(event);
                break;
            }
            case Level6Events.NEWTONSCRADLE: {
                this.handlenewtonsCradle(event);
                break;
            }
            case Level6Events.TROPHY: {
                this.handleTrophy(event);
                break;
            }
            case Level6Events.DATABOARD: {
                this.handleDataboard(event);
                break;
            }

            //FR
            case Level6Events.BOARD1: {
                this.handleBoard1(event);
                break;
            }
            case Level6Events.BOARD1HIDE: {
                this.handleBoard1Hide(event);
                break;
            }
            case Level6Events.BOARD2: {
                this.handleBoard2(event);
                break;
            }
            case Level6Events.BOARD2HIDE: {
                this.handleBoard2Hide(event);
                break;
            }
            case Level6Events.REDBUTTON: {
                this.handleRedButton(event);
                break;
            }

            //FB
            case Level6Events.NOTE1: {
                this.handleNote1(event);
                break;
            }
            case Level6Events.NOTE1HIDE: {
                this.handleNote1Hide(event);
                break;
            }
            case Level6Events.CLOCK2: {
                this.handleClock2(event);
                break;
            }
            case Level6Events.ENTRANCEDOOR: {
                this.handleEntranceDoor(event);
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
        else if(Input.isJustPressed(HW3Controls.LEVEL_5)) {
            this.sceneManager.changeToScene(Level5);
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

        this.sign = this.add.sprite(Level6.SIGN_KEY, HW3Layers.PRIMARY);
        this.sign.position.set(350, 380);
        this.sign.scale = new Vec2(0.3, 0.3);
        this.sign.visible = false;

        this.hammer = this.add.sprite(Level6.HAMMER_KEY, HW3Layers.PRIMARY);
        this.hammer.position.set(350, 380);
        this.hammer.scale = new Vec2(0.2, 0.2);
        this.hammer.visible = false;

        this.goodjob = this.add.sprite(Level6.GOODJOB_KEY, HW3Layers.PRIMARY);
        this.goodjob.position.set(350, 380);
        this.goodjob.scale = new Vec2(0.2, 0.2);
        this.goodjob.visible = false;
        
        this.stocks = this.add.sprite(Level6.STOCKS_KEY, HW3Layers.PRIMARY);
        this.stocks.position.set(350, 380);
        this.stocks.scale = new Vec2(0.11, 0.11);
        this.stocks.visible = false;
        
        this.note = this.add.sprite(Level6.NOTE_KEY, HW3Layers.PRIMARY);
        this.note.position.set(350, 380);
        this.note.scale = new Vec2(0.11, 0.11);
        this.note.visible = false;
    }

    protected handleLevelStart(event: GameEvent): void {
        this.narration.visible = true;

        const text1 = "The elevator just stopped! Tsk. Just my luck.";
        const text2 = "Maybe there's something around here that can help me get out...";
        this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
        this.line1.textColor = Color.WHITE;
        this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
        this.line2.textColor = Color.WHITE;
        this.line1.visible = true;
        this.line2.visible = true;
    }

    //Handle show general dialogue boxes --> no images required
    protected handleElevator(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "It doesn't look like the elevator's gonna open any time soon.";
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
            const text1 = "None of the buttons are working--yeah, the elevator's shot.";
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
            const text1 = "It's one of those phones they install inside elevators!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;

            const text2 = "Unfortunately, it's not working since the power's really intermittent.";
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

    protected handleRailing(event: GameEvent): void {
        if(!this.hasHammer) {
            this.dialogue.visible = true;
            const text1 = "I think I can knock down this railing with a tool of some sort...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 30;
            this.line1.visible = true;
            this.checkedRailing = true;
        }
        else if(this.hasHammer) {
            this.dialogue.visible = true;
            const text1 = "That's it! I can use this hammer to pry off this railing!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 24;
            this.line1.visible = true;
            this.hasRailing = true;
        }
    }

    protected handleHideRailing(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }

    protected handleLadder(event: GameEvent): void {
        if(!this.dialogue.visible) {
            if(!this.checkedLadder) {
                this.dialogue.visible = true;
                const text1 = "A ladder! I can use this to climb up anywhere.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 36;
                this.line1.visible = true;
                this.checkedLadder = true;
            }
            else {
                this.dialogue.visible = true;
                const text1 = "This ladder's useful for climbing.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 36;
                this.line1.visible = true;
            }
        }
    }
    protected handleLadderHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
    //Handle show dialogue with sprites
    
    protected handleSign(event: GameEvent): void {
        if(!this.sign.visible) {
            this.sign.visible = true;
            this.dialogue.visible = true;
            
            const text1 = "Wait, this floor isn't anywhere on the floor directory...what's going on here?";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 30;
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

    protected handleHole(event: GameEvent): void {
        if(!this.note.visible && !this.hammer.visible) {
            if(!this.hasNote) {
                this.note.visible = true;
                this.dialogue.visible = true;

                const text1 = "Someone stuffed a note in here!";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 40;
                this.line1.visible = true;
                this.hasNote = true;
            }
            else if(this.hasNote && this.checkedRailing){
                if(!this.hasHammer){
                    this.hammer.visible = true;
                    this.dialogue.visible = true;
                    
                    const text1 = "There's also a hammer hidden in the cracks!";
                    const text2 = "Maybe it could be used to hit something down?";
                    this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                    this.line1.textColor = Color.WHITE;
                    this.line1.fontSize = 30;
                    this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
                    this.line2.textColor = Color.WHITE;
                    this.line1.visible = true;
                    this.line2.visible = true;
                    this.hasHammer = true;
                }
                else {
                    this.dialogue.visible = true;
                    
                    const text1 = "It doesn't look like there's anything else in here.";
                    this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                    this.line1.textColor = Color.WHITE;
                    this.line1.fontSize = 30;
                    this.line1.visible = true;
                }
            }
            else if(this.hasNote && !this.checkedRailing) {
                this.dialogue.visible = true;

                const text1 = "Is there something shiny there in the cracks?";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 30;
                this.line1.visible = true;
                this.hasNote = true;
            }
        }
    }

    protected handleHoleHide(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.hammer.visible = false;
            this.note.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
        }
    }

    protected handleStock(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            this.stocks.visible = true;
            const text1 = "I don't see how stocks will help me right now.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleStockHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.stocks.visible = false;
            this.dialogue.visible = false;
        }
    }

    protected handleTrapDoor(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            if (this.hasRailing && this.checkedTrapdoor && this.checkedLadder) {
                const text1 = "I'm out! I hope management doesn't sue me for property damage...";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
                this.goodjob.visible = true;
                this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END);
            } 
            else if(this.hasRailing && this.checkedLadder) {
                const text1 = "The trapdoor won't budge, but I think I can push it open with this railing pole!";
                const text2 = "Let me try hitting the trapdoor open!";
                this.checkedTrapdoor = true;

                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 24;
                this.line1.visible = true;

                this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
                this.line2.textColor = Color.WHITE;
                this.line2.fontSize = 24;
                this.line2.visible = true;
            }
            else if(!this.hasRailing && this.checkedLadder){
                const text1 = "It won't budge. Maybe if I had a rod or something that can bash it open...";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 24;
                this.line1.visible = true;
                this.checkedTrapdoor = true;
            }
            else {
                const text1 = "I can't reach whatever that is. Is there something here that can get me up there?";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 24;
                this.line1.visible = true;
            }
    }

    }
    protected handleTrapDoorHide(event: GameEvent): void {
        if (this.dialogue.visible) {
            this.line1.visible = false;
            this.dialogue.visible = false;
        }
    }
}