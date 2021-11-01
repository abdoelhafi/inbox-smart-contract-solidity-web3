
const fs = require('fs');
const solc = require('solc');
const path = require('path')

const contractPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(contractPath,'utf-8');
var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
const inboxContract = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol']['Inbox'];
// console.log(inboxContract.evm.bytecode.object);
module.exports = inboxContract;
