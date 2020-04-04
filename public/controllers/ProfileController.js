import BaseController from './BaseController.js';
import ProfileView from '../render/views/ProfileView/ProfileView.js';
import UserModel from '../models/UserModel.js';
import EventBus from '../services/Events/EventBus.js';
import SessionModel from '../models/SessionModel.js';

class ProfileController extends BaseController {
    constructor(title = 'profile page') {
        super(title);
    }

    run() {
        UserModel
            .getUser()
            .then(response =>  {
                if (response.error === 'Unauthorized') {
                    EventBus.publish('redirect', {url: '/login'});
                } else {
                    super.run(new ProfileView({profile: response}));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    startCatchEvents() {
        EventBus.subscribe('update-user', this.updateBioCb.bind(this));
        EventBus.subscribe('avatar-update', this.updateAvatarCb.bind(this));
        EventBus.subscribe('log-out', this.logOut.bind(this));
    }

    stopCatchEvents() {
        EventBus.unsubscribe('update-user', this.updateBioCb.bind(this));
        EventBus.unsubscribe('avatar-update', this.updateAvatarCb.bind(this));
        EventBus.unsubscribe('log-out', this.logOut.bind(this));
    }

    logOut() {
        console.log('qwer');
        SessionModel.logout().then(() => {
           EventBus.publish('set-page', {url: '/login'});
        }).catch(err => {
            console.log(err);
        });
    }

    updateBioCb(data) {
        UserModel.updateUser(data).then(() => {
            EventBus.publish('set-page', {url: '/me'});
        }).catch(err => console.log(err));
    }

    updateAvatarCb(data) {
        console.log('AvaCb');
        UserModel.updateAvatar(data).then(() => {
            EventBus.publish('set-page', {url: '/me'});
        }).catch(err => console.log(err));
    }
}


export default new ProfileController();
