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
    DIALOGUEHIDE: "DIALOGUEHIDE",
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
    BEAKERHIDE: "BEAKERHIDE",
    BEAKER1HIDE: "BEAKER1HIDE",
    BEAKER2HIDE: "BEAKER2HIDE",
    BEAKER3HIDE: "BEAKER3HIDE",
    BEAKER4HIDE: "BEAKER4HIDE",
    BEAKER5HIDE: "BEAKER5HIDE",
    NEWTONSCRADLE: "NEWTONSCRADLE", 
    TROPHY: "TROPHY",
    LOWERCABINETS: "LOWERCABINETS",
    LABSUPPLIES: "LABSUPPLIES",
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

    public static readonly BEAKERGREY_KEY = "BeakerGrey";
    public static readonly BEAKERGREY_PATH = "Level6_assets/BeakerGrey.png";

    public static readonly BEAKERBLUE_KEY = "BeakerBlue";
    public static readonly BEAKERBLUE_PATH = "Level6_assets/BeakerBlue.png";

    public static readonly BEAKERGREEN_KEY = "BeakerGreen";
    public static readonly BEAKERGREEN_PATH = "Level6_assets/BeakerGreen.png";

    public static readonly BEAKERORANGE_KEY = "BeakerOrange";
    public static readonly BEAKERORANGE_PATH = "Level6_assets/BeakerOrange.png";

    public static readonly BEAKERPURPLE_KEY = "BeakerPurple";
    public static readonly BEAKERPURPLE_PATH = "Level6_assets/BeakerPurple.png";

    public static readonly BEAKERRED_KEY = "BeakerRed";
    public static readonly BEAKERRED_PATH = "Level6_assets/BeakerRed.png";

    public static readonly BEAKERDARKBLUE_KEY = "BeakerDarkBlue";
    public static readonly BEAKERDARKBLUE_PATH = "Level6_assets/BeakerDarkBlue.png";

    public static readonly BEAKERDARKRED_KEY = "BeakerDarkRed";
    public static readonly BEAKERDARKRED_PATH = "Level6_assets/BeakerDarkRed.png";

    public static readonly BOARD1_KEY = "BOARD1";
    public static readonly BOARD1_PATH = "Level6_assets/Board1.png";

    public static readonly BOARD2_KEY = "BOARD2";
    public static readonly BOARD2_PATH = "Level6_assets/Board2.png";

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
    public lockedcabinet: Sprite;
    //FacingL
    public beaker: Sprite;
    public beakerGrey: Sprite;
    public beakerBlue: Sprite;
    public beakerGreen: Sprite;
    public beakerOrange: Sprite;
    public beakerPurple: Sprite;
    public beakerRed: Sprite;
    public beakerDarkBlue: Sprite;
    public beakerDarkRed: Sprite;
    //FacingR
    public board1: Sprite;
    public board2: Sprite;
    //FacingB
    public note1: Sprite;

    protected emitter: Emitter;
    public hasId: Boolean = false;
    protected hasCheckedStairs: Boolean = false;
    protected unlockedHatch: Boolean = false;
    protected openedCabinet: Boolean = false;
    protected hasBeaker: Boolean = false;
    protected hasBlueBeaker: Boolean = false;
    protected hasGreenBeaker: Boolean = false;
    protected hasOrangeBeaker: Boolean = false;
    protected hasPurpleBeaker: Boolean = false;
    protected hasRedBeaker: Boolean = false;
    protected hasDarkBlueBeaker: Boolean = false;
    protected hasDarkRedBeaker: Boolean = false;
    protected beakerButton: Boolean = false;

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
        this.load.image(Level6.BEAKERGREY_KEY, Level6.BEAKERGREY_PATH);
        this.load.image(Level6.BEAKERBLUE_KEY, Level6.BEAKERBLUE_PATH);
        this.load.image(Level6.BEAKERGREEN_KEY, Level6.BEAKERGREEN_PATH);
        this.load.image(Level6.BEAKERORANGE_KEY, Level6.BEAKERORANGE_PATH);
        this.load.image(Level6.BEAKERPURPLE_KEY, Level6.BEAKERPURPLE_PATH);
        this.load.image(Level6.BEAKERRED_KEY, Level6.BEAKERRED_PATH);
        this.load.image(Level6.BEAKERDARKBLUE_KEY, Level6.BEAKERDARKBLUE_PATH);
        this.load.image(Level6.BEAKERDARKRED_KEY, Level6.BEAKERDARKRED_PATH);
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
        this.receiver.subscribe(Level6Events.DIALOGUEHIDE);
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
        this.receiver.subscribe(Level6Events.BEAKERHIDE);
        this.receiver.subscribe(Level6Events.BEAKER1HIDE);
        this.receiver.subscribe(Level6Events.BEAKER2HIDE);
        this.receiver.subscribe(Level6Events.BEAKER3HIDE);
        this.receiver.subscribe(Level6Events.BEAKER4HIDE);
        this.receiver.subscribe(Level6Events.BEAKER5HIDE);
        this.receiver.subscribe(Level6Events.NEWTONSCRADLE);
        this.receiver.subscribe(Level6Events.TROPHY);
        this.receiver.subscribe(Level6Events.LOWERCABINETS);
        this.receiver.subscribe(Level6Events.LABSUPPLIES);
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
        this.nextLevel = MainMenu;
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: Level6.MUSIC_KEY, loop: true, holdReference: true});

    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            case Level6Events.DIALOGUEHIDE: {
                this.handleDialogueHide(event);
                break;
            }
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
            case Level6Events.BEAKERHIDE: {
                this.handleBeakerHide(event);
                break;
            }
            case Level6Events.BEAKER1HIDE: {
                this.handleBeakerHide(event);
                break;
            }
            case Level6Events.BEAKER2HIDE: {
                this.handleBeakerHide(event);
                break;
            }
            case Level6Events.BEAKER3HIDE: {
                this.handleBeakerHide(event);
                break;
            }
            case Level6Events.BEAKER4HIDE: {
                this.handleBeakerHide(event);
                break;
            }
            case Level6Events.BEAKER5HIDE: {
                this.handleBeakerHide(event);
                break;
            }
            case Level6Events.NEWTONSCRADLE: {
                this.handleNewtonsCradle(event);
                break;
            }
            case Level6Events.TROPHY: {
                this.handleTrophy(event);
                break;
            }
            case Level6Events.LOWERCABINETS: {
                this.handleLowerCabinets(event);
                break;
            }
            case Level6Events.LABSUPPLIES: {
                this.handleLabSupplies(event);
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
            /*case Level6Events.BOARD2: {
                this.handleBoard2(event);
                break;
            }
            case Level6Events.BOARD2HIDE: {
                this.handleBoard2Hide(event);
                break;
            }*/
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
                location.reload();
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

        this.lockedcabinet = this.add.sprite(Level6.CLOCKCABINET_KEY, HW3Layers.PRIMARY);
        this.lockedcabinet.position.set(350, 390);
        this.lockedcabinet.scale = new Vec2(0.3, 0.3);
        this.lockedcabinet.visible = false;

        this.board1 = this.add.sprite(Level6.BOARD1_KEY, HW3Layers.PRIMARY);
        this.board1.position.set(350, 380);
        this.board1.scale = new Vec2(0.4, 0.4);
        this.board1.visible = false;

        this.board2 = this.add.sprite(Level6.BOARD2_KEY, HW3Layers.PRIMARY);
        this.board2.position.set(350, 380);
        this.board2.scale = new Vec2(0.4, 0.4);
        this.board2.visible = false;
        
        this.note1 = this.add.sprite(Level6.NOTE1_KEY, HW3Layers.PRIMARY);
        this.note1.position.set(350, 380);
        this.note1.scale = new Vec2(0.25, 0.25);
        this.note1.visible = false;

        this.beaker = this.add.sprite(Level6.BEAKER_KEY, HW3Layers.PRIMARY);
        this.beaker.position.set(350, 380);
        this.beaker.scale = new Vec2(0.25, 0.25);
        this.beaker.visible = false;

        this.beakerGrey = this.add.sprite(Level6.BEAKERGREY_KEY, HW3Layers.PRIMARY);
        this.beakerGrey.position.set(350, 380);
        this.beakerGrey.scale = new Vec2(0.25, 0.25);
        this.beakerGrey.visible = false;

        this.beakerBlue = this.add.sprite(Level6.BEAKERBLUE_KEY, HW3Layers.PRIMARY);
        this.beakerBlue.position.set(350, 380);
        this.beakerBlue.scale = new Vec2(0.25, 0.25);
        this.beakerBlue.visible = false;

        this.beakerGreen = this.add.sprite(Level6.BEAKERGREEN_KEY, HW3Layers.PRIMARY);
        this.beakerGreen.position.set(350, 380);
        this.beakerGreen.scale = new Vec2(0.25, 0.25);
        this.beakerGreen.visible = false;

        this.beakerOrange = this.add.sprite(Level6.BEAKERORANGE_KEY, HW3Layers.PRIMARY);
        this.beakerOrange.position.set(350, 380);
        this.beakerOrange.scale = new Vec2(0.25, 0.25);
        this.beakerOrange.visible = false;

        this.beakerPurple = this.add.sprite(Level6.BEAKERPURPLE_KEY, HW3Layers.PRIMARY);
        this.beakerPurple.position.set(350, 380);
        this.beakerPurple.scale = new Vec2(0.25, 0.25);
        this.beakerPurple.visible = false;

        this.beakerRed = this.add.sprite(Level6.BEAKERRED_KEY, HW3Layers.PRIMARY);
        this.beakerRed.position.set(350, 380);
        this.beakerRed.scale = new Vec2(0.25, 0.25);
        this.beakerRed.visible = false;

        this.beakerDarkBlue = this.add.sprite(Level6.BEAKERDARKBLUE_KEY, HW3Layers.PRIMARY);
        this.beakerDarkBlue.position.set(350, 380);
        this.beakerDarkBlue.scale = new Vec2(0.25, 0.25);
        this.beakerDarkBlue.visible = false;

        this.beakerDarkRed = this.add.sprite(Level6.BEAKERDARKRED_KEY, HW3Layers.PRIMARY);
        this.beakerDarkRed.position.set(350, 380);
        this.beakerDarkRed.scale = new Vec2(0.25, 0.25);
        this.beakerDarkRed.visible = false;
    }

    protected handleLevelStart(event: GameEvent): void {
        this.narration.visible = true;
        const text1 = "What the hell? This doesn't look like the office at all.";
        const text2 = "It seems I've stumbled upon some creepy laboratory...";
        this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
        this.line1.textColor = Color.WHITE;
        this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
        this.line2.textColor = Color.WHITE;
        this.line1.visible = true;
        this.line2.visible = true;
    }

    //Handle general dialogue boxes without sprites
    protected handleDialogueHide(event: GameEvent): void {
        if(this.dialogue.visible) {
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
        }
    }
    //FF
    protected handleClock1(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "Intresting choice for a clock in a lab...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleWindow(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "It appears to be some kind of command center on the other side of the glass.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleStaircase(event: GameEvent): void { //How to finish level
        if (!this.dialogue.visible && !this.unlockedHatch && !this.hasCheckedStairs){
            this.hasCheckedStairs = true;
            this.dialogue.visible = true;
            const text1 = "Spiral staircases always make me anxious. I usually fall.";
            const text2 = "But hey, perhaps the hatch leads to freedom.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line1.visible = true;
            this.line2.visible = true;
        } else if (!this.dialogue.visible && !this.unlockedHatch && this.hasCheckedStairs){
            const threeDigitCode = prompt("The hatch is locked with a three digit padlock:"); //3 digit combo: 5, 1, 8 
            if(threeDigitCode == "518" || threeDigitCode == "5 1 8"){
                this.unlockedHatch == true;
                this.dialogue.visible = true;
                const text1 = "I got it! Let's blow this popsicle stand.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
                this.emitter.fireEvent(HW3Events.PLAYER_ENTERED_LEVEL_END); //Level End
            } else {
                this.dialogue.visible = true;
                const text1 = "I guess I'll have to keep looking for a way out.";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
            }
        }
    }
    //FL
    protected handleNewtonsCradle(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "Ah, Newton's Cradle: the gentleman's desk apparatus.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleTrophy(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "This trophy literally just says: Number One Science";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleLowerCabinets(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "They're locked!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleLabSupplies(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "Looks like miscellaneous lab supplies to me.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleDataboard(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "I must have skipped binary class becuase this looks like nonsense to me.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    //FR
    protected handleRedButton(event: GameEvent): void {
        if (!this.dialogue.visible && !this.hasDarkRedBeaker){
            this.dialogue.visible = true;
            const text1 = "This button looks intimidating, but pressing it doesn't do anything.";
            const text2 = "It looks like I could insert a beaker full of liquid here and try again.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line1.visible = true;
            this.line2.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkRedBeaker){
            this.dialogue.visible = true;
            const text1 = "Aha! the Red liquid got sent into the machine, I should check the diagnostics.";
            this.beakerButton = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    //FB
    protected handleClock2(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "Finally, a digital one!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleEntranceDoor(event: GameEvent): void {
        if (!this.dialogue.visible){
            this.dialogue.visible = true;
            const text1 = "The door I entered through has clearly seen better days.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    //Handle show dialogue with sprites
    //FF
    protected handleLockedCabinet(event: GameEvent): void {
        if(!this.dialogue.visible && !this.lockedcabinet.visible && !this.openedCabinet) { //4 digit combo: 2, 4, 8, 1 
            const fourDigitCode = prompt("The cabinet is locked with a four digit padlock:");
            if (fourDigitCode == "2481" || fourDigitCode == "2 4 8 1") {
                this.openedCabinet = true;
                this.lockedcabinet.visible = true;
                this.dialogue.visible = true;
                const text1 = "Wha- why are there so many clocks in here?";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.fontSize = 30;
                this.line1.visible = true;
            } else {
                this.dialogue.visible = true;
                const text1 = "Aw jeez, what could be in here? ";
                this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
                this.line1.textColor = Color.WHITE;
                this.line1.visible = true;
            }
        } else if (!this.dialogue.visible && !this.lockedcabinet.visible && this.openedCabinet) {
            this.lockedcabinet.visible = true;
            this.dialogue.visible = true;
            const text1 = "The number of clocks is kind of starting to creep me out.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 30;
            this.line1.visible = true;
        } 
    }
    protected handleLockedCabinetHide(event: GameEvent): void {
        if(this.lockedcabinet.visible) {
            this.lockedcabinet.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }
    //FR
    protected handleBoard1(event: GameEvent): void {
        if(!this.dialogue.visible && !this.board1.visible && !this.beakerButton) {
            this.board1.visible = true;
            this.dialogue.visible = true;
            const text1 = "Hmmm, looks like some kind of way to display data...";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 30;
            this.line1.visible = true;
        } else if(!this.dialogue.visible && !this.board1.visible && this.beakerButton) {
            this.board2.visible = true;
            this.dialogue.visible = true;
            const text1 = "I guess that dark red liquid had some kind of affect of this machine!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.fontSize = 30;
            this.line1.visible = true;
        }
    }
    protected handleBoard1Hide(event: GameEvent): void {
        if(this.board1.visible || this.board2.visible) {
            this.board1.visible = false;
            this.board2.visible = false; 
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }
    //FB
    protected handleNote1(event: GameEvent): void {
        if(!this.dialogue.visible && !this.note1.visible) {
            this.note1.visible = true;
            this.dialogue.visible = true;
            const text1 = "Maybe I'll take a quick peek at this lab coat. Huh, there's only this note.";
            const text2 = "Thats odd, I was expecting an elaborate equation or something.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 470), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line2 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 480), text: text2});
            this.line2.textColor = Color.WHITE;
            this.line1.visible = true;
            this.line2.visible = true;
        }
    }
    protected handleNote1Hide(event: GameEvent): void {
        if(this.note1.visible) {
            this.note1.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
            this.line2.visible = false;
        }
    }
    //FL
    protected handleBeaker(event: GameEvent): void {
        if (!this.dialogue.visible && !this.hasBeaker){
            this.beaker.visible = true;
            this.dialogue.visible = true;
            const text1 = "I Better hold onto this in case I want to pretend to be a scientist.";
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else {
            this.dialogue.visible = true;
            const text1 = "Ah, my trusty beaker.";
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        }
    }
    protected handleBeaker1(event: GameEvent): void {
        if (!this.dialogue.visible && !(this.hasBeaker || this.hasBlueBeaker || this.hasGreenBeaker || this.hasOrangeBeaker || this.hasPurpleBeaker || this.hasRedBeaker || this.hasDarkBlueBeaker || this.hasDarkRedBeaker)){
            this.dialogue.visible = true;
            const text1 = "It's filled with blue liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasBeaker){
            this.dialogue.visible = true;
            this.beakerBlue.visible = true;
            const text1 = "I can fill my beaker with some of this blue stuff";
            this.hasBeaker = false;
            this.hasBlueBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasBlueBeaker){
            this.dialogue.visible = true;
            this.beakerBlue.visible = true;
            const text1 = "My beaker already has blue liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasGreenBeaker){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasGreenBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasOrangeBeaker){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasOrangeBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasPurpleBeaker){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasPurpleBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasRedBeaker){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasRedBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkBlueBeaker){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasDarkBlueBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkRedBeaker){
            this.dialogue.visible = true;
            this.beakerDarkRed.visible = true;
            const text1 = "My beaker's already full!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } 
    }
    protected handleBeaker2(event: GameEvent): void {
        if (!this.dialogue.visible && !(this.hasBeaker || this.hasBlueBeaker || this.hasGreenBeaker || this.hasOrangeBeaker || this.hasPurpleBeaker || this.hasRedBeaker || this.hasDarkBlueBeaker || this.hasDarkRedBeaker)){
            this.dialogue.visible = true;
            const text1 = "It's filled with a green liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasBeaker){
            this.dialogue.visible = true;
            this.beakerGreen.visible = true;
            const text1 = "I can fill my beaker with some of this green liquid";
            this.hasBeaker = false;
            this.hasGreenBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasGreenBeaker){
            this.dialogue.visible = true;
            this.beakerGreen.visible = true;
            const text1 = "My beaker already has some green liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkBlueBeaker){
            this.dialogue.visible = true;
            this.beakerDarkRed.visible = true;
            const text1 = "Aha!! The beaker is full of a deep rose colored liquid.";
            this.hasDarkBlueBeaker = false;
            this.hasDarkRedBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkRedBeaker){
            this.dialogue.visible = true;
            this.beakerDarkRed.visible = true;
            const text1 = "My Beaker is full right now!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasBlueBeaker = false;
            this.hasOrangeBeaker = false;
            this.hasPurpleBeaker = false;
            this.hasRedBeaker = false;
            this.hasDarkBlueBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } 
    } 
    protected handleBeaker3(event: GameEvent): void {
        if (!this.dialogue.visible && !(this.hasBeaker || this.hasBlueBeaker || this.hasGreenBeaker || this.hasOrangeBeaker || this.hasPurpleBeaker || this.hasRedBeaker || this.hasDarkBlueBeaker || this.hasDarkRedBeaker)){
            this.dialogue.visible = true;
            const text1 = "It's filled with some purple liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasBeaker){
            this.dialogue.visible = true;
            this.beakerPurple.visible = true;
            const text1 = "I've put some of this purple stuff in my beaker.";
            this.hasBeaker = false;
            this.hasPurpleBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasPurpleBeaker){
            this.dialogue.visible = true;
            this.beakerPurple.visible = true;
            const text1 = "My beaker already has a bit of purple liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkRedBeaker){
            this.dialogue.visible = true;
            this.beakerDarkRed.visible = true;
            const text1 = "My Beaker is pretty full right now!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasBlueBeaker = false;
            this.hasOrangeBeaker = false;
            this.hasGreenBeaker = false;
            this.hasRedBeaker = false;
            this.hasDarkBlueBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } 
    }
    protected handleBeaker4(event: GameEvent): void {
        if (!this.dialogue.visible && !(this.hasBeaker || this.hasBlueBeaker || this.hasGreenBeaker || this.hasOrangeBeaker || this.hasPurpleBeaker || this.hasRedBeaker || this.hasDarkBlueBeaker || this.hasDarkRedBeaker)){
            this.dialogue.visible = true;
            const text1 = "It's seems to be filled with an orange liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasBeaker){
            this.dialogue.visible = true;
            this.beakerOrange.visible = true;
            const text1 = "I'll toss some of this orange liquid into my beaker";
            this.hasBeaker = false;
            this.hasOrangeBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasOrangeBeaker){
            this.dialogue.visible = true;
            this.beakerOrange.visible = true;
            const text1 = "My beaker already has some orange liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasBlueBeaker){
            this.dialogue.visible = true;
            this.beakerDarkBlue.visible = true;
            const text1 = "Wow! They combined to be a dark mysterious blue hue. I feel like a cook!";
            this.hasBlueBeaker = false;
            this.hasDarkBlueBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkRedBeaker){
            this.dialogue.visible = true;
            this.beakerDarkRed.visible = true;
            const text1 = "My beaker is full right now, so I shouldn't try to add any more to it.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasGreenBeaker = false;
            this.hasPurpleBeaker = false;
            this.hasRedBeaker = false;
            this.hasDarkBlueBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } 
    }
    protected handleBeaker5(event: GameEvent): void {
        if (!this.dialogue.visible && !(this.hasBeaker || this.hasBlueBeaker || this.hasGreenBeaker || this.hasOrangeBeaker || this.hasPurpleBeaker || this.hasRedBeaker || this.hasDarkBlueBeaker || this.hasDarkRedBeaker)){
            this.dialogue.visible = true;
            const text1 = "It's filled with a red liquid.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasBeaker){
            this.dialogue.visible = true;
            this.beakerRed.visible = true;
            const text1 = "I got a bit of the red liquid in my beaker.";
            this.hasBeaker = false;
            this.hasRedBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasRedBeaker){
            this.dialogue.visible = true;
            this.beakerRed.visible = true;
            const text1 = "My beaker already has some red liquid right now.";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible && this.hasDarkRedBeaker){
            this.dialogue.visible = true;
            this.beakerDarkRed.visible = true;
            const text1 = "My Beaker is currently full with a darker red liquid!";
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } else if (!this.dialogue.visible){
            this.dialogue.visible = true;
            this.beakerGrey.visible = true;
            const text1 = "Poof, it turned grey! I better retry.";
            this.hasBlueBeaker = false;
            this.hasOrangeBeaker = false;
            this.hasGreenBeaker = false;
            this.hasPurpleBeaker = false;
            this.hasDarkBlueBeaker = false;
            this.hasBeaker = true;
            this.line1 = <Label>this.add.uiElement(UIElementType.LABEL, HW3Layers.PRIMARY, {position: new Vec2(this.viewport.getCenter().x, 475), text: text1});
            this.line1.textColor = Color.WHITE;
            this.line1.visible = true;
        } 
    }
    protected handleBeakerHide(event: GameEvent): void {
        if(this.beaker.visible || this.beakerGrey.visible || this.beakerBlue.visible || this.beakerGreen.visible || this.beakerOrange.visible || this.beakerPurple.visible || this.beakerRed.visible || this.beakerDarkBlue.visible || this.beakerDarkRed.visible) {
            this.beaker.visible = false;
            this.beakerGrey.visible = false;
            this.beakerBlue.visible = false;
            this.beakerGreen.visible = false;
            this.beakerOrange.visible = false;
            this.beakerPurple.visible = false;
            this.beakerRed.visible = false;
            this.beakerDarkBlue.visible = false;
            this.beakerDarkRed.visible = false;
            this.dialogue.visible = false;
            this.line1.visible = false;
        }
    }
    
}