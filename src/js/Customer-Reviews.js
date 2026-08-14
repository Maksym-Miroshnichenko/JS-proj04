import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const API_URL = 'https://deserts-store.b.goit.study/api/feedbacks?limit=10&page=1';
let swiperInstance = null;

function initSwiper() {
  if (swiperInstance) return; 

  swiperInstance = new Swiper('.feedback-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: '.swiper-btn-prev', 
      nextEl: '.swiper-btn-next',
    },
    pagination: {
      el: '.feedback-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 3, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 32 }
    }
  });
}

async function fetchFeedbacks() {
  const container = document.getElementById('feedback-container');
  
  if (!container) {
    setTimeout(fetchFeedbacks, 100);
    return;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Помилка сервера');

    const data = await response.json();
    console.log('Дані успішно отримано з сервера Sweet Shop:', data);

    const feedbacks = Array.isArray(data) 
  ? data 
  : (data.feedbacks || data.results || data.data || []);

    if (feedbacks.length === 0) {
      container.innerHTML = '<div class="swiper-slide">Відгуків поки немає...</div>';
      return;
    }

    renderFeedbacks(feedbacks.slice(0, 10), container);
  } catch (error) {
    console.error('Помилка при завантаженні API:', error);
    container.innerHTML = '<div class="swiper-slide">Не вдалося завантажити відгуки...</div>';
  }
}

function renderFeedbacks(feedbacks, container) {
  container.innerHTML = ''; 

  feedbacks.forEach(item => {
    const ratingPercent = ((item.rating || 5) / 5) * 100;

    const slideHTML = `
      <div class="swiper-slide">
        <div class="feedback-card">
          <div class="card-top-content">
            <div class="rating-stars" style="--rating-percent: ${ratingPercent}%" title="Рейтинг: ${item.rating}"></div>
            <p class="feedback-text">"${item.comment || item.text || 'Чудовий десерт!'}"</p>
          </div>
          <p class="feedback-user">${item.name || 'Анонімний клієнт'}</p>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', slideHTML);
  });

  initSwiper();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchFeedbacks);
} else {
  fetchFeedbacks();
}
