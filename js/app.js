class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        this.x += this.speed * dt;
        // Put enemy back to beginning of the board if they reach the end
        if (this.x >= 500) {
            this.x = 0;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // Reset the player if they either reach the water 
        // or collide with an enemy
        if (this.y <= 10) {
            this.resetPlayer();
        }
        for (let enemy of allEnemies) {
            let xdiff = Math.abs(enemy.x - this.x);
            let ydiff = Math.abs(enemy.y - this.y);
            if (xdiff < 60 && ydiff < 20) {
                this.resetPlayer();
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x >= 100) {
                    this.x -= 100;
                }
                break;
            case 'up':
                if (this.y >= 0) {
                    this.y -= 80;
                }
                break;
            case 'right':
                if (this.x <= 370) {
                    this.x += 100;
                }
                break;
            case 'down':
                if (this.y <= 370) {
                    this.y += 80;
                }
                break;
        }
    }

    resetPlayer() {
        this.x = 200;
        this.y = 380;
    }
}


const player = new Player(200,380);
// Speed is random number bewteen 200 and 50
const enemy1 = new Enemy(0,60,Math.floor((Math.random() * 200) + 50));
const enemy2 = new Enemy(0,140,Math.floor((Math.random() * 200) + 50));
const enemy3 = new Enemy(0,220,Math.floor((Math.random() * 200) + 50));
const allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
