// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// This functions determines the speed of the enemy
function randomInt() {
		return 50 + Math.floor(Math.random() *200);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 505) { //canvas.width = 505
        this.x = -100;
        this.speed = randomInt();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Define the start position for player
function startPosition() {
    player.x = 200;
    player.y = 400;
};

Player.prototype.update = function() {
    // Prevent player to go beyond canvas walls
    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    // Player returns to grass after reaching the water
    if (this.y < 20) {
        this.y = 400;
        // toggle background when player reaches water
        document.querySelector('body').style.backgroundColor = 'blue';
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 500);
    }

    // Reset player position when it collides with enemy
    allEnemies.forEach(function(enemy) {
    if(this.x >= enemy.x - 60 && this.x <= enemy.x + 60) {
        if(this.y >= enemy.y - 40 && this.y <= enemy.y + 40) {
            startPosition();
            }
        }
    });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
    if (pressedKey === 'left' && this.x > 0) {
        this.x = this.x - 60;
    }
    if (pressedKey === 'right' && this.x < 400) {
        this.x = this.x + 60;
    }
    if (pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 30;
    }
    if (pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 30;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
// Define the position of enemies and player
var enemyPosition = [70, 150, 230];
var player = new Player(200, 400, 50)
enemyPosition.forEach(function(positionY) {
    enemy = new Enemy(0, positionY, randomInt());
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
