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
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class LevelSelect extends HW3Level {

    public static readonly TILEMAP_KEY = "LEVEL1";
    public static readonly TILEMAP_PATH = "hw4_assets/tilemaps/HW4Level1.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly DESTRUCTIBLE_LAYER_KEY = "Destructable";
    public static readonly WALLS_LAYER_KEY = "Main";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "./Level1_assets/Level_Select.json";

    public static LEFT_KEY: string = "LEFT";
    public static LEFT_PATH = "Level1_assets/spritesheets/Left Button.json";

    public static RIGHT_KEY: string = "RIGHT";
    public static RIGHT_PATH = "Level1_assets/spritesheets/Right Button.json";

    protected background: Layer;
    public ui: Layer;
    public bg: HW3AnimatedSprite;
    

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        this.load.spritesheet(LevelSelect.BACKGROUND_KEY, LevelSelect.BACKGROUND_PATH);
        this.load.spritesheet(LevelSelect.LEFT_KEY, LevelSelect.LEFT_PATH);
        this.load.spritesheet(LevelSelect.RIGHT_KEY, LevelSelect.RIGHT_PATH);
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
        this.background = this.addUILayer("background");
        this.addParallaxLayer("BACKGROUND", new Vec2(0.5, 1), -1);
        this.bg = this.add.animatedSprite(LevelSelect.BACKGROUND_KEY, HW3Layers.BACKGROUND);
        this.bg.position.set(248, 400);
        this.bg.scale = new Vec2(0.25, 0.25);
        this.bg.addAI(PlayerController);
        super.startScene();
        // Set the next level to be Level2
        this.nextLevel = HW4Level2;
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

    public initializeButtons(): void {
        let size = this.viewport.getHalfSize();
        let backBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "UI", {position: new Vec2(size.x-111, size.y-77), text: "Back"});
        backBtn.backgroundColor = Color.TRANSPARENT;
        backBtn.borderColor = Color.WHITE;
        backBtn.borderRadius = 0;
        backBtn.setPadding(new Vec2(50, 10));
        backBtn.font = "PixelSimple";


        backBtn.onClick = () => {
            this.sceneManager.changeToScene(MainMenu);
        }
    }

}
