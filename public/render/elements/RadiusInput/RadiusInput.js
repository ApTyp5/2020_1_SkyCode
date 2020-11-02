import Input from '../input/Input';

export default class RadiusInput extends Input {
    constructor({classes, id}) {
        super({
            type: 'number',
            classes,
            id,
            isRequired: true,
            min: 0.1,
            max: 50,
        });
    }

    check() {
        const errors = super.check();
        if (errors !== '') return errors;

        const value = parseFloat(this.domElement.value);
        if (!isFinite(value)) return 'Ожидается вещественное число';
        return '';
    }
}
