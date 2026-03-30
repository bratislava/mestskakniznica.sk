import { FormProvider } from 'react-hook-form'

import { useNewsletterSection } from '@/components/HomePage/useNewsletterSection'
import NewsLetter from '@/components/ui/NewsLetter/NewsLetter'
import { SectionContainer } from '@/components/ui/SectionContainer/SectionContainer'

/**
 * Figma: https://www.figma.com/design/CY6Mh2f0SXJhBMY74HdS03/Mestsk%C3%A1-kni%C5%BEnica--MKB-?node-id=10907-4250&t=KkuqLqbD8kvacbyQ-4
 */

const NewsletterSection = () => {
  const { methods, handleSubmit, isSubscribeSuccessful, responseMessage, isSubscribePending } =
    useNewsletterSection()

  return (
    <FormProvider {...methods}>
      <SectionContainer
        //
        className="py-12 lg:py-24"
      >
        <NewsLetter
          onSubmit={handleSubmit}
          responseMessage={responseMessage}
          isSubscribeSuccessful={isSubscribeSuccessful}
          isSubscribePending={isSubscribePending}
        />
      </SectionContainer>
    </FormProvider>
  )
}

export default NewsletterSection
