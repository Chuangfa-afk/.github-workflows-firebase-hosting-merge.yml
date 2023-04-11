import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level, { HW3Layers } from "./HW3Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import HW4Level2 from "./HW3Level2";
import Layer from "../../Wolfie2D/Scene/Layer";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
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

export const Level1Events = {
    CLOCK1: "CLOCK1",
    CLOCK1HIDE: "CLOCK1HIDE",
    CLOCK2: "CLOCK2",
    CLOCK2HIDE: "CLOCK2HIDE",
    KEYPAD: "KEYPAD",
    KEYPADHIDE: "KEYPADHIDE",
} as const;
/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level1 extends HW3Level {

    public static readonly TILEMAP_KEY = "LEVEL1";
    public static readonly TILEMAP_PATH = "hw4_assets/tilemaps/HW4Level1.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly DESTRUCTIBLE_LAYER_KEY = "Destructable";
    public static readonly WALLS_LAYER_KEY = "Main";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "Level1_assets/Level_1.json";

    public static LEFT_KEY: string = "LEFT";
    public static LEFT_PATH = "Level1_assets/spritesheets/Left Button.json";

    public static RIGHT_KEY: string = "RIGHT";
    public static RIGHT_PATH = "Level1_assets/spritesheets/Right Button.json";

    public static readonly CLOCK1_KEY = "CLOCK1";
    public static readonly CLOCK1_PATH = "Level1_assets/clock1.png";
    public static readonly CLOCK2_KEY = "CLOCK2";
    public static readonly CLOCK2_PATH = "Level1_assets/clock2.png";

    protected background: Layer;
    public ui: Layer;
    public bg: HW3AnimatedSprite;
    public primary: Sprite;
    public clock2: Sprite;
    public dialogue: Rect;
    public line1: Label;

    protected emitter: Emitter;
    public hasId: Boolean = false;

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

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
    }

    /**
     * Unload resources for level 1 - decide what to keep
     */
    public unloadScene(): void {
        this.load.keepAudio(this.levelMusicKey);
        this.load.keepAudio(this.jumpAudioKey);
        this.load.keepAudio(this.tileDestroyedAudioKey);
    }

    public startScene(): void {
        //Subscribe to event
        this.receiver.subscribe(Level1Events.CLOCK1);
        this.receiver.subscribe(Level1Events.CLOCK1HIDE);
        this.receiver.subscribe(Level1Events.KEYPAD);
        this.receiver.subscribe(Level1Events.KEYPADHIDE);
        this.receiver.subscribe(Level1Events.CLOCK2);
        this.receiver.subscribe(Level1Events.CLOCK2HIDE);

        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(Level1.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);

        super.startScene();
        this.initializeUserInterface();
        // Set the next level to be Level2
        this.nextLevel = HW4Level2;
    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            case Level1Events.CLOCK1: {
                this.handleClock1Press(event);
                break;
            }
            case Level1Events.CLOCK1HIDE: {
                this.handleClock1Hide(event);
                break;
            }
            case Level1Events.CLOCK2: {
                this.handleClock2Press(event);
                break;
            }
            case Level1Events.CLOCK2HIDE: {
                this.handleClock2Hide(event);
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
            case HW3Events.LEVEL_START: {
                Input.enableInput();
                break;
            }
            // Default: Throw an error! No unhandled events allowed.
            default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
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
    }

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

    protected handleKeypadPress(event: GameEvent): void {
        if(!this.dialogue.visible && !this.hasId) {
            this.dialogue.visible = true;

            const text1 = "I don't have my ID on me. Maybe there's one lying around...";
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

}