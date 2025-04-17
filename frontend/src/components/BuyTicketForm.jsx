import React, { useState, useContext } from 'react';
import { Web3Context } from '../context/Web3Context'

const BuyTicketForm = () => {

    const { contract, accounts } = useContext(Web3Context)
    const [eventId, setEventId] = useState('')
    const [quantity, setQuantity] = useState('')

    const handleBuy = async () => {
        try {
            const eventData = await contract.methods.events(eventId).call()
            const total = BigInt(eventData.price) * BigInt(quantity)

            await contract.methods.buyTicket(eventId, quantity).send({
                from: accounts[0],
                value: total.toString()
            })
            alert('Tickets Purchased')
        } catch (err) {
            alert(`Error!! ${err.message}`)
        }
    }

    return (
        <div className='space-y-4'>
            <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder='Event ID' value={eventId} onChange={e => setEventId(e.target.value)} />
            <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder='Quantity' value={quantity} onChange={e => setQuantity(e.target.value)} />

            <button onClick={handleBuy} className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">Buy Tickets</button>
        </div>
    );
}

export default BuyTicketForm;
