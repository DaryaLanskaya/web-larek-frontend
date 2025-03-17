// Интерфейс товара
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

//Интерфейс для вывода массива товаров
export interface IProducts {
	total: number | null;
	items: IProduct[];
}

//Интерфейс для вывода карточек на страницу
export interface ICard {
	render(data: IProduct): HTMLElement;
}

// Интерфейс ошибки сервера
export interface IErrorMessage {
	error: string;
}

// Интерфейс для модели корзины
export interface IBasketModel {
	basketProducts: IProduct[]; // Список товаров в корзине
	setSelectedCard(item: IProduct): void; // Добавить товар в корзину
	deleteCardToBasket(item: IProduct): void; // Удалить товар из корзины
	clearBasketProducts(): void; // Очистить всю корзину
	getCounter(): number; // Получить количество товаров в корзине
	getTotalPrice(): number; // Получить общую стоимость всех товаров в корзине
	getProductIds(): string[]; // Получить идентификаторы всех товаров в корзине
}

// Интерфейс для представления корзины
export interface IBasket {
	counter(count: number): void; // Рендерит количество товаров в корзине
	totalPrice(total: number): void; // Рендерит общую стоимость товаров
	updateItems(items: HTMLElement[]): void; // Обновляет список товаров в корзине
	render(): HTMLElement; // Рендерит корзину
}

// Интерфейс eventEmitter - обеспечивает работу событий(слушатель событий)
export interface IEventEmitter {
	emit: (event: string, data?: unknown) => void;
}

// Интерфейс данных для передачи в eventEmitter
export interface IEventData {
	element: HTMLElement;
	data?: Partial<IProduct>;
}

// Интерфейс успешной оплаты товара
export interface ISuccess {
	render(total: number): HTMLElement;
}

// Интерфейс реализует контент оформления заказа
export interface IOrderContent {
	valid: boolean;
	template: HTMLTemplateElement;
	render(): HTMLElement;
}

// Интерфейс для формы заказа
export interface IOrderModel {
	formElement: HTMLFormElement; // Элемент формы
	paymentButtons: HTMLButtonElement[]; // Кнопки выбора метода оплаты
	submitButton: HTMLButtonElement; // Кнопка отправки формы
	errorDisplay: HTMLElement; // Элемент для отображения ошибок
	render(): HTMLElement; // Метод для рендеринга формы
	setupEventListeners(): void; // Метод для настройки обработчиков событий
	updateSubmitButton(): void; // Метод для обновления состояния кнопки отправки
}

// Интерфейс для данных заказа
export interface IOrderInfo {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

// Интерфейс для результата обработки заказа
export interface IOrderResult {
	success: boolean;
	message: string;
}

// Интерфейс для работы модальных окон
export interface IModalWork {
	open(): void;
	close(): void;
	render(): HTMLElement;
}

// Интерфейс клика мышки на элемент
export interface IActions {
	onClick: (event: MouseEvent) => void;
}

// Интерфейс для отображения контента с карточкой товара.
export interface IProductContent {
	template: HTMLTemplateElement;
	render(product: IProduct): HTMLElement;
}

// Интерфейс для отображения страницы
export interface IPage {
	counter: number; // меняет содержимое счетчика на полученное.
	catalog: HTMLElement[]; // меняет содержмое каталога на полученные элементы.
	locked: boolean; // меняет класс обертки на значение, соответствующее переданному.
}

// Интерфейс для вывода детальной карточки на страницу
export interface ICardDetail {
	text: HTMLElement;
	button: HTMLButtonElement;
	render(data: IProduct): HTMLElement;
}

// Интерфейс для элемента корзины
export interface IBasketItem {
	render(data: IProduct, index: number): HTMLElement; // Метод для рендеринга элемента корзины
}

// Тип оплаты товара
export enum PaymentType {
	оnline = 'online',
	сash = 'cash',
}

// Формы

// Интерфейс реализует контент контактов
export interface IContactsModel {
	formElement: HTMLFormElement; // Элемент формы
	submitButton: HTMLButtonElement; // Кнопка отправки
	errorDisplay: HTMLElement; // Элемент для отображения ошибок
	emailInput: HTMLInputElement; // Поле для email
	phoneInput: HTMLInputElement; // Поле для телефона
	setupEventListeners(): void; // Метод для настройки обработчиков событий
	updateSubmitButton(): void; // Метод для обновления состояния кнопки отправки
	set isValid(isValid: boolean); // Сеттер для установки валидности формы
	set errorMessages(messages: string[]); // Сеттер для отображения ошибок
	render(): HTMLElement; // Метод для рендеринга формы
}

export interface IAppState {
	catalog: IProduct[];
}

// Интерфейс для продуктов
export interface IProductModel {
	products: IProduct[];
	selected: IProduct;
	setDetail(item: IProduct): void;
}

// Интерфейс для ошибок формы
export interface errorsForm {
	address?: string;
	payment?: string;
	email?: string;
	phone?: string;
}

// Интерфейс формы
export interface IFormModel {
	payment: string; // Способ оплаты
	email: string; // Электронная почта
	phone: string; // Телефон
	address: string; // Адрес доставки
	setOrderAddress(field: string, value: string): void; // Установить значение поля адреса
	validateOrder(): boolean; // Проверить правильность данных заказа
	setOrderData(field: string, value: string): void; // Установить данные для контактов
	validateContacts(): boolean; // Проверить правильность контактных данных
	getOrder(): Omit<IOrderInfo, 'total' | 'items'>; // Получить данные заказа
	getErrors(): errorsForm; // Получить ошибки формы
}
