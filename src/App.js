import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Home } from './Components/Home/Home.js'
import { store } from './store/store';
import { NotFound } from './Components/NotFound/NotFound';
import { Dashboard } from './Components/Dashboard/Dashboard';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
