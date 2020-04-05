import BaseController from './BaseController.js';
import AddProductByRestaurantView from '../render/views/AddProductByRestaurantView/AddProductByRestaurantView.js';
import EventBus from '../services/Events/EventBus.js';
import RestaurantModel from '../models/RestaurantModel.js';
import UserModel from '../models/UserModel.js';
import Router from '../routing/Router.js';

class AddProductByRestaurantController extends BaseController {
    constructor(title = 'Add product') {
        super(title);
    }

    run() {
        super.run(new AddProductByRestaurantView());
    }

    startCatchEvents() {
        EventBus.subscribe('add-product-by-restaurant', this.addProductCb.bind(this));
        EventBus.subscribe('add-product-img-restaurant', this.addProductImgCb.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('add-product-by-restaurant', this.addProductCb.bind(this));
        EventBus.unsubscribe('add-product-img-restaurant', this.addProductImgCb.bind(this));
    }

    addProductCb(data) {
        RestaurantModel
            .addProduct(1, data)
            .then(response => {
            	if (response.error) {
            		EventBus.publish('add-product-error', response.error);
				} else if (response.message) {
                    EventBus.publish('set-page', {url: '/restaurants'});
                }
            })
            .catch(err => {
            	EventBus.publish('add-product-error', err);
            	console.log(err);
			});
    }

    addProductImgCb(data) {
        RestaurantModel.addProductImage(1, data).then(response => {
			if (response.error) {
				EventBus.publish('add-product-image-error', response.error);
			} else if (response.message) {
                EventBus.publish('set-page', {url: '/add'});
            }
        }).catch(err => console.log(err));
    }
}

export default new AddProductByRestaurantController();
