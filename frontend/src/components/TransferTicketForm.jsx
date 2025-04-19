import React, { useState, useContext } from 'react';
import { Web3Context } from '../context/Web3Context'

const TransferTicketForm = () => {
    const { contract, accounts } = useContext(Web3Context)
    const [eventId, setEventId] = useState('')
    const [quantity, setQuantity] = useState('')
    const [to, setTo] = useState('')

    const handleTransfer = async () => {
        try {
            if (!accounts || accounts.length === 0) {
                return alert('Please connect your wallet!');
            }
            // Validate recipient address
            if (!to || !/^0x[a-fA-F0-9]{40}$/.test(to)) {
                return alert('Invalid recipient address!');
            }
            // Validate quantity
            if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
                return alert('Please enter a valid quantity!');
            }
            // Validate eventId
            if (!eventId) {
                return alert('Please enter an event ID!');
            }
            const owned = await contract.methods.tickets(accounts[0], eventId).call();
            if (Number(owned) < Number(quantity)) {
                return alert('Not enough tickets owned!');
            }
            await contract.methods.transferTicket(Number(eventId), Number(quantity), to).send({
                from: accounts[0]
            });
            alert('Tickets transferred successfully!');
        } catch (err) {
            alert(`Error! ${err.message}`);
        }
    }

    return (
        <div className="space-y-4">
            <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder="Event ID" value={eventId} onChange={e => setEventId(e.target.value)} />
            <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder="Recipient Address" value={to} onChange={e => setTo(e.target.value)} />
            <button onClick={handleTransfer} className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">Transfer Tickets</button>
        </div>
    );
};

export default TransferTicketForm;
