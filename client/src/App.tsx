import { Signup } from "./pages/signupPage"
import { Login } from "./pages/loginPage"
import { LandingPage } from "./pages/landingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import EditorPage from "./pages/editorPage";
import { Main } from "./pages/home";
import NotesLandingPage from "./pages/landPage";
import EditorPageTesting from "./pages/testing";
import LoginPage from "./pages/logPage";
import SignUpPage from "./pages/signPage";
function App(){
  return <>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NotesLandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/home' element = {<Main />} />
          <Route path='/editor' element={<EditorPage />} />
          <Route path='/testing' element={<EditorPageTesting />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}

export default App
