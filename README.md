# Проектная работа "Веб-ларек"

## Стек

<a href="https://www.w3.org/TR/2011/WD-html5-20110405/"><img height="32" width="32" src="https://cdn.simpleicons.org/html5" /></a>
<a href="https://sass-lang.com/"><img height="32" width="32" src="https://cdn.simpleicons.org/sass" /></a>
<a href="https://www.typescriptlang.org/"><img height="32" width="32" src="https://cdn.simpleicons.org/typescript" /></a>
<a href="https://webpack.js.org/"><img height="32" width="32" src="https://cdn.simpleicons.org/webpack" /></a>

---

## Структура проекта

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

---

## Важные файлы

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

---

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

---

## Сборка

```
npm run build
```

или

```
yarn build
```

---

## Описание проекта

**"Веб-ларек"** — это интернет-магазин.  
Его ключевые компоненты включают главную страницу со списком товаров и иконкой корзины, а также различные модальные окна, которые позволяют пользователям просматривать детали товаров и оформлять заказы.

---

### Скриншоты

![](./screenshot-01.png)  
![](./screenshot-02.png)

---

## Макет проекта

Макет проекта можно посмотреть по [Ссылка на макет](https://www.figma.com/design/50YEgxY8IYDYj7UQu7yChb/Веб-ларёк?node-id=1-735&t=FMeANR9pPSSAO4YU-0)

## Интерфейсы и типы

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
	basketProducts: IProduct[];
	setSelectedCard(item: IProduct): void;
	deleteCardToBasket(item: IProduct): void;
	clearBasketProducts(): void;
	getCounter(): number;
	getTotalPrice(): number;
	getProductIds(): string[];
}

