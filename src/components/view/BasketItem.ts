import { IActions, IBasketItem, IProduct } from '../../types';

export class BasketItem implements IBasketItem {
	private _basketItem: HTMLElement; // Шаблон корзины
	private _elements: {
		index: HTMLElement; // Индекс товара в корзине
		title: HTMLElement; // Заголовок товара
		price: HTMLElement; // Стоимость товара
		buttonDelete: HTMLButtonElement; // Кнопка для удаления товара из корзины
	};
	private _actions?: IActions; // Действия, связанные с элементом (например, обработчик удаления)

	// Конструктор, который принимает шаблон, события и действия
	constructor(private template: HTMLTemplateElement, actions?: IActions) {
		this._basketItem = this.cloneTemplate(); // Копируем шаблон
		this._elements = this.setupElements(); // Инициализируем элементы
		this._actions = actions; // Присваиваем действия
		this.bindEvents(); // Привязываем события
	}

	// Копируем шаблон элемента корзины
	private cloneTemplate(): HTMLElement {
		const item = this.template.content.firstElementChild?.cloneNode(
			true
		) as HTMLElement;
		if (!item) throw new Error('Не удалось клонировать шаблон BasketItem'); // Ошибка, если клонирование не получилось выполнить
		return item;
	}

	// Инициализация элемента внутри корзины
	private setupElements(): {
		index: HTMLElement; // Индекс товара в корзине
		title: HTMLElement; // Заголовок товара
		price: HTMLElement; // Стоимость товара
		buttonDelete: HTMLButtonElement; // Кнопка для удаления товара из корзины
	} {
		return {
			index: this.getElement('.basket__item-index'), // Индекс товара в корзине
			title: this.getElement('.card__title'), // Название товара
			price: this.getElement('.card__price'), //  Стоимость товара
			buttonDelete: this.getElement<HTMLButtonElement>('.basket__item-delete'), // Кнопка для удаления товара из корзины
		};
	}

	// Получает элемент из корзины - выдает ошибку если элемента не обнаружено
	private getElement<T extends HTMLElement = HTMLElement>(selector: string): T {
		const element = this._basketItem.querySelector<T>(selector);
		if (!element) throw new Error(`Элемент ${selector} не обнаружен в шаблоне`); // Ошибка возникает если элемент не обнаружен
		return element;
	}

	// Добавление обработчика событий(например, для удаления товара)
	private bindEvents(): void {
		if (this._actions?.onClick) {
			// Если есть обработчик, привязываем его к кнопке удаления
			this._elements.buttonDelete.addEventListener(
				'click',
				(event: MouseEvent) => {
					event.stopPropagation(); // Останавливаем распространение события
					this._actions?.onClick(event); // Вызываем обработчик на кнопке
				}
			);
		}
	}

	// Форматируем цену для отображения
	private formatPrice(value: number | null): string {
		return value ? `${value} синапсов` : 'Без цены'; // Если цена не указана, выводим "Без цены"
	}

	// Обновляет текстовое содержимое элемента
	private updateText(element: HTMLElement, value: string): void {
		if (element.textContent !== value) {
			element.textContent = value;
		}
	}

	// Рендер элемента корзины с данными товара
	public render(data: IProduct, index: number): HTMLElement {
		this.updateText(this._elements.index, String(index)); // Обновление индекса товара
		this.updateText(this._elements.title, data.title); // Обновление названия товара
		this.updateText(this._elements.price, this.formatPrice(data.price)); // Обновление цены товара
		return this._basketItem; // Возвращаем элемент корзины с обновленными данными
	}
}
