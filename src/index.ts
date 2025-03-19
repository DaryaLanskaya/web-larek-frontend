import { Page } from './components/View/Page';
import { Success } from './components/View/Success';
import './scss/styles.scss';
import { EventEmitter, IEvents } from './components/base/Events';
import { ensureElement } from './utils/utils';
import { errorsForm, IOrderInfo, IProduct } from './types/index';
import { API_URL, CDN_URL } from './utils/constants';
import { LarekAPI } from './components/LarekAPI';
import { Card } from './components/View/Card';
import { Modal } from './components/View/Modal';
import { CardDetail } from './components/View/CardDetail';
import { BasketContent } from './components/View/BasketContent';
import { BasketModel } from './components/Model/BasketModel';
import { BasketItem } from './components/View/BasketItem';
import { OrderForm } from './components/View/OrderForm';
import { ProductModel } from './components/Model/ProductsModel';
import { FormModel } from './components/Model/FormModel';
import { ContactsForm } from './components/View/ContactsForm';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const cardDetailTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const orderTemplate = ensureElement<HTMLTemplateElement>('#order');

const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);
const productModel = new ProductModel(events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new BasketContent(basketTemplate, events);
const order = new OrderForm(orderTemplate, events);
const contacts = new ContactsForm(contactsTemplate, events);
const basketModel = new BasketModel();
const formModel = new FormModel(events);
const success = new Success(successTemplate, events);

// const OrderContent = new OrderContent();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

api
	.getProductList()
	.then((result: IProduct[]) => {
		console.log(result);
		productModel.products = result;
	})
	.catch((err) => {
		console.error(err);
	});

events.on('cards:get', () => {
	const cards: HTMLElement[] = [];
	productModel.products.forEach((item) => {
		const card = new Card(cardCatalogTemplate, events, {
			onClick: () => events.emit('card:select', item),
		});
		cards.push(card.render(item));

		// ensureElement<HTMLElement>('.gallery').append(card.render(item));
	});
	page.setCatalog(cards);
});

events.on('card:select', (item: IProduct) => {
	productModel.setDetail(item);
});

//  Модальные окна
events.on('modalCard:open', (item: IProduct) => {
	const cardDetail = new CardDetail(cardDetailTemplate, events);
	modal.content = cardDetail.render(item);
	modal.render();
});

events.on('modal:open', () => {
	page.setLocked(true);
});

events.on('modal:close', () => {
	page.setLocked(false);
});

// Корзина
events.on('basket:change', () => {
	basket.totalPrice(basketModel.getTotalPrice());
	const changedItems = basketModel.basketProducts.map((item, index) => {
		const basketItem = new BasketItem(cardBasketTemplate, {
			onClick: () => events.emit('basket:basketItemRemove', item),
		});
		return basketItem.render(item, index + 1);
	});
	basket.updateItems(changedItems);
});

events.on('card:addToCart', () => {
	basketModel.setSelectedCard(productModel.selected);
	page.setCounter(basketModel.getCounter());
	events.emit('basket:change');
	modal.close();
});

events.on('basket:open', () => {
	modal.content = basket.render();
	modal.render();
});

events.on('basket:basketItemRemove', (item: IProduct) => {
	basketModel.deleteCardToBasket(item);
	page.setCounter(basketModel.getCounter());
	events.emit('basket:change');
});

// Форма заказа

events.on('order:open', () => {
	modal.content = order.render();
	events.emit('modal:open');
});

events.on(
	'order:addressFieldChanged',
	(data: { field: string; value: string }) => {
		formModel.setOrderAddress(data.field, data.value);
	}
);

events.on('order:paymentMethodSelected', (data: { payment: string }) => {
	formModel.setPayment(data.payment);
	formModel.validateOrder();
});

events.on('order:submit', () => {
	if (formModel.validateOrder()) {
		events.emit('contacts:open');
	} else {
		events.emit('errorsForm:change', formModel.getErrors());
	}
});

// Форма контакта

events.on('contacts:open', () => {
	modal.content = contacts.render();
	modal.render();
});

events.on('errorsForm:change', (errors: errorsForm) => {
	order.errorMessages = Object.values(errors).filter(Boolean) as string[];
	contacts.errorMessages = Object.values(errors).filter(Boolean) as string[];
});

events.on('contacts:inputChanged', (data: { field: string; value: string }) => {
	formModel.setOrderData(data.field, data.value);
});

events.on('contacts:submit', () => {
	if (formModel.validateContacts()) {
		events.emit('success:open');
	} else {
		events.emit('errorsForm:change', formModel.getErrors());
	}
});
events.on('contacts:validate', () => {
	const isValid = formModel.validateContacts();
	events.emit('contacts:validityChanged', { isValid });
});

events.on('contacts:validityChanged', (data: { isValid: boolean }) => {
	contacts.isValid = data.isValid;
});

// Успешная отправка формы

events.on('success:open', () => {
	const orderData: IOrderInfo = {
		...formModel.getOrder(),
		total: basketModel.getTotalPrice(),
		items: basketModel.getProductIds(),
	};
	console.log('Формируемый заказ:', orderData);
	api
		.postOrder(orderData)
		.then(() => {
			modal.content = success.render(orderData.total);
			modal.render();

			basketModel.clearBasketProducts();
			page.setCounter(basketModel.getCounter());
			events.emit('basket:change'); // Обновляем корзину после успешного заказа
			events.emit('modal:open');
		})
		.catch((error) => {
			console.log(error);
			contacts.errorMessages = [
				'Не удалось оформить заказ. Проверьте данные и попробуйте снова.',
			];
			contacts.isValid = false;
			events.emit('modal:open');
		});
});

events.on('success:close', () => {
	modal.close();
});
