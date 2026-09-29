import { Route, Routes } from 'react-router-dom'
import HomePage from './Homepage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Page } from '@strapi/strapi/admin'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route index element={<HomePage />} />

          <Route path="*" element={<Page.Error />} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
