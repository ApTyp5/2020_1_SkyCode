'use strict';

class EventBus {
    constructor() {
        if (EventBus.instance) {
            return EventBus.instance;
        }
        this.events = {};
        EventBus.instance = this;
        return this;
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    unsubscribe(event, callback) {
        if (this.events[event]) {
            const index = this.events[event].indexOf(callback);
            if (index === -1) return;
            this.events[event].splice(index, 1);
        }
    }

    publish(event, data) {
        console.log(event, data);
        const callbacks = this.events[event];
        if (!callbacks || !callbacks.length) {
            return;
        }
        callbacks.forEach((callback) => callback(data));
    }
}

export default new EventBus();
