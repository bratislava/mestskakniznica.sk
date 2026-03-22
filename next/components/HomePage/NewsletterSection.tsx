import { FormProvider } from 'react-hook-form'

import { useNewsletterSection } from '@/components/HomePage/useNewsletterSection'
import NewsLetter from '@/components/ui/NewsLetter/NewsLetter'

/**
 * Figma: https://www.figma.com/design/CY6Mh2f0SXJhBMY74HdS03/Mestsk%C3%A1-kni%C5%BEnica--MKB-?node-id=10907-4250&t=KkuqLqbD8kvacbyQ-4
 */

const NewsletterSection = () => {
  const { methods, handleSubmit, responseStatus, responseMessage } = useNewsletterSection()

  return (
    <FormProvider {...methods}>
      <NewsLetter
        onSubmit={handleSubmit}
        respondMessage={responseMessage}
        resStatus={responseStatus}
      />
    </FormProvider>
  )
}

export default NewsletterSection
