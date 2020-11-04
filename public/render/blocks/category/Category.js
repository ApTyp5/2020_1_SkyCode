import Component from '../../Component.js';
import template from './Category.hbs';
import EventBus from '../../../services/Events/EventBus';
import Events from '../../../services/Events/Events';

export default class Category extends Component {
    constructor({id, src, text, classes = ''}) {
        super(classes, {
            src,
            text,
        }, Category.categoryId(id), template);
        this.catId = id;
    }

    bind() {
        this.domElement.onclick = () => {
            sessionStorage.setItem(Events.restCategorySelected, this.catId);
            EventBus.broadcast(
                Events.setPage,
                {url: '/restaurant_list/1'},
            );
        };
        super.bind();
    }

    unbind() {
        this.domElement.onclick = null;
        super.unbind();
    }

    static categoryId(id) {
        return 'category_' + id;
    }
}
