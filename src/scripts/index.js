import '../styles/styles.css';
import '../styles/responsive.css';
import '../styles/calculate.css';
import '../styles/predict.css';
import '../styles/tamplate.css';
import '../styles/recommendation.css';
import '../styles/article.css';


import App from './pages/app';
import Camera from './utils/camera';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    drawerButton: document.getElementById('drawer-button'),
    drawerNavigation: document.getElementById('navigation-drawer'), 
    skipLinkButton: document.getElementById('skip-link'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    Camera.stopAllStreams();
  });

  
});
