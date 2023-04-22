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
import LevelSelect from "./LevelSelect";

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



    public loadScene(): void {
        // Load the menu song
        this.load.image("BACKGROUND", "MainMenu_assets/Splash_Screen.png");
        this.load.image("MAIN_MENU", "MainMenu_assets/MainMenu.png");
        this.load.image("CONTROLS", "MainMenu_assets/Controls.png");
        this.load.image("HELP", "MainMenu_assets/Help_Screen.png");
        this.load.image("LEVEL_SELECT", "MainMenu_assets/Level_Selection.png");


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
        let l = this.add.sprite("LEVEL_SELECT", "levelSelect");
        l.position.set(center.x, center.y);
        this.levelSelect.setHidden(true);
        //Controls
        this.controls = this.addUILayer("controls");
        let c = this.add.sprite("CONTROLS", "controls");
        c.position.set(center.x, center.y);
        this.controls.setHidden(true);
        //Help
        this.help = this.addUILayer("help");
        let h = this.add.sprite("HELP", "help");
        h.position.set(center.x, center.y);
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
        
        let backBtn2 = <Button>this.add.uiElement(UIElementType.BUTTON, "help", {position: new Vec2(size.x+400, size.y+279), text: "Back"});
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
        
        //Change splash screen to main menu
        document.onclick = () => {
            if(!this.splashScreen.isHidden()) {
                this.splashScreen.setHidden(true);
                this.mainMenu.setHidden(false);
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
    }
}

