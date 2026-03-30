import { useEffect, useState } from 'react'
import { getAppointments, cancelAppointment } from '../api/clinicApi'

function AppointmentsPage() {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getAppointments()
            .then(data => {
                setAppointments(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    function handleCancel(id, cancelledByDoctor) {
        cancelAppointment(id, cancelledByDoctor)
            .then(updated => {
                setAppointments(prev =>
                    prev.map(a => a.id === updated.id ? updated : a)
                )
            })
            .catch(err => setError(err.message))
    }

    const statusColors = {
        BOOKED: 'text-green-400',
        COMPLETED: 'text-blue-400',
        PATIENT_CANCELLED: 'text-gray-400',
        DOCTOR_CANCELLED: 'text-gray-400',
        NO_SHOW: 'text-red-400'
    }

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-lg">Loading appointments...</p>
        </div>
    )

    if (error) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-red-400 text-lg">Error: {error}</p>
        </div>
    )

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Appointments</h1>
            <div className="space-y-4">
                {appointments.map(appointment => (
                    <div key={appointment.id}
                         className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-1">
                                    {appointment.patientName}
                                </h2>
                                <p className="text-red-400 text-sm mb-1">
                                    {appointment.doctorName}
                                </p>
                                <p className="text-gray-400 text-sm mb-1">
                                    {new Date(appointment.appointmentDatetime)
                                        .toLocaleString()}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {appointment.reason}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <span className={`text-sm font-medium ${statusColors[appointment.status]}`}>
                                    {appointment.status.replace('_', ' ')}
                                </span>
                                {appointment.status === 'BOOKED' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleCancel(appointment.id, false)}
                                            className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors">
                                            Patient Cancel
                                        </button>
                                        <button
                                            onClick={() => handleCancel(appointment.id, true)}
                                            className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors">
                                            Doctor Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppointmentsPage