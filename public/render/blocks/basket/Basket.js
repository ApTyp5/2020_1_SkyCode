import Component from '../../Component.js';
import BasketProduct from '../basketProduct/BasketProduct.js';
import template from './Basket.hbs';
import EventBus from '../../../services/Events/EventBus.js';
import Events from '../../../services/Events/Events';


export default class Basket extends Component {
    constructor({classes, basket}) {
        super(classes);
        super.template = template;

        this.addBasketContext(basket);
    }

    addBasketContext(basket) {
        const basketProducts = [];

        for (const id in basket) {
            basketProducts.push(new BasketProduct({
                classes: 'basket__basket-product',
                name: basket[id].name,
                imageHref: `/images/${basket[id].image}`,
                quantity: basket[id].amount,
                cost: basket[id].price,
                id: `prod-in-basket-${basket[id].id}`,
                mainId: id,
            }));
        }

        super.addContextData({basketProducts});
    }

    basketChangedHandler(basket) {
        this.addBasketContext(basket);
        this.domElement.innerHTML = this.toString();
        super.bind();
    }

    bind() {
        EventBus.subscribe(Events.updateBasket, this.basketChangedHandler.bind(this));
        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(Events.updateBasket, this.basketChangedHandler.bind(this));
        super.unbind();
    }
}
