const { log } = require('console')
const fs = require('fs')
const path = require('path')

const CONTRACT_NAME = 'EventContract'
const backendPath = path.join(__dirname, '../truffle-backend/build/contracts', `${CONTRACT_NAME}.json`)
const frontendPath = path.join(__dirname, '../frontend/src/contract', `${CONTRACT_NAME}.json`)

if (!fs.existsSync(backendPath)) {
    console.error(`ABI not found at ${backendPath}`)
    process.exit(1)
}

const artifact = JSON.parse(fs.readFileSync(backendPath, 'utf8'))
const networks = artifact.networks
const latestNetworkId = Object.keys(networks).pop()
const deployedAddress = networks[latestNetworkId]?.address

if (!deployedAddress) {
    console.error(`No deployed address found in ABI`)
    process.exit(1)
}

const minimal = {
    abi: artifact.abi,
    address: deployedAddress,
}

fs.mkdirSync(path.dirname(frontendPath), { recursive: true })
fs.writeFileSync(frontendPath, JSON.stringify(minimal, null, 2))

console.log(`ABI + address written to ${frontendPath}`);
