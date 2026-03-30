
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import DoctorsPage from './pages/DoctorsPage'
import PatientsPage from './pages/PatientsPage'
import AppointmentsPage from './pages/AppointmentsPage'
import BookAppointmentPage from './pages/BookAppointmentPage'

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-950 text-gray-100">
                <NavBar />
                <main className="max-w-6xl mx-auto px-8 py-8">
                    <Routes>
                        <Route path="/" element={<Navigate to="/doctors" />} />
                        <Route path="/doctors" element={<DoctorsPage />} />
                        <Route path="/patients" element={<PatientsPage />} />
                        <Route path="/appointments" element={<AppointmentsPage />} />
                        <Route path="/book" element={<BookAppointmentPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App