import { IPage } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Page extends Component<IPage> {
	protected _counter: HTMLElement; // Элемент счетчика
	protected _catalog: HTMLElement; // Элемент каталога
	protected _wrapper: HTMLElement; // Элемент враппера
	protected _basket: HTMLElement; // Элемент корзины

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container); // С помощью ключевого слова super подкласс может обратиться к функционалу базового класса

		this._counter = ensureElement<HTMLElement>('.header__basket-counter'); // Элемент счетчика
		this._catalog = ensureElement<HTMLElement>('.catalog__items'); // Элемент каталога
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper'); // Элемент враппера
		this._basket = ensureElement<HTMLElement>('.header__basket'); // Элемент корзины

		this._basket.addEventListener('click', () => {
			// Событие при клике на элемент корзины
			this.events.emit('bids:open');
		});
	}

	// Сеттер для счетчика
	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	// Сеттер для каталога
	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	// Сеттер для класса, блокирующего прокрутку страницы при открытии модального окна
	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
