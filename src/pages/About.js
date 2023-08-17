import React from "react";

export default function About() {
  const a = {
    fontSize: "0.6rem",
    color: "black",
  };
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1 className="about-heading">About The Project</h1>
          <h2 className="preface">Preface</h2>
          <hr></hr>
          <p className="about-p">
            The{" "}
            <strong>
              <em style={{ fontSize: "0.6rem", fontWeight: "700" }}>
                NFT Minting App
              </em>{" "}
            </strong>
            is a progressive web3 app that harnesses the power of Stable
            Diffusion to generate high quality digital art. The art generated
            can be minted as an NFT which then can be used to sell on any NFT
            market place.
          </p>
          <p className="about-p">
            The NFT minting app was developed using React 18 and hugging face
            stable diffusion API. NFT minting functionality was developed with
            the NFT infrastructure{" "}
            <a href="https://www.nftport.xyz" style={a}>
              NFTPort
            </a>
            .
          </p>
          <p className="about-p">
            This project is being hosted on Netlify (free subscription). It may
            or may not be available in the future. Code can be found{" "}
            <a href="https://www.github.com/Bitnagar" style={a}>
              here
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
