import Component from '../../Component.js';
import Header from '../../blocks/header/Header.js';
import ProfileTextArea from '../../blocks/profileTextArea/ProfileTextArea.js';
import ProfileAvatarArea from '../../blocks/profileAvatarArea/ProfileAvatarArea.js';

export default class ProfileView extends Component {
    constructor({profile, products}) {
        super();
        this.addContextData({
            Header: new Header({
                classes: 'header',
            }),
            ProfileTextArea: new ProfileTextArea({
                classes: 'profile-view__profile-text-area',
                phone: profile.phone,
                email: profile.email,
            }),
            ProfileAvatarArea: new ProfileAvatarArea({
                classes: 'profile-view__profile-avatar-area',
                avatar: profile.avatar,
            }),
        });
    }
}