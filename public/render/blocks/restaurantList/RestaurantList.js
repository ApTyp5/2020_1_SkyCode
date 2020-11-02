import Component from '../../Component.js';
import Restaurant from '../restaurant/Restaurant.js';
import template from './RestaurantList.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class RestaurantList extends Component {
    constructor({classes, restaurantArr}) {
        super(classes);
        super.template = template;
        this.addContextData({
            restaurantComponents: restaurantArr,
        });
        this.restArr = restaurantArr;
        this.id = 'restaurant-list';
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(Events.restCategorySelected, this.changeCategoryHandler.bind(this)),
        );
        super.bind();
    }

    changeCategoryHandler(catId) {
        this.addContextData({
            restaurantComponents: RestaurantList.formRestComponents(this.restArr, catId),
        });
        this.domElement.outerHTML = this.toString();
    }


    static filterRestCategories(restArr, catId = '-1') {
        if (catId === '-1') return restArr;
        return restArr.filter((rest) => rest.tagsIds.includes(catId));
    }

    static formRestComponents(restArr, catId = '-1') {
        const filteredRestArr = RestaurantList.filterRestCategories(restArr, catId);

        const restaurantComponents = [];
        for (const restaurant of filteredRestArr) {
            restaurantComponents.push(new Restaurant({
                classes: `restaurant-list__restaurant-${restaurant.id}`,
                name: restaurant.name,
                avgDeliveryTime: 30,
                rate: restaurant.rating,
                imageHref: `/images/${restaurant.image}`,
                href: `/restaurants/${restaurant.id}/products/1`,
            }));
        }

        return restaurantComponents;
    }
}
