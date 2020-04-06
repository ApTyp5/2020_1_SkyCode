import Component from '../../Component.js';
import EventBus from '../../../services/Events/EventBus.js';

export default class Href extends Component {
    constructor({text, href, classes = 'href'}) {
        super();
        this.addClasses(classes);
        this.addContextData({
            text,
            href,
        }, false);
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            console.trace('cat\' ret myself from DOM');
            return;
        }

        me.onclick = function(event) {
            event.preventDefault();
            console.log('href ' + this.href + ' clicked');
            EventBus.publish('set-page', {url: this.context.href});
        }.bind(this);
        console.log('qwe');
    }

    unbind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
