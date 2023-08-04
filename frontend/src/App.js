import logo from './logo.svg';
import './App.css';
import SignUp from './Component/SignUp/SignUp';
import Login from './Component/SignUp/login/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chat from './Component/ChatRoom/Chat';
import PublicLayout from './Layout/PublicLayout';
import PrivateLayout from './Layout/PrivateLayout';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicLayout/>}>

        <Route index element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        </Route>
        <Route path='/chat' element={<PrivateLayout/>}>

        <Route index element={<Chat/>}/>
        </Route>
      </Routes>
      </BrowserRouter> 
{/*      
      <Chat/> */}
    </div>
  );
}

export default App;
