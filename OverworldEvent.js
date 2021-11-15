class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: 'stand',
      direction: this.event.direction,
      time: this.event.time
    })

    const completeEventHandler = e => {
      if (e.detail.whoId = this.event.who) {
        document.removeEventListener('PersonStandComplete', completeEventHandler);
        resolve();
      }
    }

    document.addEventListener('PersonStandComplete', completeEventHandler)
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: 'walk',
      direction: this.event.direction
    })

    const completeEventHandler = e => {
      if (e.detail.whoId = this.event.who) {
        document.removeEventListener('PersonWalkingComplete', completeEventHandler);
        resolve();
      }
    }

    document.addEventListener('PersonWalkingComplete', completeEventHandler)
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve);
    });
  }
}