import React, { useState, useContext } from 'react'
import { Web3Context } from '../context/Web3Context'

const CreateEventForm = () => {
    const { contract, accounts } = useContext(Web3Context)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')
    const [count, setCount] = useState('')

    const handleCreate = async () => {
        try {
            const timestamp = Math.floor(new Date(date).getTime() / 1000)
            const tx = contract.methods.createEvent(name, timestamp, parseInt(price), parseInt(count))
            const gas = await tx.estimateGas({ from: accounts[0] })
            await tx.send({ from: accounts[0], gas })

            alert('Event created!')
            setName('')
            setDate('')
            setPrice('')
            setCount('')
        } catch (err) {
            alert(`Error: ${err.message}`)
        }
    }

    return (
        <div className="space-y-4">
            <input className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder='Event name' value={name} onChange={e => setName(e.target.value)} />
            <input type='datetime-local' className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" value={date} onChange={e => setDate(e.target.value)} />
            <input type='number' className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
            <input type='number' className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition outline-none" placeholder='Ticket Count' value={count} onChange={e => setCount(e.target.value)} />

            <button onClick={handleCreate} className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">Create Event</button>
        </div>
    )
}

export default CreateEventForm