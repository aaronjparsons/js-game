const utils = {
  withGrid(n) {
    return n * GRID_SIZE;
  },
  asGridCoord(x, y) {
    return `${x * GRID_SIZE},${y * GRID_SIZE}`;
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = GRID_SIZE;
    if (direction === 'left') {
      x -= size;
    } else if (direction === 'right') {
      x += size;
    } else if (direction === 'up') {
      y -= size;
    } else if (direction === 'down') {
      y += size;
    }

    return {x, y};
  },
  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail
    });
    document.dispatchEvent(event);
  }
}