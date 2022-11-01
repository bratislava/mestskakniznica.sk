import { IFormOption } from '@utils/form-constants'

// Keys based on SVOP categories available in jira/MKB-538
export const options: IFormOption[] = [
  {
    key: '1',
    label: [
      { locale: 'sk', label: 'Dieťa do 15 rokov' },
      { locale: 'en', label: 'Child under 15 years' },
    ],
    price: '0,00 €',
  },
  {
    key: '8',
    label: [
      {
        locale: 'sk',
        label: 'Zrakovo znevýhodnený',
      },
      {
        locale: 'en',
        label: 'Visually impaired user',
      },
    ],
    price: '0,00 €',
  },
  {
    key: '4',
    label: [
      { locale: 'sk', label: 'Poberateľ dávok v hmotnej núdzi' },
      { locale: 'en', label: 'Recipient of benefits in material need' },
    ],
    price: '0,00 €',
  },
  {
    key: '11',
    label: [
      { locale: 'sk', label: 'Osoba registrovaná v partnerskej knižnici' },
      { locale: 'en', label: 'Person registered in the partner library' },
    ],
    price: '0,00 €',
  },
  {
    key: '12',
    label: [
      { locale: 'sk', label: 'Osoba s preukazom ŤZP' },
      { locale: 'en', label: 'Person with the disability card' },
    ],
    price: '1,00 €',
  },
  {
    key: '3',
    label: [
      { locale: 'sk', label: 'Starobný dôchodca (62+)' },
      { locale: 'en', label: 'Senior (age 62+)' },
    ],
    price: '2,00 €',
  },
  {
    key: '6',
    label: [
      {
        locale: 'sk',
        label: 'Študent strednej alebo vysokej školy (do 26 rokov)',
      },
      {
        locale: 'en',
        label: 'High school or university student (until age 26)',
      },
    ],
    price: '2,80 €',
  },
  {
    key: '2',
    label: [
      { locale: 'sk', label: 'Dospelý' },
      { locale: 'en', label: 'Adult' },
    ],
    price: '4,00 €',
  },
  {
    key: '5',
    label: [
      { locale: 'sk', label: 'Právnická osoba' },
      { locale: 'en', label: 'Corporation' },
    ],
    price: '8,00 €',
  },
]
