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

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);
const appData = new AppState({}, events);
const page = new Page(document.body, events);
const productModel = new ProductModel(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const cardDetailTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;

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
