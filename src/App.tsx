import * as React from 'react'
import { Provider } from 'react-redux'
import Root from './router/Root'
import { store } from './app/store'

const App: React.FC = () => {
   return (
      <Provider store={store}>
         <Root/>
      </Provider>
   )
}
export default App
