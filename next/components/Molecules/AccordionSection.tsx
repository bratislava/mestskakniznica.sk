import React from 'react'

import { getForm } from '@/components/Molecules/Sections'
import { FlatText, Table } from '@/components/ui'
import Accordion from '@/modules/common/Accordion'
import { AccordionSectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { groupByAccordionCategory, groupByCategory } from '@/utils/page'

type AccordionSectionPops = {
  section: AccordionSectionFragment
}

//  TODO this needs major revisit
const AccordionSection = ({ section }: AccordionSectionPops) => {
  return (
    <div>
      {section.title && <h2 className="flex pb-6 text-h4 font-normal">{section.title}</h2>}
      {section.tableRows &&
        groupByAccordionCategory(section.tableRows ?? []).map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Accordion key={index} title={item.title} type="divider-big">
            <div className="flex flex-col space-y-6">
              {item.tables.map((table, tableIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <Table key={tableIndex} secondaryTitle={table.title} rows={table.rows} />
              ))}
            </div>
          </Accordion>
        ))}
      {section.flatText &&
        groupByCategory(section.flatText).map((flatText, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Accordion key={index} title={flatText.category} type="divider-big">
            <div className="text-base">
              {flatText.items.filter(isDefined).map((item, indexInner) => (
                // eslint-disable-next-line react/no-array-index-key
                <FlatText key={indexInner} content={item?.content ?? ''} />
              ))}
            </div>
          </Accordion>
        ))}
      {section.forms &&
        groupByCategory(section.forms).map((form, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Accordion key={index} title={form.category} type="divider-big">
            <div className="text-base">
              {form.items.map((item, itemIndex) => getForm(item?.type || '', itemIndex.toString()))}
            </div>
          </Accordion>
        ))}
    </div>
  )
}

export default AccordionSection
