import Component from '../../Component.js';
import template from './supportChat.hbs';
import Input from '../../elements/input/Input.js';
import NeonButton from '../../elements/neonButton/NeonButton.js';
import EventBus from '../../../services/Events/EventBus';

export default class SupportChat extends Component {
    constructor({classes, username}) {
        if (username !== undefined) {
            super(classes, {
                Input: new Input({
                    type: 'text',
                    placeholder: 'Сообщение',
                    classes: 'message_input',
                }),
            });

            this.addContextData({
                SendButton: new NeonButton({
                    classes: 'send_button',
                    text: 'Send',
                    callback: () => {
                        const data = JSON.stringify({
                            message: this.context.Input.domElement.value,
                            chat_id: localStorage.getItem('chat_id'),
                            full_name: username,
                        });
                        console.log('send');
                        this.context.Input.domElement.value = '';
                        EventBus.publish('send-msg', data);},},
                ),
            });
        } else {
            super(classes, {
                Input: new Input({
                    type: 'text',
                    placeholder: 'Введите имя',
                    classes: 'message_input',
                }),
            });

            this.addContextData({
                SendButton: new NeonButton({
                    classes: 'username_button',
                    text: 'Начать',
                    callback: () => {
                        const data = JSON.stringify({
                            full_name: this.context.Input.domElement.value,
                        });
                        console.log('join');
                        EventBus.publish('join-chat', data);
                    },
                },
                ),
            });
        }

        super.template = template;
    }
}