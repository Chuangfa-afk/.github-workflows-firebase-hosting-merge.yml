import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import HW3Level from "./HW3Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import HW4Level2 from "./HW3Level2";
import Layer from "../../Wolfie2D/Scene/Layer";

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
    public static readonly BACKGROUND_PATH = "Level1_assets/Level_1.png";

    private background: Layer;
    

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);



    }

    /**
     * Load in our resources for level 1
     */
    public loadScene(): void {
        this.load.image(Level1.BACKGROUND_KEY, Level1.BACKGROUND_PATH);
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
        let bg = this.add.sprite("BACKGROUND", "BACKGROUND");
        console.log(bg.position);
        bg.position.set(600, 400);
        bg.scale = new Vec2(0.25, 0.25);
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

}