import {createElement, renderDom} from './utils'

let virtualDom1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c']),
])
let virtualDom2 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['1']),
    createElement('li', {class: 'item'}, ['2']),
    createElement('li', {class: 'item'}, ['3']),
])
let el = render(virtualDom);
renderDom(el, window.root);
let patchs = diff(virtualDom1, virtualDom2);