import Component from '../../Component.js';
import Input from '../../elements/input/Input.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './ImageHref.hbs';

export default class ImageHref extends Component {
    constructor({
        id,
        src,
        href,
        classes = 'imageHref',
        imageClasses = 'imageClasses',
        needNewWindow = false,
    }) {
        super(classes, {
            image: new Input({
                type: 'image',
                classes: imageClasses,
                src,
                id,
            }),
            href,
            needNewWindow,
        });
        super.template = template;
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            console.trace('cat\' ret myself from DOM');
            return;
        }

        me.onclick = (event) => {
            event.preventDefault();
            EventBus.broadcast('set-page', {url: this.context.href});
        };
        super.bind();
    }

    unbind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
        super.unbind();
    }
}
