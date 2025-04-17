import React from 'react';
import BuyTicketForm from '../components/BuyTicketForm';
import TransferTicketForm from '../components/TransferTicketForm';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-4">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    User Dashboard
                </h2>
                <BuyTicketForm />
                <div className="my-8 border-t border-gray-200"></div>
                <TransferTicketForm />
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={() => navigate('/organizer')} className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition">I'm an Organizer</button>
            </div>
        </>
    );
}

export default UserDashboard;
