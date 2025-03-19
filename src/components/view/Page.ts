import { IPage } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export class Page implements IPage {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(private template: HTMLElement, private events: IEvents) {
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	// Отображение количества товаров в корзине (в header)
	public setCounter(value: number) {
		this._counter.textContent = String(value); // Обновляем счётчик в header
	}

	public setCatalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	// Меняет класс обертки на значение, соответствующее переданному
	public setLocked(value: boolean) {
		value
			? this._wrapper.classList.add('page__wrapper_locked')
			: this._wrapper.classList.remove('page__wrapper_locked');
	}
}
