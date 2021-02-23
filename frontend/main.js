import './style.scss';
import 'ejs/ejs.min.js';
import Router from './js/router';
import AppTemplate from './js/appTemplate';

/**
 * select the root DOM element
 */
const $root = document.querySelector('#root');
/**
 * append the application template
 */
const $appTmpl = AppTemplate.get$AppTemplate();
$root.appendChild($appTmpl);
/**
 * tell router to go to the current page
 */
Router.goToCurrentPage();

window.onpopstate = function () {
  Router.goToCurrentPage();
};
