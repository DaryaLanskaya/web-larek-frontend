import { Card } from './Card';
import { IActions, ICardDetail } from '../../types';
import { IEvents } from '../base/Events';

export class CardDetail extends Card implements ICardDetail {
	text: HTMLElement;
	button: HTMLButtonElement;

	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		super(template, events, actions);
		this.text = this._element.querySelector('.card__text');
		this.button = this._element.querySelector('.card__button');
		this.button.addEventListener('click', () => {
			this.events.emit('card:addToCart');
		});
	}

	protected getPriceText(value: number | null) {
		return value ? `${value} синапсов` : 'Без цены';
	}

	setButtonState(text: 'Купить' | 'Не продаётся'): void {
		this.button.textContent = text;
		switch (text) {
			case 'Купить': {
				this.button.disabled = false;
				break;
			}
			case 'Не продаётся': {
				this.button.disabled = true;
				break;
			}
		}
	}
}
