import { Enum_Disclosure_Type } from '@services/graphql'
import { Enum_Disclosure_Type_Fixed } from '@utils/types'

export const getDisclosureTypeFixed = (type: Enum_Disclosure_Type) => {
  switch (type) {
    case Enum_Disclosure_Type.Faktury:
      return Enum_Disclosure_Type_Fixed.Faktury

    case Enum_Disclosure_Type.Objednavky:
      return Enum_Disclosure_Type_Fixed.Objednavky

    case Enum_Disclosure_Type.Zmluva:
      return Enum_Disclosure_Type_Fixed.Zmluva

    case Enum_Disclosure_Type.VerejneObstaravanie:
      return Enum_Disclosure_Type_Fixed.VerejneObstaravanie

    case Enum_Disclosure_Type.ObchodnaVerejnaSutaz:
      return Enum_Disclosure_Type_Fixed.ObchodnaVerejnaSutaz

    case Enum_Disclosure_Type.Grant:
      return Enum_Disclosure_Type_Fixed.Grant

    case Enum_Disclosure_Type.Ostatne:
      return Enum_Disclosure_Type_Fixed.Ostatne

    default:
      return type
  }
}
