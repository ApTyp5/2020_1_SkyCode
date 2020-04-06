import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './Restaurant.hbs';

export default class Restaurant extends Component {
    constructor({classes, name, imageHref, rate, avgDeliveryTime, href}) {
        super(classes, {name,
            rate,
            href,
            avgDeliveryMinTime: avgDeliveryTime,
            avgDeliveryMaxTime: avgDeliveryTime + 5,
            img: new Img({
                classes: 'restaurant__img',
                src: imageHref,
                alt: 'can\'t load image',
            }),
            rateImg: new Img({
                classes: 'restaurant__rate-img',
                src: 'static/star.svg',
                alt: 'cat\'t ;load star image',
            })});

        super.template = template;
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = function(event) {
            event.preventDefault();
            EventBus.publish('set-page', {url: this.context.href});
        }.bind(this);
    }

    unbind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = null;
    }
}
