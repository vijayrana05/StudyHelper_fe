import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import EditorPage from "./pages/editorPage";
import { Main } from "./pages/home";
import NotesLandingPage from "./pages/landPage";
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
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}

export default App
