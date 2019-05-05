const chai = require('chai');
const waffle = require('ethereum-waffle');
const Greeter = require('../build/Greeter.json');

const {createMockProvider, deployContract, getWallets, solidity} = waffle;
const {expect} = chai;

chai.use(solidity);

describe('Greeter tests', () => {
    let provider = createMockProvider();
    let [wallet] = getWallets(provider);
    let greeter;

    beforeEach(async () => {
        greeter = await deployContract(wallet, Greeter, ['hello world']);
    });

    it('constructor message should be `hello world`', async () => {
        expect(await greeter.message()).to.equal('hello world');
    });

    it('`setMessage()` should emit the new message', async () => {
        await expect(greeter.setMessage('DappsNation !!!')).to.emit(greeter, 'messageSet').withArgs('DappsNation !!!');
    });

    it('should get a new message after `setMessage()`', async () => {
        await greeter.setMessage('Ethereum is awsome !');
        expect(await greeter.message()).to.equal('Ethereum is awsome !');
    });
});

