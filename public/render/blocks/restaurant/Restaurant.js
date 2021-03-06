import Component from '../../Component.js';
import Img from '../../elements/img/Img.js';
import EventBus from '../../../services/Events/EventBus.js';
import template from './Restaurant.hbs';
import Events from '../../../services/Events/Events';

export default class Restaurant extends Component {
    constructor({classes, name, imageHref, rate, avgDeliveryTime, href}) {
        const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
        super(classes, {
            name,
            rate: strRate,
            href,
            avgDeliveryMinTime: avgDeliveryTime,
            avgDeliveryMaxTime: avgDeliveryTime + 5,
            img: new Img({
                classes: 'restaurant__img',
                src: imageHref,
                alt: 'can\'t load image',
            }),
        });

        super.template = template;
    }

    bind() {
        const me = super.domElement;
        if (me === undefined) {
            return;
        }

        me.onclick = function(event) {
            event.preventDefault();
            EventBus.broadcast(Events.setPage, {url: this.context.href});
        }.bind(this);
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
