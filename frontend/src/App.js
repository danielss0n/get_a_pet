import { Routes, Route } from 'react-router-dom'

//pages
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Profile from './components/pages/user/Profile';
import MyPets from './components/pages/pets/MyPets';
import AddPet from './components/pages/pets/AddPet';
import EditPet from './components/pages/pets/EditPet';
import PetDetails from './components/pages/pets/PetDetails';
import MyAdoptions from './components/pages/pets/MyAdoptions';

//layout
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';

import { UserProvider } from './context/UserContext'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <UserProvider>
        <Navbar/>
          <Container>
            <Message/>
            <ToastContainer/>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/user/profile" element={<Profile/>}></Route>
              <Route path="/pet/mypets" element={<MyPets/>}></Route>
              <Route path="/pet/add" element={<AddPet/>}></Route>
              <Route path="/pet/edit/:id" element={<EditPet/>}></Route>
              <Route path="/pet/:id" element={<PetDetails/>}></Route>
              <Route path="/pet/myadoptions" element={<MyAdoptions/>}></Route>
            </Routes>
          </Container>
        <Footer/>
      </UserProvider>
    </div>
  );
}

export default App;
