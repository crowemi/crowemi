from web3 import Web3


w3 = Web3(Web3.EthereumTesterProvider())
# w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/fea31701c1e7432e9e77ff0c586ee94c'))
ls = w3.eth.accounts

# wei_bal = w3.eth.get_balance('kingstar13.eth')
wei_bal = w3.eth.get_balance(ls[0])
eth_bal = w3.fromWei(wei_bal, 'ether')




print(eth_bal)