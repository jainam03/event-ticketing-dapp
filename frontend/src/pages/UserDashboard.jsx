import React, { useEffect, useState, useContext } from 'react';
import BuyTicketForm from '../components/BuyTicketForm';
import TransferTicketForm from '../components/TransferTicketForm';
import { useNavigate } from 'react-router-dom';
import { Web3Context } from '../context/Web3Context';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { contract } = useContext(Web3Context);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!contract) return;
            setLoading(true);
            try {
                const nextId = await contract.methods.nextId().call();
                const eventPromises = [];
                for (let i = 0; i < nextId; i++) {
                    eventPromises.push(contract.methods.events(i).call().then(e => ({ ...e, id: i })));
                }
                const allEvents = await Promise.all(eventPromises);
                setEvents(allEvents);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            }
            setLoading(false);
        };
        fetchEvents();
    }, [contract]);

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-4">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    User Dashboard
                </h2>
                {/* Event List Table */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">Available Events</h3>
                    {loading ? (
                        <div>Loading events...</div>
                    ) : events.length === 0 ? (
                        <div>No events found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm border">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-3 py-2 border">ID</th>
                                        <th className="px-3 py-2 border">Name</th>
                                        <th className="px-3 py-2 border">Date</th>
                                        <th className="px-3 py-2 border">Price</th>
                                        <th className="px-3 py-2 border">Total Tickets</th>
                                        <th className="px-3 py-2 border">Tickets Left</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(event => (
                                        <tr key={event.id}>
                                            <td className="px-3 py-2 border text-center">{event.id}</td>
                                            <td className="px-3 py-2 border">{event.name}</td>
                                            <td className="px-3 py-2 border">{new Date(Number(event.date) * 1000).toLocaleString()}</td>
                                            <td className="px-3 py-2 border">{event.price}</td>
                                            <td className="px-3 py-2 border">{event.ticketCount}</td>
                                            <td className="px-3 py-2 border">{event.ticketRemain}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
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
