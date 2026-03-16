import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ListaEventos from './pages/ListaEventos';
import NovoEvento from './pages/NovoEvento';
import ListaParticipantes from './pages/ListaParticipantes';
import Inscricao from './pages/Inscricao';
import EditarEvento from './pages/EditarEvento';
import AdminLogin from './pages/AdminLogin';

function App() {
  // Verifica se o navegador tem o registo de que este utilizador é admin
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const fazerLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm mb-8">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Portal de Eventos
            </Link>
            
            <div className="space-x-6 flex items-center">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Ver Eventos</Link>
              
              {/* Menu do Admin */}
              {isAdmin ? (
                <>
                  <Link to="/admin/novo" className="text-gray-600 hover:text-blue-600 transition font-medium">
                    + Novo Evento
                  </Link>
                  <button onClick={fazerLogout} className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Sair (Admin)
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-400 hover:text-gray-600 text-sm transition">
                  Area de Admin (teste)
                </Link>
              )}
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 pb-12">
          <Routes>
            <Route path="/" element={<ListaEventos />} />
            <Route path="/evento/:id/inscricao" element={<Inscricao />} />
            <Route path="/login" element={<AdminLogin />} />
            
            {/* ROTAS PROTEGIDAS */}
            <Route path="/admin/novo" element={isAdmin ? <NovoEvento /> : <Navigate to="/login" />} />
            <Route path="/admin/evento/:id/participantes" element={isAdmin ? <ListaParticipantes /> : <Navigate to="/login" />} />
            <Route path="/admin/evento/:id/editar" element={isAdmin ? <EditarEvento /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;