import './css/styles.css';
import NewApiServece from './js/new_servece';
import { searchImages } from 'pixabay-api';
import { authenticate } from 'pixabay-api';
import Notiflix from 'notiflix';
import axios from 'axios';


Notiflix.Notify.init({});


const newsApiServece = new NewApiServece();

const AUTH_KEY = '25733083-6fb5f00a765a6584c0251bed0';

const refs = {
  divGallery: document.querySelector('.gallery'),
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  btn: document.querySelector('button'),
};

const input = document.querySelector('input');
input.setAttribute('id', 'searchQuery')

 
  refs.loadMoreBtn.setAttribute('disabled', 'disabled');

   
 refs.searchForm.addEventListener('submit', onSearch);

refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
   e.preventDefault();

    clearGallery();    

  newsApiServece.query = e.currentTarget.elements.searchQuery.value;  

  if (newsApiServece.query === '') {
    return Notiflix.Notify.failure('Введите название изображения');
  }

    refs.loadMoreBtn.disabled = true;
    newsApiServece.resetPage();

    refs.loadMoreBtn.disabled = false;

   getQuery();
   newsApiServece.incrementPage()
   refs.loadMoreBtn.disabled = false;
}

function onLoadMore() {
   refs.loadMoreBtn.disabled = true;
   
  getQuery();
  newsApiServece.incrementPage()
   refs.loadMoreBtn.disabled = false;
}

function clearGallery() {
  refs.divGallery.innerHTML = '';
};

async function getQuery() {
  await axios.get(`https://pixabay.com/api/?key=25733083-6fb5f00a765a6584c0251bed0&q=${newsApiServece.searchQuery}&orientation=horizontal&safesearch=true&image_type=photo&page=${newsApiServece.page}&per_page=40`).then(res =>  renderImage(res.data.hits));
}
 

function renderImage(hits) {
  const markup = hits.map(hit => `<a href="${hit.largeImageURL}">
  <div class="photo-card">
  <img src="${hit.webformatURL} alt="${hit.tags}" width="400" loading="lazy">
  <div class="info">
  <p class="info-item"><b>Likes: ${hit.likes}</b></p>
  <p class="info-item"><b>Views: ${hit.views}</b></p>
  <p class="info-item"><b>Comments: ${hit.comments}</b></p>
  <p class="info-item"><b>Downloads: ${hit.downloads}</b></p>
  </div>

  </div>
  
  </a>`).join('');
  refs.divGallery.innerHTML = markup;
}

window.addEventListener("scroll", (event) => {
   
    if(window.scrollY >= document.documentElement.scrollHeight-document.documentElement.clientHeight) {return Notiflix.Notify.info("We're sorry, but you've reached the end of search results."); }

});
 