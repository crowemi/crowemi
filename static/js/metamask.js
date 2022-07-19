const web3 = null
const mmSuccessfulLogin = (mmAccountId) => {
    console.debug(`MetaMask Successful Login for ${mmAccountId}`)
    console.debug(window.ethereum)
    document.getElementById("metamask-button-container").remove()
    document.getElementById("metamask-text-container").innerHTML = `<div class="small">Connected wallet: ${mmAccountId}</div>`
}
const mmFailedLogin = () => {
    // TODO: what happens when connection fails
}

const mmConnectObj = document.getElementById('metamask-connect');

mmConnectObj.addEventListener('click', () => {
    mmConnectObj.disabled = true;
    ethereum.request({ method: 'eth_requestAccounts' }).then((mmAccountId) => { mmSuccessfulLogin(mmAccountId) });
});

if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
    console.debug(window.ethereum);

    const mmToast = new bootstrap.Toast(document.getElementById('metamask-toast'));
    const web3 = new Web3(window.ethereum);

    web3.eth.getAccounts().then((accounts) => {
        if (accounts[0] != null) {
            console.debug('Already logged in.')
            console.debug(window.ethereum.selectedAddress)
            mmSuccessfulLogin(window.ethereum.selectedAddress)
            mmToast.show()
        }
    });

    mmToast.show()
}