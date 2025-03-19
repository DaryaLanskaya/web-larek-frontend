import { ICard, IProduct, IActions } from '../../types';
import { IEvents } from '../base/Events';

export class Card implements ICard {
	protected _element: HTMLElement; // Шаблон карточки
	protected _title: HTMLElement; // Шаблон заголовка
	protected _price: HTMLElement; // Шаблон стоимости
	protected _image?: HTMLImageElement; // Шаблон изображения
	protected _category?: HTMLElement; // Шаблон категории
	protected _text?: HTMLElement; // Шаблон текста
	protected _colors = <Record<string, string>>{
		// Шаблон категорий
		дополнительное: 'additional',
		'софт-скил': 'soft',
		кнопка: 'button',
		'хард-скил': 'hard',
		другое: 'other',
	};

	constructor(
		template: HTMLTemplateElement, // Шаблон элемента
		protected events: IEvents, // Шаблон события
		actions?: IActions // Шаблон действия
	) {
		this._element = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement; // Копируем шаблон карточки
		this._title = this._element.querySelector('.card__title'); // Заголовок
		this._price = this._element.querySelector('.card__price'); // Стоимость
		this._text = this._element.querySelector('.card__text'); // Текст
		this._image = this._element.querySelector(
			// Изображение
			'.card__image'
		) as HTMLImageElement;
		this._category = this._element.querySelector('.card__category'); // Категория

		if (actions?.onClick) {
			this.addEventListener(this._element, 'click', actions.onClick);
		}
	}

	// Слушатель событий
	private addEventListener(
		element: HTMLElement,
		event: string,
		handler: EventListener
	): void {
		element.addEventListener(event, handler); // Навешиваем обработчик событий на элемент(при клике)
	}

	protected setPrice(value: number | null): string {
		// Запрос set на стоимость
		return value ? `${value} синапсов` : 'Без цены';
	}

	protected setTitle(element: HTMLElement, value: unknown): string {
		// Запрос set на заголовок
		return element ? (element.textContent = String(value)) : '';
	}

	protected setText(element: HTMLElement, value: unknown): string {
		// Запрос set на заголовок
		return element ? (element.textContent = String(value)) : '';
	}

	protected setImage(src: string, alt: string): void {
		// Запрос set на изображение
		this._image.src = src; // src изображения
		this._image.alt = alt; // alt изображения
	}

	// Метод для установки категории товара
	private setCategory(category: string): void {
		this._category.textContent = category; // Устанавливаем текст категории
		this._category.className = `card__category card__category_${
			this._colors[category] || 'default'
		}`; // Устанавливаем класс в зависимости от категории
	}

	// Рендер готового элемента
	render(data: IProduct): HTMLElement {
		this.setTitle(this._title, data.title); // Заголовок
		this.setText(this._text, data.description); // Заголовок
		this._price.textContent = this.setPrice(data.price); // Стоимость
		this.setImage(data.image, data.title); // Изображение
		this.setCategory(data.category); // Категория
		return this._element;
	}
}
