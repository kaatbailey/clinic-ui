import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-800">
            <span className="text-red-400 font-bold text-xl">
                Clinic Appointment System
            </span>
            <div className="flex gap-8">
                <Link to="/doctors" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Doctors
                </Link>
                <Link to="/patients" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Patients
                </Link>
                <Link to="/appointments" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Appointments
                </Link>
                <Link to="/book" className="text-gray-300 hover:text-white text-sm transition-colors">
                    Book Appointment
                </Link>
            </div>
        </nav>
    )
}

export default NavBar