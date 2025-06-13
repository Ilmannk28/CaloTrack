import { routes } from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { setupSkipToContent } from '../utils';

export default class App {
    #content;
    #drawerButton;
    #drawerNavigation;
    #skipLinkButton;

    constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
        this.#content = content;
        this.#drawerButton = drawerButton;
        this.#drawerNavigation = drawerNavigation;
        this.#skipLinkButton = skipLinkButton;

        this.#init();
    }

    #init() {
        setupSkipToContent(this.#skipLinkButton, this.#content);
        this.#setupDrawer();
    }

    #setupDrawer() {
        this.#drawerButton.addEventListener('click', () => {
            const navList = this.#drawerNavigation.querySelector('.header-navlist');
            navList.classList.toggle('open');
        });

        document.body.addEventListener('click', (event) => {
            const navList = this.#drawerNavigation.querySelector('.header-navlist');
            const isTargetInsideNav = navList.contains(event.target);
            const isTargetInsideButton = this.#drawerButton.contains(event.target);

            if (!(isTargetInsideNav || isTargetInsideButton)) {
                navList.classList.remove('open');
            }
        });
    }


    async renderPage() {
        const url = getActiveRoute();
        const route = routes[url] || routes['*'];

        const page = new route();


        this.#content.innerHTML = await page.render();
        page.afterRender();
        scrollTo({ top: 0, behavior: 'instant' });
    }
}
