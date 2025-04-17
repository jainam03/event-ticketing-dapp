// Help Truffle find TruffleTutorial.sol in the /contracts directory
const EventContract = artifacts.require("EventContract");

module.exports = function (deployer) {
    // Command Truffle to deploy the Smart Contract
    deployer.deploy(EventContract);
};