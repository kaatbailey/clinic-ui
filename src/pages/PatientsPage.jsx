import { useEffect, useState } from 'react'
import { getPatients } from '../api/clinicApi'

function PatientsPage() {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getPatients()
            .then(data => {
                setPatients(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-lg">Loading patients...</p>
        </div>
    )

    if (error) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-red-400 text-lg">Error: {error}</p>
        </div>
    )

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Patients</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.map(patient => (
                    <div key={patient.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {patient.fullName}
                        </h2>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-sm">{patient.email}</p>
                            <p className="text-gray-400 text-sm">{patient.phoneNumber}</p>
                            <p className="text-gray-400 text-sm">
                                DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                            </p>
                            {patient.preferredDoctorId && (
                                <p className="text-red-400 text-xs mt-2">
                                    Has preferred doctor
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PatientsPage