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


window.onload = async () => {
    messageElem = document.getElementById('message');
    addressElem = document.getElementById('address');
    metamaskElem = document.getElementById('metamask');
    newMessageElem = document.getElementById('new-message');
    sendElem = document.getElementById('send');
    disconnectedElem = document.getElementById('disconnected');
    connectedElem = document.getElementById('connected');

    await fetch('build/Greeter.json')
        .then(res => res.json())
        .then(res => GREETER_WAFFLE = res);

    metamaskElem.addEventListener('click', async () => {
        [addressElem.innerHTML] = await ethereum.enable();
        provider = new ethers.providers.Web3Provider(ethereum);
        provider = provider.getSigner();
        greeter = new ethers.Contract(GREETER_ADDRESS, GREETER_WAFFLE.abi, provider);
        messageElem.innerHTML = await greeter.message();
        greeter.on('messageSet', newMessage => messageElem.innerHTML = newMessage);
        disconnectedElem.hidden = true;
        connectedElem.hidden = false;
    });

    sendElem.addEventListener('click', async () => {
        await greeter.setMessage(newMessageElem.value);
        newMessageElem.value = '';
    });
}

