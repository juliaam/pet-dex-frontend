import { Component } from 'pet-dex-utilities';
import dayjs from 'dayjs';
import calendarUrl from './images/calendar.svg';
import './index.scss';

const events = ['change:date', 'change:title', 'change:vet'];

const html = `
      <div class="vaccine-item">
        <p class="vaccine-item__info-body title" data-select="body-title"></p>
        <div class="vaccine-item__info-body date">
        <hr class="vaccine-item__info-body divider"></hr>
          <img src=${calendarUrl} alt="calendar">
          <p data-select="body-date"></p>
          <hr class="vaccine-item__info-body divider"></hr>
        </div>
        <p class="vaccine-item__info-body" data-select="body-vet"></p>
      </div>
`;

function formatDate(date) {
  return dayjs(date).format('MM/DD/YYYY');
}

export default function VaccineItem({ title, vet, date }) {
  Component.call(this, { html, events });

  if (title) this.setTitle(title);
  if (vet) this.setVet(vet);
  if (date) this.setDate(date);
}

VaccineItem.prototype = Object.assign(
  VaccineItem.prototype,
  Component.prototype,
  {
    getTitle() {
      return this.title;
    },
    getVet() {
      return this.vet;
    },
    getDate() {
      return this.date;
    },
    setTitle(title) {
      this.title = title;
      this.selected.get('body-title').textContent = title;
      this.emit('change:title', title);
    },
    setVet(vet) {
      this.vet = vet;
      this.selected.get('body-vet').textContent = vet;
      this.emit('change:vet', vet);
    },
    setDate(date) {
      const dateFormatted = formatDate(date);
      this.date = dateFormatted;
      this.selected.get('body-date').textContent = dateFormatted;
      this.emit('change:date', date);
    },
  },
);