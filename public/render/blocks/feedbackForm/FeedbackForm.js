import Component from '../../Component';
import Button from '../../elements/button/Button';
import template from './FeedbackForm.hbs';
import RestaurantModel from '../../../models/RestaurantModel';
import Textarea from '../../elements/textarea/Textarea';
import NumberInput from '../../elements/numberInput/NumberInput';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';
import Router from '../../../routing/Router';


export default class FeedbackForm extends Component {
    constructor({
        classes,
        rate = 0,
        text,
        restaurantId,
        oldReview,
    }) {
        const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
        super(classes, {
            rate: strRate,
            RateInput: new NumberInput({
                classes: 'feedback-form__rate-input',
                id: 'feedback-form__rate-input',
                min: 1,
                max: 5,
                value: rate,
                changeEventBasis: 'feedback-rate',
                isVertical: false,
            }),
            TextInput: new Textarea({
                classes: 'feedback-form__text-input',
                id: 'text-input',
                minLength: 2,
                maxLength: 255,
                isRequired: true,
                placeholder: 'Поделитесь своими впечатлениями',
                value: text,
            }),
        });

        super.template = template;
        super.addContextData({
            SubmitButton: new Button({
                id: 'feedback-form__submit-button',
                classes: 'feedback-form__submit',
                text: oldReview === null ? 'Сохранить' : 'Изменить',
                callback: () => {
                    const body = {
                        rate: Number(this.context.RateInput.getValue()),
                        text: this.context.TextInput.domElement.value,
                    };

                    this.context.SubmitButton.domElement
                        .setAttribute('disabled', 'disabled');
                    if (oldReview === null) {
                        RestaurantModel
                            .addRestaurantReview(restaurantId, JSON.stringify(body))
                            .then((resp) => {
                                if (resp.error) throw resp.error;
                                Router.reload(body.text.length === 0 ? 'Ваша'
                                        + ' оценка учтена. Оценки без отзывов'
                                        + ' не показываются в общем списке'
                                    : 'Ваш отзыв успешно' + ' добавлен');
                            })
                            .catch((err) => {
                                Router.reload('Ошибка добавления'
                                    + ' отзыва: ' + err);
                            })
                            .finally(() => {
                                this.context.submitButton.domElement
                                    .removeAttribute('disabled')
                            })
                    } else {
                        RestaurantModel
                            .changeRestaurantReview(oldReview.id, JSON.stringify(body))
                            .then((response) => {
                                Router.reload(body.text.length === 0 ? 'Ваша'
                                    + ' оценка учтена. Оценки без отзывов'
                                    + ' не показываются в общем списке'
                                    : 'Ваш отзыв успешно изменён');
                            })
                            .catch((err) => {
                                Router.reload('Ошибка изменения отзыва: ' + err);
                            })
                            .finally(() => {
                                this.context.submitButton.domElement
                                    .removeAttribute('disabled')
                            })
                    }
                },
            }),
        });
    }

    bind() {
        this.addUnbind(
            EventBus.subscribe(NumberInput.changeEvent('feedback-rate'), (rate) => {
                const strRate = rate === 0 ? '⭐' : '⭐'.repeat(Math.round(Number(rate)));
                document.getElementById('feedback-form__stars').innerText = strRate;
            }),
        );
        super.bind();
    }
}
