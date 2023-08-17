import React from "react";
import DownloadButton from "../assets/svg/download-btn.svg";
import { useState } from "react";
import axios from "axios";
import { NFTStorage } from "nft.storage";
import LoadSvg from "../assets/svg/3-dots-scale.svg";

export default function Card() {
  const [prompt, setPrompt] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mintNFTState, setMintNFTState] = useState(false);

  const [mintName, setMintName] = useState("");
  const [mintDesc, setMintDesc] = useState("");
  const [mintAdd, setMintAdd] = useState("");

  const generateArt = async () => {
    setImageBlob(null);
    document.querySelector(".error").style.display = "none";
    try {
      setLoading(true);
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE}}`,
          },
          method: "POST",
          inputs: prompt,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progressPercentage = Math.round((loaded * 100) / total);
            // Update the progress bar UI with the progressPercentage value
            // e.g., set the state variable for the progress bar value
            console.log(progressPercentage);
          },
        },
        { responseType: "blob" }
      );
      // convert blob to a image file type
      const file = new File([response.data], "image.png", {
        type: "image/png",
      });

      // saving the file in a state
      setFile(file);
      const url = URL.createObjectURL(response.data);
      setImageBlob(url);
      setLoading(false);
      document.querySelector(".card-image").style.border = "none";
    } catch (err) {
      if (err) {
        console.log(err.message);
        document.querySelector(".error").style.display = "block";
      }
    }
  };

  const cleanupIPFS = (url) => {
    if (url.includes("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
  };

  const uploadArtToIpfs = async () => {
    try {
      const nftstorage = new NFTStorage({
        token: process.env.REACT_APP_NFT_STORAGE,
      });

      const store = await nftstorage.store({
        name: "AI NFT",
        description: "AI generated NFT",
        image: file,
      });

      return cleanupIPFS(store.data.image.href);
    } catch (err) {
      console.log("error ran");
      return null;
    }
  };

  const mintNft = async () => {
    if (mintName && mintDesc) {
      document.querySelector(".progress").style.display = "block";
      try {
        const imageURL = await uploadArtToIpfs();

        // mint as an NFT on nftport
        const response = await axios.post(
          `https://api.nftport.xyz/v0/mints/easy/urls`,
          {
            file_url: imageURL,
            chain: "polygon",
            name: mintName,
            description: mintDesc,
            mint_to_address:
              mintAdd || "0x5e5F6a619f579F55B0C88e1B930B604e91C989AD",
          },

          {
            headers: {
              Authorization: process.env.REACT_APP_NFT_PORT,
            },
          }
        );
        const data = await response.data;
        if (data) {
          document.querySelector(
            "#error-text"
          ).innerHTML = `NFT minted to 0x${mintAdd.substring(2, 5)}XXXX`;
          document.querySelector(".error").style.backgroundColor = "green";
          document.querySelector(".error").style.display = "block";
          document.querySelector(".progress").style.display = "none";
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log({ error: "Please fill all values." });
    }
  };

  return (
    <div className="card-main">
      {mintNFTState && (
        <div className="mint-nft-div">
          <div className="mint-nft-main">
            <input
              placeholder={"Name"}
              id="input-prompt"
              onChange={(e) => {
                setMintName(e.target.value);
              }}
              required
            />
            <input
              placeholder={"Description"}
              id="input-prompt"
              onChange={(e) => {
                setMintDesc(e.target.value);
              }}
              required
            />
            <input
              placeholder={"Wallet Address"}
              id="input-prompt"
              onChange={(e) => {
                setMintAdd(e.target.value);
              }}
              required
            />
            <div className="btns">
              <button
                id="mint-nft-btn"
                onClick={() => setMintNFTState((prev) => !prev)}
              >
                Go back
              </button>
              <button id="generate-btn" onClick={mintNft}>
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      )}
      {!mintNFTState && (
        <div className="card-container">
          <div className="card-image">
            {!imageBlob && !loading && (
              <h3 className="loading">Art will appear here🪄</h3>
            )}
            {loading && !imageBlob && (
              <div className="loading" id="loading">
                <h3>Generating art. Please wait.</h3>
                <img src={LoadSvg} alt="loading" width={50} />
              </div>
            )}
            {imageBlob && (
              <>
                <a
                  href={imageBlob}
                  download={`${
                    prompt !== "" ? prompt + ".jpeg" : "image.jpeg"
                  }`}
                >
                  <img
                    id="download-btn"
                    src={DownloadButton}
                    alt="download-btn"
                  />
                </a>
                <img id="generated-img" src={imageBlob} alt={prompt} />
              </>
            )}
          </div>
          <div className="CTA-btns">
            <input
              placeholder={"Type your prompt here.."}
              onChange={(e) => setPrompt(e.target.value)}
              id="input-prompt"
              value={prompt}
              required
            />
            <div className="btns">
              <button
                title="Generate NFT"
                id="generate-btn"
                onClick={generateArt}
              >
                GENERATE
              </button>
              {imageBlob && (
                <button
                  id="mint-nft-btn"
                  onClick={() => setMintNFTState((prev) => !prev)}
                >
                  MINT NFT
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
