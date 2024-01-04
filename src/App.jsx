import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import '../i18n.js'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from './components/Loader/index.jsx'
import { persistor, store } from './store/index.js'
import { queryClient } from './constants/queryClient.js'
import AuthProvider from './components/AuthProvider/index.jsx'
import ScrollToTop from './components/ScorollToTop/index.jsx'
import { ThemeProvider } from '@emotion/react'
import theme from './mui-theme'
import { StylesProvider } from '@mui/styles'

const toastOptions = {
  duration: 3000,
  success: {
    duration: 3000
  }
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className='App'>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <StylesProvider injectFirst>
                <QueryClientProvider client={queryClient}>
                  <Toaster position='top-center' toastOptions={toastOptions} />
                  <BrowserRouter>
                    <ScrollToTop>
                      <AuthProvider />
                    </ScrollToTop>
                  </BrowserRouter>
                </QueryClientProvider>
              </StylesProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </div>
    </Suspense>
  )
}

export default App
