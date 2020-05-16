import template from './RestaurantInfoView.hbs';
import BaseView from '../BaseView/BaseView';
import Component from '../../Component.js';
import RestaurantBanner from '../../blocks/restaurantBanner/restaurantBanner.js';
import Href from '../../elements/href/Href.js';
import FeedbackForm from '../../blocks/feedbackForm/FeedbackForm.js';
import RestaurantFeedbackCard
    from '../../blocks/restaurantFeedbackCard/RestaurantFeedbackCard.js';
import IconedHeader from '../../blocks/iconedHeader/IconedHeader';
import WavingMenue from '../../blocks/wavingMenue/WavingMenue';
import NeonButton from '../../elements/neonButton/NeonButton';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import UserController from '../../../controllers/UserController';


export default class RestaurantInfoView extends BaseView {
    constructor({
        feedbackObject,
        restaurant,
        user,
    }) {
        super({
            Main: new MainArea({
                classes: 'restaurant-feedback',
                restaurantId: restaurant.id,
                currentReview: feedbackObject.current,
                allReview: feedbackObject.reviews,
                restaurant,
                user,
            }),
            Header: new IconedHeader({classes: 'base-view__header'}),
            LeftBar: new WavingMenue(),
        });
    }
}


class MainArea extends Component {
    constructor({
        classes,
        restaurant,
        allReview: allReviews,
        currentReview,
        restaurantId,
    }) {
        const message = sessionStorage.message || '';
        sessionStorage.message = '';

        super(classes, {
            RestaurantBanner: new RestaurantBanner({
                classes: 'restaurant-banner',
                imgHref: `/images/${restaurant.image}`,
                rate: restaurant.rating,
                name: restaurant.name,
            }),
            BackHref: new Href({
                classes: 'restaurant-feedback__back-href',
                text: 'Назад',
                href: `/restaurants/${restaurant.id}`,
            }),
            userLogined: UserController.logined,
            message,
        });

        if (!UserController.logined) {
            this.addContextData({
                Login: new NeonButton({
                    classes: 'restaurant-feedback__login-signup',
                    text: 'Войдите',
                    id: 'restaurant-feedback__login',
                    callback: () => {
                        EventBus.publish(Events.loginRequest);
                    },
                }),
                Signup: new NeonButton({
                    classes: 'restaurant-feedback__login-signup',
                    text: 'Зарегестрируйтесь',
                    id: 'restaurant-feedback__signup',
                    callback: () => {
                        EventBus.publish(Events.signupRequest);
                    },
                }),
            });
        } else {
            this.addContextData({
                FeedbackForm: new FeedbackForm({
                    classes: 'restaurant-feedback__feedback-form',
                    rate: (currentReview && currentReview.rate) || 5,
                    text: currentReview && currentReview.text,
                    restaurantId,
                    oldReview: currentReview,
                }),
            });
        }

        const Feedback = [];
        for (const review of allReviews) {
            Feedback.push(new RestaurantFeedbackCard({
                classes: 'restaurant-feedback__card',
                name: review.author.firstName + ' ' + review.author.lastName,
                rate: review.rate,
                text: review.text,
                date: review.date,
            }));
        }

        super.addContextData({Feedback});
        super.template = template;
    }

    bind() {
        EventBus.subscribe(Events.successLogin, () => {
            EventBus.publish(Events.setPage, {url: window.location.pathname});
        });
        EventBus.subscribe(Events.successSignup, () => {
            EventBus.publish(Events.setPage, {url: window.location.pathname});
        });
        super.bind();
    }

    unbind() {
        EventBus.unsubscribe(Events.successLogin, () => {
            EventBus.publish(Events.setPage, {url: window.location.pathname});
        });
        EventBus.unsubscribe(Events.successSignup, () => {
            EventBus.publish(Events.setPage, {url: window.location.pathname});
        });
        super.unbind();
    }
}
