import BaseController from './BaseController.js';
import AddRestaurantPointView
    from '../render/views/AddRestaurantPointView/AddRestaurantPointView.js';
import RestaurantModel from '../models/RestaurantModel.js';
import EventBus from '../services/Events/EventBus.js';
import Event from '../services/Events/Events.js';

class AddRestaurantPointController extends BaseController {
    constructor(title = 'Админка') {
        super(title);
    }

    execute(matchData) {
        this.restId = matchData[0];
        RestaurantModel.getRestaurant(this.restId)
            .then((response) => {
                this.restName = response.name;
                super.execute(new AddRestaurantPointView({restaurant: response}));
            })
            .catch((err) => console.log(err));
    }

    startCatchEvents() {
        this.addUnbind(
            EventBus.subscribe(Event.addRestaurantPoint, this.AddPoint.bind(this)),
        );
    }

    AddPoint(data) {
        RestaurantModel.addPoint(data, this.restId)
            .then((response) => {
                if (response.message) {
                    EventBus.broadcast(Event.setPage, {
                        url: '/admin/restaurants',
                        message: 'Точка успешно добавлена',
                    });
                }
                if (response.error) {
                    EventBus.broadcast(Event.setPage, {
                        url: window.location.pathname,
                        message: 'Ошибка: ' + response.error,
                    });
                }
            })
            .catch((err) => console.log(err));
    }
}

export default new AddRestaurantPointController();
