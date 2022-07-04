import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import { useSelector } from 'react-redux';
import NouvelArticle from './pages/NouvelArticle';
import Article from './pages/Article';
import Categorie from './pages/Categorie';
import ScrollToTop from './components/ScrollToTop';
import Panier from './pages/Panier';
import Commandes from './pages/Commandes';
import PanneauAdmin from './pages/PanneauAdmin';
import EditerArticle from './pages/EditerArticle';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Accueil />} />
          {!user && (
            <>
              <Route path="/connexion" element={<Connexion />} />
              <Route path="/inscription" element={<Inscription />} />
            </>
          )}
          {user && (
            <>
              <Route path="/panier" element={<Panier />} />
              <Route path="/commandes" element={<Commandes />} />
            </>
          )}
          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<PanneauAdmin />} />
              <Route path="/article/:id/edit" element={<EditerArticle />} />
            </>
          )}
          <Route path="/article/:id" element={<Article />} />
          <Route path="/categorie/:category" element={<Categorie />} />
          <Route path="/nouvel-article" element={<NouvelArticle />} />
          <Route path="*" element={<Accueil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
