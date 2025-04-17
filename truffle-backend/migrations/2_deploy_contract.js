const eventTicketing = artifacts.require("EventContract")

module.exports = async function (deployer) {
    await deployer.deploy(eventTicketing)
    const { execSync } = require('child_process')
    execSync('node ../scripts/copy-abi.js')
}