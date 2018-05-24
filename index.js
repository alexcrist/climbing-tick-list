import $ from 'jquery';
import data from './data.yml';
import './index.css';

const root = $('#root');

data.forEach(function (item) {
  const section = root.append('<div id="' + item.location + '" class="section"></div>');
});