import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3'
import EventContract from '../contract/EventContract.json'

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState()
    const [accounts, setAccounts] = useState()
    const [contract, setContract] = useState('')
    const [networkId, setNetworkId] = useState()

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                try {
                    // Ensure MetaMask permission is granted
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    // Safe to request network ID now
                    const networkId = await web3Instance.eth.net.getId();
                    setNetworkId(networkId);

                    const accounts = await web3Instance.eth.getAccounts();
                    setAccounts(accounts);

                    // Now load the contract after wallet is confirmed
                    const deployedNetwork = EventContract.networks[networkId];
                    if (!deployedNetwork) {
                        throw new Error(`${networkId}`)
                    }
                    const contractInstance = new web3Instance.eth.Contract(
                        EventContract.abi,
                        deployedNetwork && deployedNetwork.address
                    );
                    setContract(contractInstance);
                } catch (err) {
                    console.error('MetaMask connection error:', err);
                }
            } else {
                alert("Please install MetaMask to use this app.");
            }
        };

        init();
    }, []);


    return (
        <Web3Context.Provider value={{ web3, accounts, contract }} >
            {children}
        </Web3Context.Provider>
    )
}