import Component from '../../Component.js';
import template from './OrderHistoryView.hbs';
import OrderHistory from '../../blocks/orderHistory/orderHistory.js';
import BaseView from '../BaseView/BaseView';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import Order from '../../blocks/order/Order';

export default class OrderHistoryView extends BaseView {
    constructor(orders) {
        super({
            Main: new MainArea(orders),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
            AddOnes: [
                new Order(),
            ],
        });
    }
}

class MainArea extends Component {
    constructor(orders) {
        const message = sessionStorage.message;
        sessionStorage.message = '';

        super();
        super.template = template;
        super.addContextData({
            message,
            orders: new OrderHistory({orders}),
        });
    }
}
