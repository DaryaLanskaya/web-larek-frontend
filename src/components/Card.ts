import { ICard, IProduct, IActions } from '../types';
import { Component } from './base/Component';
import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class Card implements ICard {
	protected _element: HTMLElement; // шаблон карточки
	protected _title: HTMLElement; // шаблон заголовка
	protected _price: HTMLElement; // шаблон цены
	protected _image?: HTMLImageElement; // шаблон картинки
	protected _category?: HTMLElement; // шаблон категории

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

	render(data: IProduct): HTMLElement {
		this._category.textContent = data.category;
		this.setTitle(this._title, data.title);
		this.setImage(data.image, data.title);
		this._price.textContent = this.setPrice(data.price);
		return this._element;
	}
}
