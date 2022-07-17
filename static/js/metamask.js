


const mmSuccessfulLogin = (mmAccountId) => {
    console.debug(`MetaMask Successful Login for ${mmAccountId}`)
    console.debug(window.ethereum)
    // TODO: remove buttons
    document.getElementById("metamask-button-container").remove()
    // TODO: update welcome message
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
    console.debug(window.ethereum)
    const mmToast = new bootstrap.Toast(document.getElementById('metamask-toast'))
    if (window.ethereum.selectedAddress !== 'undefined') {
        console.debug('Already logged in.')
        console.debug(window.ethereum.selectedAddress)
        mmSuccessfulLogin(window.ethereum.selectedAddress)
        mmToast.show()
    }
    mmToast.show()
}