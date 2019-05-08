let messageElem;
let addressElem;
let metamaskElem;
let newMessageElem;
let sendElem;
let provider;
let GREETER_ADDRESS = '0xe76fb0d4ed4094911a6d11f92c2d18d83813c07d';
let GREETER_WAFFLE;
let greeter;
let disconnected;
let connected;
let balanceElem;
let createElem;
let importWalletElem;
let DEFAULT_NETWORK = 'goerli';

window.onload = async () => {
    messageElem = document.getElementById('message');
    addressElem = document.getElementById('address');
    balanceElem = document.getElementById('balance');
    metamaskElem = document.getElementById('metamask');
    createElem = document.getElementById('create');
    importWalletElem = document.getElementById('import-wallet');
    newMessageElem = document.getElementById('new-message');
    sendElem = document.getElementById('send');
    disconnectedElem = document.getElementById('disconnected');
    connectedElem = document.getElementById('connected');
    importContainerElem = document.getElementById('import-container');
    mnemonicContainerElem = document.getElementById('mnemonic-container');
    mnemonicElem = document.getElementById('mnemonic');
    importButtonElem = document.getElementById('import-button');
    importElem = document.getElementById('mnenomic-import');

    await fetch('build/Greeter.json')
        .then(res => res.json())
        .then(res => GREETER_WAFFLE = res);

    metamaskElem.addEventListener('click', async () => {
        const [address] = await ethereum.enable();
        provider = new ethers.providers.Web3Provider(ethereum);
        let signer = provider.getSigner();

        init(address, signer);
    });

    createElem.addEventListener('click', () => {
        provider = ethers.getDefaultProvider(DEFAULT_NETWORK);
        let wallet = ethers.Wallet.createRandom();
        wallet = wallet.connect(provider);
        mnemonicElem.innerHTML = wallet.mnemonic;
        mnemonicContainerElem.hidden = false;

        init(wallet.address, wallet);
    });

    importWalletElem.addEventListener('click', () => {
        disconnectedElem.hidden = true;
        importContainerElem.hidden = false;
    });

    importButtonElem.addEventListener('click', () => {
        provider = ethers.getDefaultProvider(DEFAULT_NETWORK);
        const mnemonic = importElem.value;
        importElem.value = '';
        let wallet = ethers.Wallet.fromMnemonic(mnemonic);
        wallet = wallet.connect(provider);
        mnemonicElem.innerHTML = wallet.mnemonic;
        mnemonicContainerElem.hidden = false;
        importContainerElem.hidden = true;

        init(wallet.address, wallet);
    });

    sendElem.addEventListener('click', async () => {
        await greeter.setMessage(newMessageElem.value);
        newMessageElem.value = '';
    });

    async function init(address, providerOrSigner) {
        addressElem.innerHTML = address;
        greeter = new ethers.Contract(GREETER_ADDRESS, GREETER_WAFFLE.abi, providerOrSigner);
        messageElem.innerHTML = await greeter.message();
        greeter.on('messageSet', newMessage => messageElem.innerHTML = newMessage);
        disconnectedElem.hidden = true;
        connectedElem.hidden = false;
        let provider = providerOrSigner;
        if (!!providerOrSigner.provider) provider = providerOrSigner.provider;
        balanceElem.innerHTML = ethers.utils.formatEther(await provider.getBalance(address));
        provider.on(address, balance => balanceElem.innerHTML = ethers.utils.formatEther(balance));
    }
}

