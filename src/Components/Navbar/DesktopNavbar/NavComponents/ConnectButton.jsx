import React, { useState, useEffect } from 'react'
import { Flex, Text, Button } from "@chakra-ui/react";
import { SlWallet } from "react-icons/sl";

const ConnectButton = () => {

    const [walletAddress, setwalletAddress] = useState("");
    useEffect(() => {
        getCurrentWalletConnected();
        addWalletListener();
    });
  
    const connectWallet = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
          try {
              //Metamask is installed
              const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
              setwalletAddress(accounts[0]);
              console.log(accounts[0]);
          } catch (err) {
              console.log(err.message);
          }
      } else {
          //Metamask is not installed
          console.log("Please install wallet");
      }
  
  };
  
  const getCurrentWalletConnected = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
          try {
              const accounts = await window.ethereum.request({ method: "eth_accounts" });
              if(accounts.length > 0)
              {
                  setwalletAddress(accounts[0]);
                  console.log(accounts[0]);
              }
              else 
              {
                  console.log("Connect to MetaMask using the connect button")
              }
          } catch (err) {
              console.log(err.message);
          }
      } else {
          //Metamask is not installed
          console.log("Please install wallet");
      }
  
  };
  
  const addWalletListener = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
          window.ethereum.on("accountsChanged", (accounts) =>
          {
              setwalletAddress(accounts[0]);
              console.log(accounts[0]);
          });
          
      } else {
          //Metamask is not installed
          setwalletAddress("");
          console.log("Please install wallet");
      }
  
  };

  return (
    <>
    <Button
        bgColor={"rgb(50,174,177)"}
        _hover={{ bg: "rgb(50,174,177)" }}
        size="md"
    >
        <Flex onClick={connectWallet} >
        <SlWallet size={18} color="#fff" /> &nbsp;&nbsp;&nbsp;
        <Text color={"white"} fontSize="14px" fontWeight="semibold">
        {walletAddress && walletAddress.length > 0 ? `Connected: ${walletAddress.slice(0,9)}` : "Connect Wallet"}
        </Text>
        </Flex>
    </Button>
    </>
  )
}

export default ConnectButton