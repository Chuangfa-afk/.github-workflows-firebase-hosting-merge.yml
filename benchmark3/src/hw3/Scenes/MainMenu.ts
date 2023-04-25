import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Level1 from "./Level1";
import Layer from "../../Wolfie2D/Scene/Layer";
import Receiver from "../../Wolfie2D/Events/Receiver";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";

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

    private mainMenu: Layer;
    private splashScreen: Layer;
    private levelSelect: Layer;
    private controls: Layer;
    private help: Layer;

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "MainMenu_assets/music/Main_Menu.wav";

    public static LEFT_KEY: string = "LEFT";
    public static LEFT_PATH = "Level_assets/spritesheets/Left Button.json";

    public static RIGHT_KEY: string = "RIGHT";
    public static RIGHT_PATH = "Level_assets/spritesheets/Right Button.json";

    public static readonly LEFT_AUDIO_KEY: string = "LEFT_SFX";
    public static readonly LEFT_AUDIO_PATH: string = "Level_assets/sounds/Left.wav";
    public static readonly RIGHT_AUDIO_KEY: string = "RIGHT_SFX";
    public static readonly RIGHT_AUDIO_PATH: string = "Level_assets/sounds/Right.wav";

    public loadScene(): void {
        // Load the menu song
        this.load.image("BACKGROUND", "MainMenu_assets/Splash_Screen.png");
        this.load.image("MAIN_MENU", "MainMenu_assets/MainMenu.png");
        this.load.image("CONTROLS", "MainMenu_assets/Controls.png");
        this.load.image("HELP", "MainMenu_assets/Help_Screen.png");
        this.load.image("LEVEL_SELECT", "MainMenu_assets/Level_Selection.png");
        this.load.image("LEVEL_1", "MainMenu_assets/Level_1.png");
        this.load.image("LEVEL_2", "MainMenu_assets/Level_2.png");
        this.load.image("LEVEL_3", "MainMenu_assets/Level_3.png");
        this.load.image("LEVEL_4", "MainMenu_assets/Level_4.png");
        this.load.audio(MainMenu.MUSIC_KEY, MainMenu.MUSIC_PATH);
        this.load.spritesheet(MainMenu.LEFT_KEY, MainMenu.LEFT_PATH);
        this.load.spritesheet(MainMenu.RIGHT_KEY, MainMenu.RIGHT_PATH);
        this.load.audio(MainMenu.LEFT_AUDIO_KEY, MainMenu.LEFT_AUDIO_PATH);
        this.load.audio(MainMenu.RIGHT_AUDIO_KEY, MainMenu.RIGHT_AUDIO_PATH);
    }

    public startScene(): void {
        this.splashScreen = this.addUILayer("splashScreen");
        this.addParallaxLayer("bg", new Vec2(0.5, 1), -1);
        let bg = this.add.sprite("BACKGROUND", "splashScreen");
        bg.position.set(600, 400);

        //Main Menu
        this.mainMenu = this.addUILayer("mainMenu");
        let mm = this.add.sprite("MAIN_MENU", "mainMenu");
        mm.position.set(600, 400);
        this.mainMenu.setHidden(true);
        //LEVEL SELECT
        //Level 1
        this.levelSelect = this.addUILayer("levelSelect");
        let l = this.add.sprite("LEVEL_SELECT", "levelSelect");
        l.position.set(600, 400);
        
        let l1 = this.add.sprite("LEVEL_1", "levelSelect");
        l1.position.set(225, 300);
        l1.scale = new Vec2(0.07, 0.07);

        const text1 = "Level 1";
        let line1 = <Label>this.add.uiElement(UIElementType.LABEL, "levelSelect", {position: new Vec2(225, 410), text: text1});
        line1.textColor = Color.WHITE;

        let lb1 = <Button>this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(225, 300), text: ""});
        lb1.backgroundColor = Color.TRANSPARENT;
        lb1.borderColor = Color.TRANSPARENT;
        lb1.borderRadius = 0;
        lb1.setPadding(new Vec2(125, 70));
        lb1.font = "PixelSimple";

        //Level 2
        let l2 = this.add.sprite("LEVEL_2", "levelSelect");
        l2.position.set(600, 300);
        l2.scale = new Vec2(0.07, 0.07);

        const text2 = "Level 2";
        let line2 = <Label>this.add.uiElement(UIElementType.LABEL, "levelSelect", {position: new Vec2(600, 410), text: text2});
        line2.textColor = Color.WHITE;

        let lb2 = <Button>this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(600, 300), text: ""});
        lb2.backgroundColor = Color.TRANSPARENT;
        lb2.borderColor = Color.TRANSPARENT;
        lb2.borderRadius = 0;
        lb2.setPadding(new Vec2(125, 70));
        lb2.font = "PixelSimple";

        //Level 3
        let l3 = this.add.sprite("LEVEL_3", "levelSelect");
        l3.position.set(975, 300);
        l3.scale = new Vec2(0.07, 0.07);

        const text3 = "Level 3";
        let line3 = <Label>this.add.uiElement(UIElementType.LABEL, "levelSelect", {position: new Vec2(975, 410), text: text3});
        line3.textColor = Color.WHITE;

        let lb3 = <Button>this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(975, 300), text: ""});
        lb3.backgroundColor = Color.TRANSPARENT;
        lb3.borderColor = Color.TRANSPARENT;
        lb3.borderRadius = 0;
        lb3.setPadding(new Vec2(125, 70));
        lb3.font = "PixelSimple";

        //Level 4
        let l4 = this.add.sprite("LEVEL_4", "levelSelect");
        l4.position.set(600, 550);
        l4.scale = new Vec2(0.07, 0.07);

        const text4 = "Level 4";
        let line4 = <Label>this.add.uiElement(UIElementType.LABEL, "levelSelect", {position: new Vec2(600, 660), text: text4});
        line4.textColor = Color.WHITE;

        let lb4 = <Button>this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(600, 550), text: ""});
        lb4.backgroundColor = Color.TRANSPARENT;
        lb4.borderColor = Color.TRANSPARENT;
        lb4.borderRadius = 0;
        lb4.setPadding(new Vec2(125, 70));
        lb4.font = "PixelSimple";
        
        this.levelSelect.setHidden(true);

        //Controls
        this.controls = this.addUILayer("controls");
        let c = this.add.sprite("CONTROLS", "controls");
        c.position.set(600, 400);
        this.controls.setHidden(true);
        //Help
        this.help = this.addUILayer("help");
        let h = this.add.sprite("HELP", "help");
        h.position.set(600, 400);
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

        let backBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "controls", {position: new Vec2(size.x+400, size.y+279), text: "Back"});
        backBtn.backgroundColor = Color.TRANSPARENT;
        backBtn.borderColor = Color.WHITE;
        backBtn.borderRadius = 0;
        backBtn.setPadding(new Vec2(50, 10));
        backBtn.font = "PixelSimple";
        
        let backBtn2 = <Button>this.add.uiElement(UIElementType.BUTTON, "help", {position: new Vec2(size.x+340, size.y+279), text: "Back"});
        backBtn2.backgroundColor = Color.TRANSPARENT;
        backBtn2.borderColor = Color.WHITE;
        backBtn2.borderRadius = 0;
        backBtn2.setPadding(new Vec2(50, 10));
        backBtn2.font = "PixelSimple";

        let backBtn3 = <Button>this.add.uiElement(UIElementType.BUTTON, "levelSelect", {position: new Vec2(size.x+400, size.y+279), text: "Back"});
        backBtn3.backgroundColor = Color.TRANSPARENT;
        backBtn3.borderColor = Color.WHITE;
        backBtn3.borderRadius = 0;
        backBtn3.setPadding(new Vec2(50, 10));
        backBtn3.font = "PixelSimple";


        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            this.sceneManager.changeToScene(Level1);
        }
        levelBtn.onClick = () => {
            this.mainMenu.setHidden(true);
            this.levelSelect.setHidden(false);
        }
        ctrlBtn.onClick = () => {
            this.mainMenu.setHidden(true);
            this.controls.setHidden(false);
        }
        helpBtn.onClick = () => {
            this.mainMenu.setHidden(true);
            this.help.setHidden(false);
        }
        backBtn.onClick = () => {
            this.mainMenu.setHidden(false);
            this.controls.setHidden(true);
        }
        backBtn2.onClick = () => {
            this.mainMenu.setHidden(false);
            this.help.setHidden(true);
        }
        backBtn3.onClick = () => {
            this.mainMenu.setHidden(false);
            this.levelSelect.setHidden(true);
        }
        //Level Select buttons
        lb1.onClick = () => {
            this.sceneManager.changeToScene(Level1);
        }
        lb2.onClick = () => {
            this.sceneManager.changeToScene(Level2);
        }
        lb3.onClick = () => {
            this.sceneManager.changeToScene(Level3);
        }
        lb4.onClick = () => {
            this.sceneManager.changeToScene(Level4);
        }
        
        //Change splash screen to main menu
        document.onclick = () => {
            if(!this.splashScreen.isHidden()) {
                this.splashScreen.setHidden(true);
                this.mainMenu.setHidden(false);
                this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: MainMenu.MUSIC_KEY, loop: true, holdReference: true});
            }
        }

        // Scene has started, so start playing music
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
        this.load.keepSpritesheet(MainMenu.LEFT_KEY);
        this.load.keepSpritesheet(MainMenu.RIGHT_KEY);
        this.load.keepAudio(MainMenu.LEFT_AUDIO_KEY);
        this.load.keepAudio(MainMenu.RIGHT_AUDIO_KEY);
    }
}

