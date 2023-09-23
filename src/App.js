import './App.css';
import HomePage from './components/HomePage/HomePage';
import { AuthProvider } from './components/AuthPages/useAuth';
function App() {
  return (
    <AuthProvider>
    <div className='App'>
      <HomePage/>
    </div>
    </AuthProvider>
  );
}
export default App;
