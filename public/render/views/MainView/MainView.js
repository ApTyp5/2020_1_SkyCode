import temp from './MainView.hbs';
import SelectTimeButton from '../../blocks/selectTimeButton/SelectTimeButton';
import ActionBar from '../../blocks/actionBar/ActionBar';
import CategoryBar from '../../blocks/categoryBar/CategoryBar';
import RestaurantList from '../../blocks/restaurantList/RestaurantList';
import Component from '../../Component';
import RecommendBar from '../../blocks/RecommendBar/RecommendBar';
import Pagination from '../../blocks/Pagination/Pagination';
import Events from '../../../services/Events/Events';

export default class MainView extends Component {
    constructor({actionArr, categoryArr, recommendArr, restaurantArr, page, count, total}) {
        super();
        this.template = temp;
        const message = sessionStorage.message;
        const catId = sessionStorage.getItem(Events.restCategorySelected);
        console.log(total, 'total');
        const restNum = RestaurantList.filterRestCategories(restaurantArr, catId).length;
        console.log(restNum, 'restNum');
        sessionStorage.message = '';

        this.addContextData({
            Pagination: new Pagination({
                classes: '',
                first: 1,
                current: Number(page),
                last: Math.floor(Number(restNum) / Number(count))
                    + (Number(restNum) % Number(count) !== 0),
                hrefBase: '/restaurant_list/',
            }),
            message,
            label: 'Рестораны',
            selectTimeButton: new SelectTimeButton({
                classes: 'main-view__select-time-button',
                imageHref: 'static/clock.svg',
                text: 'Доставка: сейчас',
                callback: () => 0,
            }),
            actionBar: new ActionBar({
                classes: 'action-bar',
                actionArr,
            }),
            categoryBar: new CategoryBar({
                classes: 'category-bar',
                categoryArr,
            }),
            restaurantList: new RestaurantList({
                classes: 'main-view__restaurant-list',
                restaurantArr,
                catId,
            }),
        });
        if (recommendArr && recommendArr.length > 0) {
            this.addContextData({
                RecommendBar: new RecommendBar({
                    recommendArr,
                }),
            });
        }
    }
}
