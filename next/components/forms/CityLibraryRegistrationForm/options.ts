import { IFormOption } from '../../../utils/form-constants'

export const options: IFormOption[] = [
  {
    key: 'Dieťa do 15 rokov',
    label: [
      { locale: 'sk', label: 'Dieťa do 15 rokov' },
      { locale: 'en', label: 'Child under 15' },
    ],
    price: '0,00 €',
  },
  {
    key: 'Zrakovo a inak zdravotne postihnutý',
    label: [
      {
        locale: 'sk',
        label: 'Zrakovo a inak zdravotne postihnutý v rozsahu odôvodnenom jeho zdravotným postihnutím',
      },
      {
        locale: 'en',
        label: 'Visually and otherwise disabled to the extent justified by the disability',
      },
    ],
    price: '0,00 €',
  },
  {
    key: 'Poberateľ dávok v hmotnej núdzi',
    label: [
      { locale: 'sk', label: 'Poberateľ dávok v hmotnej núdzi' },
      { locale: 'en', label: 'Recipient of benefits in material need' },
    ],
    price: '0,00 €',
  },
  {
    key: 'Osoba registrovaná v partnerskej knižnici',
    label: [
      { locale: 'sk', label: 'Osoba registrovaná v partnerskej knižnici' },
      { locale: 'en', label: 'Person registered at a partner library' },
    ],
    price: '0,00 €',
  },
  {
    key: 'Osoba s ťažkým zdravotným postihnutím',
    label: [
      { locale: 'sk', label: 'Osoba s ťažkým zdravotným postihnutím' },
      { locale: 'en', label: 'Person with a severe disability' },
    ],
    price: '1,00 €',
  },
  {
    key: 'Osoba v starobnom dôchodku',
    label: [
      { locale: 'sk', label: 'Osoba v starobnom dôchodku' },
      { locale: 'en', label: 'Recipient of old-age pension' },
    ],
    price: '2,00 €',
  },
  {
    key: 'Študent/ka strednej alebo vysokej školy denného štúdia do 26 rokov',
    label: [
      {
        locale: 'sk',
        label: 'študent/ka strednej alebo vysokej školy denného štúdia do 26 rokov',
      },
      {
        locale: 'en',
        label: 'Full-time high school or university student under 26',
      },
    ],
    price: '2,80 €',
  },
  {
    key: 'Dospelá osoba',
    label: [
      { locale: 'sk', label: 'Dospelá osoba' },
      { locale: 'en', label: 'Adult' },
    ],
    price: '4,00 €',
  },
  {
    key: 'Právnická osoba',
    label: [
      { locale: 'sk', label: 'Právnická osoba' },
      { locale: 'en', label: 'Legal entity' },
    ],
    price: '8,00 €',
  },
]
