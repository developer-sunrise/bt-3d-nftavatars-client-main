import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const currentchainid = 80001;
const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

export const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

export const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        //infuraId: process.env.REACT_APP_INFURA_ID
        rpc: {
          137: "https://polygon-rpc.com/",
          80001: "https://rpc-mumbai.maticvigil.com/",
        },
      },
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: "pk_live_8AEEBE7C69484DBB"
      }
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK,
      // options: {
      //   key:"pk_live_8D7327E5C5125325"
      // }
    },
  };
  return providerOptions;
};

const endpoint = "https://rpc-mumbai.maticvigil.com";
const testAPIKey = "pk_test_AD1FF282A2343DE4";
const customNodeOptions = {
  rpcUrl: endpoint,
  chainId: 80001
};

export const connectWallet = (walletname) => {
  return async (dispatch) => {
    dispatch(connectRequest());
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: getProviderOptions(), // required
      });
      var provider = "";
      if (walletname === "coinbasewallet") {
        //connect - coinbasewallet
        provider = await web3Modal.connectTo("coinbasewallet");
      } else if (walletname === "walletconnect") {
        //connect - walletconnect
        provider = await web3Modal.connectTo("walletconnect");
      } else if (walletname === "fortmatic") {
        //connect - fortmatic
        const fm = new Fortmatic(testAPIKey, customNodeOptions);
        provider = new Web3(fm.getProvider());
      } else if (walletname === "metamask") {
        const web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions: getProviderOptions().walletconnect, // required
        });
        //connect - metamask
        provider = await web3Modal.connect();
      }

      await subscribeProvider(provider);

      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      // const token = new web3.eth.Contract(
      //   tokenContract,
      //   //tokenContract.output.abi,
      //   tokenContractAddress
      // );

      if (
        window.ethereum &&
        window.ethereum.networkVersion !== currentchainid
      ) {
        await addNetwork(currentchainid);
      }

      dispatch(
        connectSuccess({
          address,
          web3,
          provider,
          connected: true,
          web3Modal,
        })
      );
    } catch (e) {
      dispatch(connectFailed(e));
    }
  };
};

const subscribeProvider = async (provider) => {
  if (!provider.on) {
    return;
  }

  provider.on("connect", async (id) => {
    console.log(id);
  });
};

export async function addNetwork(id) {
  let networkData;
  switch (parseInt(id)) {
  //bsctestnet
  case 97:
    networkData = [
      {
        chainId: "0x61",
        chainName: "BSCTESTNET",
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        nativeCurrency: {
          name: "BINANCE COIN",
          symbol: "BNB",
          decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
      },
    ];

    break;
  //bscmainet
  case 56:
    networkData = [
      {
        chainId: "0x38",
        chainName: "BSCMAINET",
        rpcUrls: ["https://bsc-dataseed1.binance.org"],
        nativeCurrency: {
          name: "BINANCE COIN",
          symbol: "BNB",
          decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
      },
    ];
    break;
  //polygon testnet
  case 80001:
    networkData = [
      {
        chainId: "0x13881",
        chainName: "Polygon testnet",
        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      },
    ];
    break;
  default:
    break;
  }
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });
}
