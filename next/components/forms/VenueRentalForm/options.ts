import { IFormOption } from '../../../utils/form-constants'

export const options: IFormOption[] = [
  {
    key: 'michalska_26',
    label: [
      { locale: 'sk', label: 'Letná čitáreň U červeného raka, Michalská 26' },
      {
        locale: 'en',
        label: 'Summer Reading Room U Červeného Raka, Michalská 26',
      },
    ],
  },
  {
    key: 'klariska_16',
    label: [
      { locale: 'sk', label: 'Pod knižnicou, Klariská 16' },
      { locale: 'en', label: 'Under the Library, Klariská 16' },
    ],
  },
  {
    key: 'kapucinska_3_galeria',
    label: [
      { locale: 'sk', label: 'Galéria Artotéka, Kapucínska 3' },
      { locale: 'en', label: 'Artotéka Gallery, Kapucínska 3' },
    ],
  },
  {
    key: 'kapucinska_3_kreativna',
    label: [
      { locale: 'sk', label: 'Kreatívna miestnosť, Kapucínska 3' },
      { locale: 'en', label: 'Creative room, Kapucínska 3' },
    ],
  },
  {
    key: 'kapucinska_1',
    label: [
      { locale: 'sk', label: 'Hudobné štúdio, Kapucínska 1' },
      { locale: 'en', label: 'Music Studio, Kapucínska 1' },
    ],
  },
]

export const types: IFormOption[] = [
  {
    key: 'komercny',
    label: [
      { locale: 'sk', label: 'Komerčný' },
      { locale: 'en', label: 'Commercial' },
    ],
  },
  {
    key: 'nekomercny',
    label: [
      { locale: 'sk', label: 'Nekomerčný' },
      { locale: 'en', label: 'Non-commercial' },
    ],
  },
]
