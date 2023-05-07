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

export const Level5Events = {
    //Facing F
    
    //Facing L

    //Facing R

    //Facing B

    //Facing U
    
} as const;

export default class Level5 extends HW3Level {

    /*
    public static readonly MUSIC_KEY = "LEVEL_4_MUSIC";
    public static readonly MUSIC_PATH = "Level4_assets/music/Level_4.wav";
    */

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level5_assets/Level_5.json";

    protected background: Layer;
    public ui: Layer;
    public bg: HW3AnimatedSprite;
    public dialogue: Rect;
    public narration: Rect;
    public line1: Label;
    public line2: Label;

    //FacingF

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
    }

    /**
     * Unload resources for level 1 - decide what to keep
     */
    public unloadScene(): void {

    }

    public startScene(): void {
        this.emitter.fireEvent(LevelEvents.LEVEL_4);
        //Subscribe to event
        //FF
        
        //FL
        
        
        //FR
        

        //FB
        

        //FU
        


        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level5.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        this.nextLevel = MainMenu;

    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            //FF
            
            //FL
            
            //FR
            
            //FB

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
    

    //Handle show dialogue w/o sprites


}