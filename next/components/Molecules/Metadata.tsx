import React from 'react'

import { MetadataFragment } from '@/services/graphql'

const Metadata = ({ metadata }: { metadata: MetadataFragment[] | null | undefined }) => {
  return (
    <>
      {metadata?.map(
        (meta) => meta && <MetadataComponent key={meta?.__typename} metadata={meta} />,
      )}
    </>
  )
}

const buildMetadata = (data: (string | number | undefined | null)[]) =>
  data.filter((d) => !!d).join(', ')

const MetadataComponent = ({ metadata }: { metadata: MetadataFragment | null }) => {
  if (!metadata) return null

  return <div>{metadataContent(metadata)}</div>
}

const metadataContent = (meta: MetadataFragment) => {
  switch (meta.__typename) {
    case 'ComponentMetadataFaktury':
      return <div>{buildMetadata([meta.name, meta?.attachment?.data?.attributes?.name])}</div>

    case 'ComponentMetadataZmluvy':
      return <div>{buildMetadata([meta.subject, meta.supplier, meta.number, meta.amount])}</div>

    case 'ComponentMetadataMetadata':
      return (
        <div>{buildMetadata([meta.grant_name, meta.grant_number, meta.provider, meta.amount])}</div>
      )

    case 'ComponentMetadataObjednavky':
      return (
        <div>
          {buildMetadata([meta.title, meta.date_period, meta?.attachment?.data?.attributes?.name])}
        </div>
      )

    case 'ComponentMetadataObchodnaVerejnaSutaz':
      return (
        <div>
          {buildMetadata([
            meta.subject,
            meta.number,
            meta.amount,
            meta?.attachment?.data?.attributes?.name,
          ])}
        </div>
      )

    case 'ComponentMetadataVerejneObstaravanie':
      return (
        <div>
          {buildMetadata([
            meta.subject,
            meta.number,
            meta.amount,
            meta?.attachment?.data?.attributes?.name,
          ])}
        </div>
      )

    default:
      return null
  }
}

export default Metadata
