import { getArticles } from '../../utils/api';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default class ArticlePage {
  async render() {
    return `
    <div class="container-article">
      <section class="content article-page">
        <h1 class="article-title">Artikel Seputar Kalori & Nutrisi</h1>
        <div id="article-list" class="article-list">
          <p>Memuat artikel...</p>
        </div>
      </section>
    </div>
    `;
  }

  async afterRender() {
    const container = document.getElementById('article-list');
    try {
      const response = await getArticles();

      if (!response || !response.articles || response.articles.length === 0) {
        container.innerHTML = `<p>Tidak ada artikel tersedia.</p>`;
        return;
      }

      const articlesHTML = response.articles.map(article => `
        <div class="article-item">
          ${article.image ? `<img src="${article.image}" alt="${article.title}" class="article-img">` : ''}
          <div class="article-content">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.link}" target="_blank" class="article-link">Baca selengkapnya →</a>
          </div>
        </div>
      `).join('');

      container.innerHTML = articlesHTML;

      gsap.utils.toArray(".article-item").forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.1,
        });
      });

    } catch (error) {
      console.error(error);
      container.innerHTML = `<p style="color: red;">Gagal memuat artikel. Coba lagi nanti.</p>`;
    }
  }
}
