import { ICard, IProduct, IActions } from '../../types';
import { IEvents } from '../base/Events';

export class Card implements ICard {
	protected _element: HTMLElement; // шаблон карточки
	protected _title: HTMLElement; // шаблон заголовка
	protected _price: HTMLElement; // шаблон цены
	protected _image?: HTMLImageElement; // шаблон картинки
	protected _category?: HTMLElement; // шаблон категории
	protected _colors = <Record<string, string>>{
		дополнительное: 'additional',
		'софт-скил': 'soft',
		кнопка: 'button',
		'хард-скил': 'hard',
		другое: 'other',
	};
	constructor(
		template: HTMLTemplateElement,
		protected events: IEvents,
		actions?: IActions
	) {
		this._element = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this._title = this._element.querySelector('.card__title');
		this._price = this._element.querySelector('.card__price');
		this._image = this._element.querySelector(
			'.card__image'
		) as HTMLImageElement;
		this._category = this._element.querySelector('.card__category');

		if (actions?.onClick) {
			this.addEventListener(this._element, 'click', actions.onClick);
		}
	}

	private addEventListener(
		element: HTMLElement,
		event: string,
		handler: EventListener
	): void {
		element.addEventListener(event, handler); // Навешиваем обработчик событий на элемент(клик)
	}

	protected setPrice(value: number | null): string {
		// Запрос set на цену
		return value ? `${value} синапсов` : 'Без цены';
	}

	protected setTitle(element: HTMLElement, value: unknown): string {
		// Запрос set на заголовок
		return element ? (element.textContent = String(value)) : '';
	}

	protected setImage(src: string, alt: string): void {
		// Запрос set на картинку
		this._image.src = src;
		this._image.alt = alt;
	}

	// // Метод для установки категории товара
	private setCategory(category: string): void {
		this._category.textContent = category; // Устанавливаем текст категории
		this._category.className = `card__category card__category_${
			this._colors[category] || 'default'
		}`; // Устанавливаем класс в зависимости от категории
	}

	render(data: IProduct): HTMLElement {
		this.setCategory(data.category);

		this.setTitle(this._title, data.title);
		this.setImage(data.image, data.title);
		this._price.textContent = this.setPrice(data.price);
		return this._element;
	}
}