```

Интерфейс для модели корзины.  
Используются методы для взаимодействия с данными:

- Добавление товара в корзину.
- Удаление товара из корзины.
- Очистка всей корзину.
- Получение количества товаров в корзине.
- Получение общей стоимости всех товаров в корзине.
- Получение идентификаторов всех товаров в корзине.

### interface IBasket

```
export interface IBasket {
	counter(count: number): void;
	totalPrice(total: number): void;
	updateItems(items: HTMLElement[]): void;
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
Его функции:

- Возможность установить и снять слушателей событий.
- Вызвать слушателей при возникновении события.

### interface IEventData

```
export interface IEventData {
	element: HTMLElement;
	data?: Partial<IProduct>;
}
```

Интерфейс данных для передачи в eventEmitter(слушатель событий).  
Необходим для его корректной работы.

### interface ISuccess

```
export interface ISuccess {
	render(total: number): HTMLElement;
}
```

Интерфейс, который описывает успешную оплату товара.

### interface IOrderContent

```
export interface IOrderContent {
	valid: boolean;
	template: HTMLTemplateElement;
	render(): HTMLElement;
}
```

Интерфейс реализует контент оформления заказа.

### interface IOrderModel

```
export interface IOrderModel {
	formElement: HTMLFormElement;
	paymentButtons: HTMLButtonElement[];
	submitButton: HTMLButtonElement;
	errorDisplay: HTMLElement;
	render(): HTMLElement;
	setupEventListeners(): void;
	updateSubmitButton(): void;
}
```

Интерфейс для формы заказа.
Используются методы для взаимодействия с данными:

- Метод для рендеринга формы.
- Метод для настройки обработчиков событий.
- Метод для обновления состояния кнопки отправки.

### interface IOrderInfo

```
export interface IOrderInfo {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}
```

Интерфейс для данных заказа.

### interface IModalWork

```
export interface IModalWork {
	open(): void;
	close(): void;
	render(): HTMLElement;
}
```

Интерфейс для работы модальных окон.  
Используtтся метод для взаимодействия с данными:

- Метод для рендеринга модального окна.

### interface IActions

```
export interface IActions {
	onClick: (event: MouseEvent) => void;
}

```

Интерфейс клика мышки на элемент.

### interface IProductContent

```
export interface IProductContent {
	template: HTMLTemplateElement;
	render(product: IProduct): HTMLElement;
}

```

Интерфейс для отображения контента с карточкой товара.
Используtтся метод для взаимодействия с данными:

- Метод для рендеринга карточки товара.

### interface IPage

```
export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

```

Интерфейс для отображения страницы.

### interface ICardDetail

```
export interface ICardDetail {
	text: HTMLElement;
	button: HTMLButtonElement;
	render(data: IProduct): HTMLElement;
}

```

Интерфейс для вывода детальной карточки на страницу.
Используtтся метод для взаимодействия с данными:

- Метод для рендеринга карточки товара.

### interface IBasketItem

```
export interface IBasketItem {
	render(data: IProduct, index: number): HTMLElement;
}
```

Интерфейс для элемента корзины.
Используtтся метод для взаимодействия с данными:

- Метод для рендеринга элемента корзины.

---

## Архитектура приложения

Для разработки архитектуры приложения интернет-магазина был выбран шаблон **MVP**.  
Этот подход разделяет приложение на три основных уровня:

- **Модель (Model)**: Отвечает за бизнес-логику и управление данными.

- **Представление (View)**: Отображает информацию пользователю и обрабатывает его действия.

- **Презентер (Presenter)**: Выступает связующим звеном между моделью и представлением.  
   Все взаимодействия между моделью и представлением осуществляются только через презентер.

---

# Описание классов:

## Слой данных (Model)

Представлен следующими классами: ProductModel, BasketModel и FormModel.

#### Класс ProductModel

Класс отвечает за хранение и управление данными товарных карточек.  
Конструктор класса принимает экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `products: IProduct[]` - список объектов, представляющих товарные карточки.
- `selected: IProduct` - идентификатор карточки, выбранной для отображения в модальном окне.

Методы и события для взаимодействия с данными:

- `setDetail(item: IProduct): void` - установка полей товарной карточки.

#### Класс BasketModel

Класс управляет данными корзины, включая добавление и удаление товаров.  
Конструктор класса принимает экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `basketProducts: IProduct[]` - структура данных, содержащая сведения о товарах, находящихся в корзине.

Методы и события для взаимодействия с данными:

- `setSelectedCard(item: IProduct): void` - добавление товара в корзину.
- `deleteCardToBasket(item: IProduct): void` - удаление товара из корзины.
- `clearBasketProducts(): void` - очистить всю корзину.
- `clearBasketProducts(): void` - получить количество товаров в корзине.
- `getTotalPrice(): number` - очистить всю корзину.
- `getProductIds(): string[]` - получить идентификаторы всех товаров в корзине

#### Класс FormModel

Класс управляет хранением и логикой обработки формы.  
Конструктор класса принимает экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `payment: string` - cпособ оплаты.
- `email: string` - электронная почта.
- `phone: string` - телефон.
- `address: string` - адрес доставки.

Методы и события для взаимодействия с данными:

- `setOrderAddress(field: string, value: string): void` - установливает значение поля адреса.
- `validateOrder(): boolean` - проверяет правильность данных заказа.
- `setOrderData(field: string, value: string): void` - установливает данные для контактов.
- `validateContacts(): boolean` - проверяет правильность контактных данных.
- `getOrder(): Omit<IOrderInfo, 'total' | 'items'>` - получает данные заказа.
- `getErrors(): errorsForm;` - получает ошибки формы.

---

## Слой представления (View)

Каждый класс представления обеспечивает отображение переданных данных внутри заданного контейнера (DOM-элемента).

#### Класс Page

Отвечает за создание главной страницы — каталога товаров с отображением счётчика.  
Содержит набор сеттеров, которые управляют DOM-элементами главной страницы.  
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `_counter` - элемент счетчика на странице.
- `_catalog` - элемент каталога на странице.
- `_wrapper` - элемент обертки на странице.
- `_basket` - элемент корзины на странице.

Также есть следующие сеттеры:

- `counter` - меняет содержимое счетчика на полученное.
- `catalog` - меняет содержмое каталога на полученные элементы.
- `locked` - меняет класс обертки на значение, соответствующее переданному.
- Методы и события в классе:

- `bids:open` - событие при клике на элемент корзины.

#### Класс Card

Реализует карточку.  
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `_element` - шаблон карточки.
- `_title` - заголовок.
- `_price` - стоимость.
- `_image` - изображение.
- `_category` - категория.
- `_colors` - категории.

Методы и события в классе:

- `render(product: IProduct): HTMLElement` - получает готовый элемент.

#### Класс Modal

Обеспечивает отображение контента через модальное окно.  
Конструктор класса принимает HTMLElement (контейнер) и экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `сontainerModal: HTMLElement` - контейнер модального окна.
- `buttonClose: HTMLButtonElement` - кнопка закрытияь.
- `_content` - контент модального окна.
- `_wapperPage: HTMLElement` - wapper страницы.

Методы и события в классе:

- `element: HTMLElement` - получает готовый элемент.
- `modal: open` - открывает модальное окно.
- `modal: close` - закрывает модальное окно.
- `open()` - открывает модальное окно.
- `close()` - закрывает модальное окно.

#### Класс BasketContent

Отвечает за отображение содержимого корзины товаров.  
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `basketElement: HTMLElement` - шаблон корзины.
- `titleElement: HTMLElement` - заголовок корзины.
- `private itemListElement: HTMLElement` - список товаров в корзине.
- `actionButton: HTMLButtonElement` - кнопка - для перехода к оформлению заказа.
- `totalPriceElement: HTMLElement` - общая стоимость заказа.
- `headerButton: HTMLButtonElement` - кнопка корзины в header.
- `headerCounter: HTMLElement` - счётчик товаров в header.

Методы и события в классе:

- `order:open` - открывает форму оформления заказа.
- `basket:open` - закрывает корзину.
- `setupEventListeners(): void` - настройка обработчиков событий.
- `updateItems(items: HTMLElement[]): void` - обновление списка товаров в корзине.
- `сlearBasket(): void` - очистка корзины.
- `counter(count: number): void` - метод для отображения количества товаров в корзине (в header).
- `totalPrice(total: number): void` - метод для отображения общей стоимости товаров в корзине.
- `render(): HTMLElement` - получает готовый элемент.

#### Класс BasketItem

Отвечает за отображение элемента корзины с данными товара.
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий, действия.

В качестве полей класса используются следующие данные:

- `index: HTMLElement` - индекс товара в корзине.
- `title: HTMLElement` - заголовок товара.
- `price: HTMLElement` - стоимость товара.
- `buttonDelete: HTMLButtonElement` - кнопка для удаления товара из корзины.

Методы и события в классе:

- `cloneTemplate(): HTMLElement` - метод копирует шаблон элемента корзины.
- `setupElements()` - инициализация элемента внутри корзины.
- `bindEvents(): void` - метод добавляет обработчик событий.
- `formatPrice(value: number | null): string` - метод форматирует цену для отображения.
- `updateText(element: HTMLElement, value: string): void` - метод обновляет текстовое содержимое элемента.
- `render(data: IProduct, index: number): HTMLElement` - получает готовый элемент.

#### Класс Success

Отвечает за отображение контента успешного оформления заказа.  
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `successElement: HTMLElement` - элемент контейнера для успешного сообщения.
- `descriptionElement: HTMLElement` -элемент для описания успешного завершения.
- `closeButton: HTMLButtonElement` - кнопка для закрытия сообщения.

Методы и события в классе:

- `success:close` - обработчик для закрытия успешного сообщения.
- `setupEventListeners(): void` - метод для настройки обработчиков событий.
- `render(total: number): HTMLElement` - метод для рендеринга успешного сообщения с итоговой суммой.

#### Класс ContactsForm

Отображает контент контактов.  
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `formElement: HTMLFormElement` - элемент формы.
- `submitButton: HTMLButtonElement` - кнопка отправки.
- `errorDisplay: HTMLElement` - элемент для ошибок.
- `emailInput: HTMLInputElement` - поле email.
- `phoneInput: HTMLInputElement` - поле для телефона.

Методы и события в классе:

- `contacts:inputChanged` - изменения в полях формы.
- `contacts:submit` - отправка формы.
- `contacts:validate` - валидация формы.
- `setupEventListeners(): void` - используется для настройки обработчиков событий.
- `updateSubmitButton(): void` - используется для обновления состояния кнопки отправки.
- `render(): HTMLElement` - получает готовый элемент.

#### Класс OrderForm

Отображает контент оформления заказа.  
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий.

В качестве полей класса используются следующие данные:

- `formElement: HTMLFormElement` - элемент формы.
- `paymentButtons: HTMLButtonElement[]` - кнопки выбора метода оплаты.
- `submitButton: HTMLButtonElement` - кнопка отправки формы.
- `errorDisplay: HTMLElement` - элемент для ошибок.
- `addressInput: HTMLInputElement` - поле для ввода адреса.
- `selectedPayment: string | null = null` - переменная для выбранного метода оплаты.

Методы и события в классе:

- `order:paymentMethodSelected` - выбираем метод оплаты.
- `order:addressFieldChanged` - изменяем адрес.
- `order:submit` - отправляем событие отправки формы.
- `order:validate` - отправляем событие отправки формы.
- `setupEventListeners(): void` - используется для настройки обработчиков событий.
- `selectPayment(payment: string): void` - используется для выбора метода оплаты.
- `updateSubmitButton(): void` - используется для обновления состояния кнопки отправки.
- `render():HTMLElement` - получает готовый элемент.

#### Класс CardDetail

Отображает контент с карточкой товара.  
Конструктор класса принимает HTMLTemplateElement и экземпляр брокера событий, действие.

В качестве полей класса используются следующие данные:

- `text: HTMLElement;` - текст у продукта.
- `button: HTMLButtonElement` - кнопка "В корзину" у продукта.

Методы и события в классе:

- `getPriceText(value: number | null)` - метод который записывает текст стоимости.
- `render(product: IProduct): HTMLElement` - получает готовый элемент.

---

## Презентер (Presenter)

Логика взаимодействия между представлением и данными реализована в файле index.ts, который выступает в роли презентера.  
Взаимодействие происходит через события, генерируемые с использованием брокера событий, и их обработчики, описанные в index.ts.  
В index.ts сначала создаются экземпляры всех требуемых классов, после чего настраивается обработка событий.

## Базовый код

#### Класс Api

Включает основную логику взаимодействия с сервером, позволяя получать и отправлять данные.  
Конструктор принимает базовый URL сервера и объект с заголовками запросов.

Методы:

- `get` - GET запрос на Api и возвращает promise с объектом (которым ответил сервер)
- `post` - принимает объект с данными, далее они будут переданы в JSON в теле запроса, и отправлены на Api

#### Класс Event

Стандартная реализация брокера событий.  
Предоставляет возможность отправлять события и подписываться на них, отслеживая происходящие в системе изменения.  
Класс применяется в презентере для обработки событий и в различных слоях приложения для их генерации.

Методы, реализуемые классом описаны интерфейсом `IEvents`:

- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.
- `on` - подписка на событие.
- `emit` - инициализация события.
