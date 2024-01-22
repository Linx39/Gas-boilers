const MAIN_NAV_CLOSED_CLASS = `main-nav--closed`;
const MAIN_NAV_OPENED_CLASS = `main-nav--opened`;
const MAIN_NAV_NOJS_CLASS = `main-nav--nojs`;

const mainNav = document.querySelector(`.main-nav`);
const mainNavToggle = document.querySelector(`.main-nav__toggle`);

export const handleMainNavToogleClick = () => {
  mainNav.classList.remove(MAIN_NAV_NOJS_CLASS);

  mainNavToggle.addEventListener(`click`, () =>
    {if (mainNav.classList.contains(MAIN_NAV_CLOSED_CLASS)) {
        mainNav.classList.remove(MAIN_NAV_CLOSED_CLASS);
        mainNav.classList.add(MAIN_NAV_OPENED_CLASS);
      } else {
        mainNav.classList.add(MAIN_NAV_CLOSED_CLASS);
        mainNav.classList.remove(MAIN_NAV_OPENED_CLASS);
      }
    }
  );
};
