import { ethers, Contract } from "ethers";
import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Helloabi from "./contracts/Hello.json";
import Web3 from "web3";
import Navbar from "./Navbar";
import swal from "sweetalert";
import "./App.css";
import { Progress, InputNumber, Form, Input, Checkbox, Button } from "antd";
import NumericInput from "react-numeric-input";
import logo from "./logo.svg";

const App = () => {
  const [refresh, setrefresh] = useState(0);
  const [getNetwork, setNetwork] = useState("");

  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [Hello, setHello] = useState({});
  const [SIGNER, SETSIGNER] = useState({});
  const [flag, setflag] = useState(0);
  const [inputVal, setInputVal] =useState(0.1)
  // const provider = await detectEthereumProvider();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );
    }
  };

  const onChange = (value) => {
    console.log('changed', value);
    setInputVal(value)
  }
  // const validateMessages = {
  //   types: {
  //     email: "Not a valid email!"
  //   }
  // };

  const [form] = Form.useForm();
  const onFinish = values => {
    const sec1 = document.getElementsByClassName("Eth-info-section");
    sec1[0].style.display = "none";

    const sec2 = document.getElementsByClassName("PRY-recieve-section");
    sec2[0].style.display = "none";

    const sec3 = document.getElementsByClassName("Email-address-section");
    sec3[0].style.display = "none";

    const sec4 = document.getElementsByClassName("Thanks-section");
    sec4[0].classList.remove("Thanks-section-none");

    // sec5[0].classList
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    if (typeof window.ethereum == "undefined") {
      return;
    }

    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    SETSIGNER(signer);

    let url = window.location.href;
    console.log(url);

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    if (accounts.length == 0) {
      return;
    }

    setAccount(accounts[0]);

    var networkId;
    await provider.getNetwork().then(result => {
      networkId = result.chainId;
    });
    if (networkId) {
      // set network name here
      setNetwork("Kovan");
      // defining a smart contract ;
      // signer is defined above no need to define again
      // const smartcontract = new Contract( /* address of smart contract*/  , /*  abi of smart contract */, signer);
      let smartcontract;
      setHello(smartcontract);

      // if you want to call data from smart contract follow below
      // suppose there is function in smart contract which returns something

      // await smartcontract
      //   .functioninsmartcontract(accounts[0].toString())
      //   .then((result) => {
      //     console.log("vesting schedule data ", result);
      //   });

      // suppose there is a call function only or a public variable
      // await smartcontract.functioninsmartcontract();

      setLoading(false);
    } else {
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const onclick = async a => {
    // if you want to go from eth to wei
    // use this ethers.utils.parseEther(inputamount.toString())
    // ethers.utils.formatUnits(unLockedTokens, 18))
    // try {
    //   const tx = await smartcontract.setCompleted(a.toString());
    //   const txsign = await tx.wait();
    //   window.location.reload();
    // } catch (e) {
    //   swal("error in doing transaction you are not admin");
    // }
  };

  const walletAddress = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
    // window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    // console.log(refresh)
    // setrefresh(1)
    if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    else {
        window.onfocus = () => {
          window.location.reload();
      }
    }

    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>loading....</div> : ""}
      </p>
    );
  } else {
    content = (
      <div>
        <div class="grid-container">
          <div class="Heading">
            <div className="heading">Prophecy Private Sale Portal</div>
          </div>
          <div className="Token-Info-section">
            <div className="token-name">
              {" "}
              Token Name
              <div className="token-name-describe">Prophecy</div>
            </div>
            <div className="token-symbol">
              {" "}
              Token Symbol
              <div className="token-symbol-describe">$PRY</div>
            </div>
          </div>
          <div className="Exchange-rate-section">
            <div className="exchange-rate-header">
              Private Sale Exchange Rate
            </div>
            <div className="exchange-rate-value">1 ETH = 78.000 PRY</div>
          </div>
          <div className="Eth-address-section">
            <div className="eth-address-header">
              {" "}
              Private Sale ETH Wallet Address{" "}
            </div>
            <div className="eth-address-value">
              {" "}
              <p> 0x117F7281Db05Ad19e79E497bd7469F793FE36093 </p>{" "}
            </div>
            <div className="eth-scan-link">
              {" "}
              <a href="/"> Check on Etherscan </a>{" "}
            </div>
          </div>
          <div class="Initial-supply-section">
            <div className="token-name">
              {" "}
              Initial Supply
              <div className="token-name-describe">1000,000</div>
            </div>
            <div className="token-symbol">
              {" "}
              Total Supply
              <div className="token-symbol-describe">200,000,00</div>
            </div>
          </div>
          <div class="Private-supply-section">
            <div className="exchange-rate-header">Private Sale Supply </div>
            <div className="exchange-rate-value">50,000,000 PRY</div>
          </div>
          <div class="Private-sale-progress-section">
            <div className="private-sale-progress-header">
              {" "}
              Private Sale Progress{" "}
            </div>
            <div className="private-sale-progress-goal">Goal: 600 ETH</div>
            <div className="private-sale-progress-note">
              Our private sale will end on 18 December 2020, or when our
              hard-cap goal of 600 ETH is met, whichever comes first
            </div>
            <Progress
              className="progress-bar"
              status="exception"
              percent={30}
              showInfo={false}
            >
              <p style={{ position: "absolute", color: "white", flex: 0 }}>
                testes
              </p>
            </Progress>
          </div>
          <div class="Eth-info-section">
            <div className="eth-contribute-header">
              {" "}
              ETH you want to contribute{" "}
            </div>
            <NumericInput
              onChange={onChange}
              value={inputVal}
              precision={2}
              size={6}
              step={0.1}
              mobile={false}
              style={{
                arrowUp: {
                  borderBottomColor: "#ff005c",
                  boxShadow: "none"
                },
                arrowDown: {
                  borderTopColor: "#ff005c",
                  boxShadow: "none"
                }
              }}
            />
          </div>
          <div class="PRY-recieve-section">
            <div className="pry-recieve-header">
              {" "}
              PRY you will recieve (1 ETH x 78000):{" "}
            </div>
            <img src={logo} className="prophet-logo" />
            <span className="pry-recieve-value"> {inputVal * 78000}</span>
          </div>
          <div class="Email-address-section">
            <div className="required-header"> Required</div>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              style={{ marginLeft: "2%", marginTop: "2%" }}
            >
              <div style={{ display: "flex" }}>
              </div>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("Should accept agreement")
                  }
                ]}
              >
                <Checkbox id="checkbox">
                  <span className="checkbox-text">
                    {" "}
                    I want to contribute to the Prophecy private sale and become
                    an early supporter.{" "}
                  </span>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  size={"large"}
                  className="confirm-buttom"
                  type="primary"
                  htmlType="submit"
                >
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="Thanks-section Thanks-section-none">
            <p className="thanks-text"> Thanks for contributing to our private sale! </p>

            <p>
              Welcome aboard. When our token launches, you will receive 25% of
              your private sale tokens each week for a period of four weeks.{" "}
            </p>

            <p>
              The tokens will be airdropped to the wallet you used to complete
              this transaction. We will announce the public token address at the
              time of launch.
            </p>

            <p>Please contact us in Telegram for questions. </p>
            <Button
                  size={"large"}
                  className="confirm-buttom"
                  type="primary"
                  htmlType="submit"
                >
                  Confirm
                </Button>

                <p>Eth contributed</p>
                <p> PRY you will recieve (1 ETH x 78000):</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} getNetwork={getNetwork} />

      {account == "" ? (
        <div class="grid-container">
                <div class="Heading">
            <div className="heading">Prophecy Private Sale Portal</div>
          </div>
          <div className="Token-Info-section">
            <div className="token-name">
              {" "}
              Token Name
              <div className="token-name-describe">Prophecy</div>
            </div>
            <div className="token-symbol">
              {" "}
              Token Symbol
              <div className="token-symbol-describe">$PRY</div>
            </div>
          </div>
          <div className="Exchange-rate-section">
            <div className="exchange-rate-header">
              Private Sale Exchange Rate
            </div>
            <div className="exchange-rate-value">1 ETH = 78.000 PRY</div>
          </div>
          <div className="Eth-address-section">
            <div className="eth-address-header">
              {" "}
              Private Sale ETH Wallet Address{" "}
            </div>
            <div className="eth-address-value">
              {" "}
              <p> 0x117F7281Db05Ad19e79E497bd7469F793FE36093 </p>{" "}
            </div>
            <div className="eth-scan-link">
              {" "}
              <a href="/"> Check on Etherscan </a>{" "}
            </div>
          </div>
          <div class="Initial-supply-section">
            <div className="token-name">
              {" "}
              Initial Supply
              <div className="token-name-describe">1000,000</div>
            </div>
            <div className="token-symbol">
              {" "}
              Total Supply
              <div className="token-symbol-describe">200,000,00</div>
            </div>
          </div>
          <div class="Private-supply-section">
            <div className="exchange-rate-header">Private Sale Supply </div>
            <div className="exchange-rate-value">50,000,000 PRY</div>
          </div>
          <div class="Private-sale-progress-section">
            <div className="private-sale-progress-header">
              {" "}
              Private Sale Progress{" "}
            </div>
            <div className="private-sale-progress-goal">Goal: 600 ETH</div>
            <div className="private-sale-progress-note">
              Our private sale will end on 18 December 2020, or when our
              hard-cap goal of 600 ETH is met, whichever comes first
            </div>
            <Progress
              className="progress-bar"
              status="exception"
              percent={30}
              showInfo={false}
            >
              <p style={{ position: "absolute", color: "white", flex: 0 }}>
                testes
              </p>
            </Progress>
          </div>
          <div class="connect-wallet-section"></div>
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default App;
