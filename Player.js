class Player extends GameObject {
  constructor(config) {
    super(config)
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      'up': ['y', -1],
      'down': ['y', 1],
      'left': ['x', -1],
      'right': ['x', 1],
    }
    this.directionInput = new DirectionInput();
    this.directionInput.init();
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {

      // Case: Keyboard ready and have arrow pressed
      if (this.isPlayerControlled && this.directionInput.direction) {
        this.startBehavior(state, {
          type: 'walk',
          direction: this.directionInput.direction
        })
      }
      this.updateSprite();
    }
  }

  startBehavior(state, behavior) {
    // Set character direction
    this.direction = behavior.direction;
    if (behavior.type === 'walk') {
      // Collision check
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }

      // Move the player collision box
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = GRID_SIZE;
      this.updateSprite()
    }

    if (behavior.type === 'stand') {
      setTimeout(() => {
        utils.emitEvent('PersonStandComplete', {
          whoId: this.id
        });
      }, behavior.time)
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;

    if (this.movingProgressRemaining === 0) {
      // Walk finished
      utils.emitEvent('PersonWalkingComplete', {
        whoId: this.id
      });
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
      return;
    }
    this.sprite.setAnimation(`idle-${this.direction}`);
  }
}