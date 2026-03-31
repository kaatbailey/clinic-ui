const BASE_URL = 'https://com-clinic.onrender.com';

export async function getDoctors() {
    const response = await fetch(`${BASE_URL}/api/doctors`);
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return response.json();
}

export async function getPatients() {
    const response = await fetch(`${BASE_URL}/api/patients`);
    if (!response.ok) throw new Error('Failed to fetch patients');
    return response.json();
}

export async function getAppointments() {
    const response = await fetch(`${BASE_URL}/api/appointments`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
}

export async function getAppointmentsByDoctor(doctorId) {
    const response = await fetch(`${BASE_URL}/api/appointments/doctor/${doctorId}`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
}

export async function getAppointmentsByPatient(patientId) {
    const response = await fetch(`${BASE_URL}/api/appointments/patient/${patientId}`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
}

export async function createAppointment(appointmentData) {
    const response = await fetch(`${BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create appointment');
    }
    return response.json();
}

export async function cancelAppointment(id, cancelledByDoctor) {
    const response = await fetch(
        `${BASE_URL}/api/appointments/${id}/cancel?cancelledByDoctor=${cancelledByDoctor}`,
        { method: 'PATCH' }
    );
    if (!response.ok) throw new Error('Failed to cancel appointment');
    return response.json();
}