const EtherDelta = artifacts.require("EtherDelta");
const AccountLevelsTest = artifacts.require("AccountLevelsTest");

module.exports = async function(deployer, network, accounts) {
  // Get deployer address from private key
  const admin = "0x0BfDBE360AD0656068f2c4ea100C004fAC295E07";
  const feeAccount = admin; // Using same account for fees
  
  // Deploy AccountLevelsTest first
  await deployer.deploy(AccountLevelsTest);
  const accountLevelsTest = await AccountLevelsTest.deployed();
  
  // Deploy EtherDelta with initial parameters
  const feeMake = 3000000000000000; // 0.3%
  const feeTake = 3000000000000000; // 0.3%
  const feeRebate = 2000000000000000; // 0.2%
  
  await deployer.deploy(
    EtherDelta,
    admin,
    feeAccount,
    accountLevelsTest.address,
    feeMake,
    feeTake,
    feeRebate
  );
};
