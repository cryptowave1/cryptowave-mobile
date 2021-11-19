import * as React from 'react'
import { store } from './app/store'
import { Provider } from 'react-redux'
import Root from './router/Root'

const App: React.FC = () => {
   return (
      <Provider store={store}>
         <Root/>
      </Provider>
   )
}

export default App
