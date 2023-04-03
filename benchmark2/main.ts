class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private splashScreen: HTMLImageElement;
    private mainScreen: HTMLImageElement;
    private controlScreen: HTMLImageElement;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);

        this.splashScreen = new Image();
        this.mainScreen = new Image();
        this.controlScreen = new Image();
        this.controlScreen.src = 'assets/Controls.png';
        this.splashScreen.src = 'assets/Splash_Screen.png';
        this.mainScreen.src = 'assets/Main_Screen.png';


        this.splashScreen.onload = () => {
            this.drawSplashScreen();
        };

        this.canvas.addEventListener('click', (event) => {
            this.handleClick(event);
        });
    }

    private handleClick(event: MouseEvent): void {
        const buttonX = 485;
        const buttonY = 460;
        const buttonWidth = 470;
        const buttonHeight = 82;    

        // const canvas2 = document.querySelector('canvas') as HTMLCanvasElement;
        // const ctx = canvas2.getContext("2d");

        if (event.clientX >= buttonX &&
            event.clientX <= buttonX + buttonWidth &&
            event.clientY >= buttonY &&
            event.clientY <= buttonY + buttonHeight) {
            this.drawControlScreen();
        } else {
            this.drawMainScreen();
        }

        // if (ctx !== null) {
        //     ctx.strokeStyle = "red"; // Set the outline color to red
        //     ctx.lineWidth = 2; // Set the outline width to 2 pixels
        //     ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight); // Draw the rectangle outline
        // }
    }

    private drawSplashScreen(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.splashScreen, 0, 0, this.canvas.width, this.canvas.height);
    }

    private drawMainScreen(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.mainScreen, 0, 0, this.canvas.width, this.canvas.height);
    }

    private drawControlScreen(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.controlScreen, 0, 0, this.canvas.width, this.canvas.height);
    }
}

window.addEventListener('load', () => {
    new Game();
});
