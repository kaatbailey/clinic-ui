import { useEffect, useState } from 'react'
import { getDoctors, getPatients, createAppointment } from '../api/clinicApi'

function BookAppointmentPage() {
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const [form, setForm] = useState({
        patientId: '',
        doctorId: '',
        appointmentDatetime: '',
        reason: ''
    })

    useEffect(() => {
        Promise.all([getDoctors(), getPatients()])
            .then(([doctorsData, patientsData]) => {
                setDoctors(doctorsData)
                setPatients(patientsData)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        setSuccess(null)

        const payload = {
            patientId: parseInt(form.patientId),
            doctorId: parseInt(form.doctorId),
            appointmentDatetime: new Date(form.appointmentDatetime).toISOString().slice(0, 19),
            reason: form.reason
        }

        createAppointment(payload)
            .then(data => {
                setSuccess(`Appointment booked for ${data.patientName} with ${data.doctorName}`)
                setForm({ patientId: '', doctorId: '', appointmentDatetime: '', reason: '' })
                setSubmitting(false)
            })
            .catch(err => {
                setError(err.message)
                setSubmitting(false)
            })
    }

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-lg">Loading...</p>
        </div>
    )

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Book Appointment</h1>

            {success && (
                <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded mb-6">
                    {success}
                </div>
            )}

            {error && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Patient
                    </label>
                    <select
                        name="patientId"
                        value={form.patientId}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:border-red-400">
                        <option value="">Select a patient</option>
                        {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>
                                {patient.fullName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Doctor
                    </label>
                    <select
                        name="doctorId"
                        value={form.doctorId}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:border-red-400">
                        <option value="">Select a doctor</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.fullName} — {doctor.specialty}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date and Time
                    </label>
                    <input
                        type="datetime-local"
                        name="appointmentDatetime"
                        value={form.appointmentDatetime}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:border-red-400"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Reason for Visit
                    </label>
                    <textarea
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe the reason for this appointment..."
                        className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:border-red-400 resize-none"/>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors">
                    {submitting ? 'Booking...' : 'Book Appointment'}
                </button>

            </form>
        </div>
    )
}

export default BookAppointmentPage