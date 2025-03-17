import { Card } from './Card';
import { IActions, ICardDetail } from '../../types';
import { IEvents } from '../base/Events';

export class CardDetail extends Card implements ICardDetail {
	text: HTMLElement; // Текст у продукта
	button: HTMLButtonElement; // Кнопка "В корзину" у продукта

	constructor(
		template: HTMLTemplateElement, // Шаблон элемента
		protected events: IEvents, // Событие
		actions?: IActions // Действие
	) {
		super(template, events, actions);
		this.text = this._element.querySelector('.card__text'); // Текст у продукта
		this.button = this._element.querySelector('.card__button'); // Кнопка "В корзину" у продукта
		this.button.addEventListener('click', () => {
			this.events.emit('card:addToCart'); // Событие при клике на кнопку "В корзину"
		});
	}

	protected getPriceText(value: number | null) {
		return value ? `${value} синапсов` : 'Без цены'; // Записываем текст стоимости
	}
}
