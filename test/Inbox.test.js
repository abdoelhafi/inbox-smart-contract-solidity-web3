const ganache = require ('ganache-cli');
const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {evm:{bytecode} , abi} = require('../compile');

let accounts, inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // Use one of those accounts to deploy
  // the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe("Inbox", () => {
  // assert that the contract is successfully deployed
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  // assert that the geter methode return the default value
  it('getter returns instance variable default value',async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message,'Hi there!');
  });

  // assert that the setter methode change the  value of the instance variable
  it('setter methode change the  value of the instance variable',async () => {
    await inbox.methods.setMessage('New Message').send({from:accounts[0]});
    const message = await inbox.methods.message().call();
    assert.strictEqual(message,'New Message');
  });
});