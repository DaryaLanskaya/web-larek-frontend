# Проектная работа "Веб-ларек"

## Стек

<a href="https://www.w3.org/TR/2011/WD-html5-20110405/"><img height="32" width="32" src="https://cdn.simpleicons.org/html5" /></a>
<a href="https://sass-lang.com/"><img height="32" width="32" src="https://cdn.simpleicons.org/sass" /></a>
<a href="https://www.typescriptlang.org/"><img height="32" width="32" src="https://cdn.simpleicons.org/typescript" /></a>
<a href="https://webpack.js.org/"><img height="32" width="32" src="https://cdn.simpleicons.org/webpack" /></a>

## Структура проекта

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

## Важные файлы

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание проекта

"Веб-ларек" — это интернет-магазин.  
Его ключевые компоненты включают главную страницу со списком товаров и иконкой корзины, а также различные модальные окна, которые позволяют пользователям просматривать детали товаров и оформлять заказы.

## Макет проекта

Макет проекта можно посмотреть по [Ссылка на макет](https://www.figma.com/design/50YEgxY8IYDYj7UQu7yChb/Веб-ларёк?node-id=1-735&t=FMeANR9pPSSAO4YU-0)

## Архитектура приложения

Для разработки архитектуры приложения интернет-магазина был выбран шаблон MVP.  
Этот подход разделяет приложение на три основных уровня:

-Модель (Model): Отвечает за бизнес-логику и управление данными.

-Представление (View): Отображает информацию пользователю и обрабатывает его действия.

-Презентер (Presenter): Выступает связующим звеном между моделью и представлением. Все взаимодействия между моделью и представлением осуществляются только через презентер.

# Интерфейсы и типы

### interface IProduct

```
interface IProduct {
  	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

Используется для описания товара в магазине.  
Содержит ключевые характеристики: идентификатор, название, описание, категорию, изображение и цену.

### interface IProducts

```
export interface IProducts {
	total: number | null;
	items: IProduct[];
}
```

Нужен для описания массива всех товаров.

### interface ICard

```
export interface ICard {
	render(data: IProduct): HTMLElement;
}
```

Реализует карточку товара.  
Метод который используем:

- `render(product: IProduct): HTMLElement` - нужен для получиения готового элемента.

### interface IErrorMessage

```
export interface IErrorMessage {
	error: string;
}
```

Отвечает за вывод ошибки с сервера.

### interface IBasketModel

```
export interface IBasketModel {
	add(item: Partial<IProduct>): void;
	remove(item: Partial<IProduct>): void;
	clear(): void;
	total: number;
}
```

Отвечает за функциональность корзины товара.  
Используются методы для взаимодействия с данными(добавление товара в корзину, удаление товара из корзины).

### interface IBasketModel

```
export interface IBasketContent {
	template: HTMLTemplateElement;
	render(): HTMLElement;
}
```

Отвечает за отображение корзины товара на сайте.

### interface IEventEmitter

```
export interface IEventEmitter {
	emit: (event: string, data?: unknown) => void;
}
```

Интерфейс EventEmitter обеспечивает работу событий.  
Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

### interface IEventData

```
export interface IEventData {
	element: HTMLElement;
	data?: Partial<IProduct>;
}
```

Интерфейс данных для передачи в eventEmitter(слушатель событий).  
Необходим для его корректной работы.

### interface ISuccessContent

```
export interface ISuccessContent {
	template: HTMLTemplateElement;
	render(): HTMLElement;
}
```

Интерфейс, который описывает успешную оплату товара.

### interface IOrderResult

```
export interface IOrderResult {
	id: string;
	total: number;
}
```

Интерфейс для описания результата заказа товара.

### interface IRegistrationOrder

```
export interface IRegistrationOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}
```

Интерфейс формы оформления заказа товара.

### interface IOrderModel

```
export interface IOrderModel {
	order: IRegistrationOrder;
	isValid(order: IRegistrationOrder): boolean;
}
```

Интерфейс валидации формы оформления заказа товара.

### interface IModalWork

```
export interface IModalWork {
	openModal: (element: HTMLElement) => void;
	closeModal: () => void;
}
```

Интерфейс для работы модальных окон.

# События

#### События взаимодействия пользователя с интерфейсом:

- `modal: open` - событие открытия модального окна
- `modal: close` - событие закрытия модального окна
- `form-contacts: open` - открытие формы с номерами телефонов и email
- `adress: submit` - подтверждение формы с адресом заказа и способом оплаты
- `contacts: submit` - подтверждение и отправка заказа на сервер
- `success: close` - закрытие окна успешной отправки формы
- `formValidatedAddress: change` - изменение состояния валидации формы с адресом заказа и способом оплаты
- `formValidatedContacts: change` - изменение состояния валидации формы с номерами телефонов и email
- `form-adress: open` - открытие формы с адресом заказа и способом оплаты
- `basket: open` - открытие корзины товара
- `basket: removeproduct` - удаление карточки из корзины
- `basket: submit` - подтверждение данных корзины

#### Системные события:

- `products: changed` - изменение массива карточек
- `product: selected` - изменение открываемой в модальном окне карточки
