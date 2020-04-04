'use strict';

import BaseController from './BaseController.js';
import MainView from '../render/views/MainView/MainView.js';
import Mocks from '../mocks.js';
import RestaurantModel from '../models/RestaurantModel.js';

class MainController extends BaseController {
    constructor(title = 'main page') {
        super(title);
    }

    run() {
        RestaurantModel.getRestaurants().then(response => {
            console.log(response);
            const actions = Mocks.actions;
            const categories = Mocks.categories;
            super.run(new MainView({
                actionArr: actions,
                categoryArr: categories,
                restaurantArr: response.Restaurants,
                products: BaseController.basket,
            }));
        }).catch(err => console.log(err));

    }
}

export default new MainController();
