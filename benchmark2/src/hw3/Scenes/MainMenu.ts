import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Level1 from "./HW3Level1";
import Layer from "../../Wolfie2D/Scene/Layer";
import Receiver from "../../Wolfie2D/Events/Receiver";
import GameEvent from "../../Wolfie2D/Events/GameEvent";


// Layers for the main menu scene
export const MenuLayers = {
    MAIN: "MAIN"
} as const;

const MainMenuEvent = {
    PLAY_GAME: "PLAY_GAME",
	CONTROLS: "CONTROLS",
	HELP: "HELP",
	MENU: "MENU",
    PLAY_RECORDING: "PLAY_RECORDING"
} as const;

export default class MainMenu extends Scene {

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "hw4_assets/music/menu.mp3";

    private mainMenu: Layer;
    private splashScreen: Layer;
    private levelSelect: Layer;
    private controls: Layer;
    private help: Layer;



    public loadScene(): void {
        // Load the menu song
        this.load.audio(MainMenu.MUSIC_KEY, MainMenu.MUSIC_PATH);
        this.load.image("BACKGROUND", "Level1_assets/Splash_Screen.png");
        this.load.image("MAIN_MENU", "Level1_assets/MainMenu.png");
    }

    public startScene(): void {

        let center = this.viewport.getCenter();
        this.splashScreen = this.addUILayer("splashScreen");
        this.addParallaxLayer("bg", new Vec2(0.5, 1), -1);
        let bg = this.add.sprite("BACKGROUND", "splashScreen");
        bg.position.set(center.x, center.y);

        //Main Menu
        this.mainMenu = this.addUILayer("mainMenu");
        let mm = this.add.sprite("MAIN_MENU", "mainMenu");
        mm.position.set(center.x, center.y);
        this.mainMenu.setHidden(true);
        //Level Select
        this.levelSelect = this.addUILayer("levelSelect");
        this.levelSelect.setHidden(true);
        //Controls
        this.controls = this.addUILayer("controls");
        this.controls.setHidden(true);
        //Help
        this.help = this.addUILayer("help");
        this.help.setHidden(true);

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        // Create a play button
        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(size.x, size.y-80), text: "Start Game"});
        playBtn.backgroundColor = Color.TRANSPARENT;
        playBtn.borderColor = Color.WHITE;
        playBtn.borderRadius = 0;
        playBtn.setPadding(new Vec2(50, 10));
        playBtn.font = "PixelSimple";

        // Create a level select button
        let levelBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(size.x, size.y), text: "Level Select"});
        levelBtn.backgroundColor = Color.TRANSPARENT;
        levelBtn.borderColor = Color.WHITE;
        levelBtn.borderRadius = 0;
        levelBtn.setPadding(new Vec2(50, 10));
        levelBtn.font = "PixelSimple";

        // Create a control select button
        let ctrlBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(size.x, size.y+80), text: "Controls"});
        ctrlBtn.backgroundColor = Color.TRANSPARENT;
        ctrlBtn.borderColor = Color.WHITE;
        ctrlBtn.borderRadius = 0;
        ctrlBtn.setPadding(new Vec2(50, 10));
        ctrlBtn.font = "PixelSimple";

        // Create a help select button
        let helpBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "mainMenu", {position: new Vec2(size.x, size.y+160), text: "Help"});
        helpBtn.backgroundColor = Color.TRANSPARENT;
        helpBtn.borderColor = Color.WHITE;
        helpBtn.borderRadius = 0;
        helpBtn.setPadding(new Vec2(50, 10));
        helpBtn.font = "PixelSimple";

        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            this.sceneManager.changeToScene(Level1);
        }
        levelBtn.onClick = () => {
            console.log("Level Button Clicked");
        }
        ctrlBtn.onClick = () => {
            console.log("Control Button Clicked");
        }
        helpBtn.onClick = () => {
            console.log("Help Button Clicked");
        }
        //Change splash screen to main menu
        document.onclick = () => {
            if(!this.splashScreen.isHidden()) {
                this.splashScreen.setHidden(true);
                this.mainMenu.setHidden(false);
            }
        }

        // Scene has started, so start playing music
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.MUSIC_KEY, loop: true, holdReference: true});
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case MainMenuEvent.MENU: {
                this.splashScreen.setHidden(true);
                this.mainMenu.setHidden(false);
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
    public unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY});
    }
}

