import { Component } from 'pet-dex-utilities';
import Button from '../../../components/Button';
import Radio from '../../../components/RadioButton';
import Vaccine from '../../../components/Vaccine';

import estetoscopio from './images/estetoscopio.svg';
import cuidadosEspeciais from './images/cuidadosEspeciais.svg';

import './index.scss';

const html = `
  <div data-select="container" class="petvet-page">
      <div class="petvet-page__header">
          <p class="petvet-page__header--text">Conte-nos um pouco mais do seu animal</p>
          <p class="petvet-page__header--subtext">Seu pet já foi vacinado? Conta pra gente que mês ou ano que você costuma comemorar o aniversário dele!</p>
      </div>
      <div class="petvet-page__card-group" data-select="card-group">
          <div class="petvet-page__card">
              <div class="petvet-page__card-header">
                  <div>
                      <a href="#"><img class="petvet-page__img" src="${estetoscopio}" alt="estetoscopio" /></a>
                  </div>
                  <div class="petvet-page__card-content">
                      <p>O seu pet amigo foi castrado?</p>
                      <div data-select="registered-radio"></div>
                  </div>
              </div>
          </div>
          <div class="petvet-page__card" data-select="special-care">
              <div class="petvet-page__card-header">
                  <div class="petvet-page__icon-text">
                      <a href="#"><img class="petvet-page__img" src="${cuidadosEspeciais}" alt="cuidados especiais" /></a>
                  </div>
                  <div class="petvet-page__card-content">
                      <p>Cuidados especiais</p>
                      <div data-select="special-care-radio"></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
`;

const events = ['value'];

function createAndMount({ name, text, mountTo }) {
  const radio = new Radio({ name, text });
  radio.mount(mountTo);
  return radio;
}

export default function PetVetPage() {
  Component.call(this, { html, events });

  const $container = this.selected.get('container');
  const $specialCareRadio = this.selected.get('special-care-radio');
  const $registeredRadio = this.selected.get('registered-radio');
  const $cardGroup = this.selected.get('card-group');

  const form = {
    isRegistered: undefined,
    isSpecialCare: undefined,
    specialCareText: false,
  };

  const specialCare = [
    createAndMount({
      name: 'specialCare',
      text: 'Não',
      mountTo: $specialCareRadio,
    }),
    createAndMount({
      name: 'specialCare',
      text: 'Sim',
      mountTo: $specialCareRadio,
    }),
  ];
  const registered = [
    createAndMount({
      name: 'registered',
      text: 'Não',
      mountTo: $registeredRadio,
    }),
    createAndMount({
      name: 'registered',
      text: 'Sim',
      mountTo: $registeredRadio,
    }),
  ];

  registered.forEach((radio) => {
    radio.listen('change', (value) => {
      const text = radio.getText();
      form.isRegistered = text === 'Yes' ? value : !value;
    });
  });

  specialCare.forEach((radio) => {
    radio.listen('change', (value) => {
      const text = radio.getText();
      form.isSpecialCare = text === 'Yes' ? value : !value;
    });
  });

  this.vaccine = new Vaccine();
  this.vaccine.mount($cardGroup);

  this.button = new Button({
    text: 'Concluir',
    isFullWidth: false,
    isDisabled: false,
  });
  this.button.mount($container);

  const $button = this.button.selected.get('button');
  $button.classList.add('petvet-page__button');

  const emitForm = () => {
    this.emit('value', form);
  };

  this.button.listen('click', emitForm);
}

PetVetPage.prototype = Object.assign(PetVetPage.prototype, Component.prototype);
