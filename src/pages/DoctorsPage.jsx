import { useEffect, useState } from 'react'
import { getDoctors } from '../api/clinicApi'

function DoctorsPage() {
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getDoctors()
            .then(data => {
                setDoctors(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-lg">Loading doctors...</p>
        </div>
    )

    if (error) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-red-400 text-lg">Error: {error}</p>
        </div>
    )

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Doctors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {doctor.fullName}
                        </h2>
                        <p className="text-red-400 text-sm mb-4">{doctor.specialty}</p>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-sm">{doctor.email}</p>
                            <p className="text-gray-400 text-sm">{doctor.phoneNumber}</p>
                            <p className="text-gray-500 text-xs mt-2">
                                License: {doctor.licenseNumber}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsPage