import React from 'react';
import CreateEventForm from '../components/CreateEventForm';

const OrganizerDashboard = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-4">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 0V7a2 2 0 00-2-2h-4.18a2 2 0 01-1.42-.59l-1.83-1.83A2 2 0 008.18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-5z" /></svg>
                Organizer Dashboard
            </h2>
            <CreateEventForm />
        </div>
    );
}

export default OrganizerDashboard;
