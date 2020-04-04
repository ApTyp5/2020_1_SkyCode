'use strict';

import EventBus from '../services/Events/EventBus.js';
import MainController from '../controllers/MainController.js';
import Controller404 from '../controllers/Controller404.js';
import ProfileController from '../controllers/ProfileController.js';
import LoginSignupController from '../controllers/LoginSignupController.js';
import RestaurantController from '../controllers/RestaurantController.js';
import CheckoutController from '../controllers/CheckoutController.js'
import AddProductByRestaurantController from '../controllers/AddProductByRestaurantController.js'
import BasketController from '../controllers/BasketController.js';


class Router {
    _currentController;

    constructor() {
        this._pages = [];
        this._registerAllPages();
        this._initControllers();
        EventBus.subscribe('set-page', (this._goto).bind(this));
        window.onpopstate = (this._handlePopState).bind(this);
    }

    _handlePopState(event) {
        // Невозможно сохранить актуальное состояние прошлой страницы, т.к. запись прошлой истории недоступна
        // Мы даже не знаем, было ли нажато hist.front() или hist.back(), чтобы при помощи обратных команд
        // выйти на нужные записи, изменить их и вернуться на текущую
        event.preventDefault();
        this._currentController.hide();
        [this._currentController, event.state.matchData] = this._matchUrl(window.location.pathname) || [Controller404];
        this._currentController.show(document.location, event.state);
    }

    _initControllers() {
        BasketController.startCatchEvents();
    }

    _goto({url}) {
        let state = {};

        if (this._currentController) {
            state = this._currentController.state || {};
            this._savePageStateInHistory(this._currentController);
            this._currentController.stop();
        }

        [this._currentController, state.matchData] = this._matchUrl(url) || [Controller404];

        this._setNewHistoryRecord(this._currentController, url);
        this._currentController.run(state);
    }

    _savePageStateInHistory(page) {
        history.replaceState(page.state, page.title); // url the same
    }

    _setNewHistoryRecord(page, url) {
        history.pushState(page.state, page.title, url);
    }

    _registerAllPages() {
        this._registerPage(MainController, '/');
        this._registerPage(ProfileController, '/me');
        this._registerPage(LoginSignupController, '/login');
        this._registerPage(LoginSignupController, '/signup');
        this._registerPage(RestaurantController, '/restaurants');
        this._registerPage(CheckoutController, '/checkout');
        this._registerPage(AddProductByRestaurantController, '/add');
    }

    _registerPage(controller, path) {
        this._pages.push({
            pattern: new RegExp('^' + path.replace(/:\w+/, '(\w+)') + '$'),
            page: controller,
        });
    }

    _matchUrl(url) {
        for (const pg of this._pages) {
            let matchData = url.match(pg.pattern);

            if (matchData) {
                return [pg.page, matchData.slice(1)];
            }
        }
    }
}


export default new Router();