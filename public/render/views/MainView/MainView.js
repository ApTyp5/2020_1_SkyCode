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
        const catId = sessionStorage.getItem(Events.restCategorySelected) || '-1';
        restaurantArr = RestaurantList.filterRestCategories(restaurantArr, catId);
        const restTotal = restaurantArr.length;
        const last = Math.floor(Number(restTotal) / Number(count))
            + (Number(restTotal) % Number(count) !== 0);
        console.log('catId', catId);
        console.log(restTotal, 'restTotal');
        console.log('last', last);
        console.log('filt rests', RestaurantList.filterRestCategories(restaurantArr, catId));
        console.log('rest arr', restaurantArr);
        console.log(total, 'total');
        console.log(page, 'page');
        console.log(count, 'count');
        console.log('shown rests:', restaurantArr.slice(page * count, (page + 1) * count));

        sessionStorage.message = '';

        this.addContextData({
            Pagination: new Pagination({
                classes: '',
                first: 1,
                current: Number(page),
                last,
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
                restaurantArr: restaurantArr.slice(page * count, (page + 1) * count),
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
