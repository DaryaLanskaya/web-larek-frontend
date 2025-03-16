import { IPage } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Page extends Component<IPage> {
	protected _counter: HTMLElement; // защищенное свойство счетчик
	protected _catalog: HTMLElement; // защищенное свойство каталог
	protected _wrapper: HTMLElement; // защищенное свойство враппер
	protected _basket: HTMLElement; // защищенное свойство корзина

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container); // c помощью ключевого слова super подкласс может обратиться к функционалу базового класса.

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.catalog__items');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('bids:open');
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
