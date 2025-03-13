import './scss/styles.scss';
import { Component } from './components/base/Component';
import { EventEmitter, IEvents } from './components/base/events';
import { ensureElement } from './utils/utils';
import { IPage, IProduct } from './types/index';
import { API_URL, CDN_URL } from './utils/constants';
import { LarekAPI } from './components/LarekAPI';
import { AppState } from './components/AppData';
import { Page } from './components/Page';
import { ProductModel } from './components/model/ProductModel';
import { Card } from './components/view/Card';
import { Modal } from './components/view/Modal';
import { CardDetail } from './components/view/CardDetail';
import { Basket } from './components/view/Basket';
import { BasketModel } from './components/model/BasketModel';
import { BasketItem } from './components/view/BasketItem';

const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;

const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;

const cardDetailTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);
const appData = new AppState({}, events);
const page = new Page(document.body, events);
const productModel = new ProductModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(basketTemplate, events);
const basketModel = new BasketModel();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

api
	.getProductList()
	.then((result: IProduct[]) => {
		console.log(result);
		productModel.products = result;
		// appData.setCatalog(result);
	})
	.catch((err) => {
		console.error(err);
	});

events.on('cards:get', () => {
	productModel.products.forEach((item) => {
		const card = new Card(cardCatalogTemplate, events, {
			onClick: () => events.emit('card:select', item),
		});
		ensureElement<HTMLElement>('.gallery').append(card.render(item));
	});
});

events.on('card:select', (item: IProduct) => {
	productModel.setDetail(item);
});

events.on('modalCard:open', (item: IProduct) => {
	const cardDetail = new CardDetail(cardDetailTemplate, events);
	modal.content = cardDetail.render(item);
	modal.render();
});

events.on('modal:open', () => {
	modal.locked = true;
});

events.on('modal:close', () => {
	modal.locked = false;
});

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
	basket.counter(basketModel.getCounter());
	events.emit('basket:change');
	modal.close();
});

events.on('basket:open', () => {
	modal.content = basket.render();
	modal.render();
});

events.on('basket:basketItemRemove', (item: IProduct) => {
	basketModel.deleteCardToBasket(item);
	basket.counter(basketModel.getCounter());
	events.emit('basket:change');
});
