export const DATA = {
  name: "Gautam Kumar",
  initials: "GK",
  url: "https://whoisgautxm.vercel.app/",
  location: "New Delhi, India",
  description:
    "I am passionate about building softwares that solves problem without telling the solution. I am gaining experience in contributing to ZKP. I am currently looking for internships in ZK engineer.",
  summary:
    "I am a 3rd year undergraduate student at IIT Delhi. Figuring out how to contribute to Open Source projects related to ZK-VMs, Zk-Email, Zk-p2p.",
  skills: ["React", "Python", "Solidity", "Rust", "Circom", "Halo2", "C++", "Docker"],
  contact: {
    email: "whoisgautxm@gmail.com",
    tel: "+91 7906104503",
    social: {
      GitHub: "https://github.com/whoisgautxm",
      X: "https://x.com/0xgautxm",
    },
  },
  education: [
    {
      school: "Indian Institute of Technology (IIT) Delhi",
      degree: "B.Tech",
      start: "2022",
      end: "2026",
    },
  ],
  projects: [
    {
      title: "ZKAttestify",
      dates: "August 2024",
      description:
        "We created a web application that leverages the RISC Zero VM to generate a Zero Knowledge Proof for attestation data. Handled locally on the user's system.",
      technologies: ["Rust", "RISC0 VM"],
      link: "https://github.com/whoisgautxm/ZkAttestifyLocal",
    },
    {
      title: "Updated prover_main.cc in tachyon",
      dates: "June 2024",
      description:
        "Tachyon is a ZK prover written in C++. I added benchmarking functionality to prover_main.cc.",
      technologies: ["C++"],
      link: "https://github.com/kroma-network/tachyon/pull/452",
    },
    {
      title: "Changing ZK prover of ZK email from Rapid-Snark to Tachyon",
      dates: "June 2024",
      description:
        "Changing the ZK prover of ZK email from Rapid-Snark to Tachyon.",
      technologies: ["Docker"],
      link: "https://github.com/zkemail/email-wallet/pull/102",
    },
    {
      title: "Image-Authentication Model Using Merkle-Tree",
      dates: "June 2024",
      description:
        "Implementation of an image authentication scheme using blockchain and Merkle tree mechanisms, developed in Rust.",
      technologies: ["Rust", "IPFS", "Merkle Trees", "Blockchain"],
      link: "https://github.com/whoisgautxm/Image-Authentication-Model-in-Rust",
    },
  ],
  hackathons: [
    {
      title: "SuperHack 2024",
      dates: "August 2 – 16, 2024",
      description:
        "Developer tool that creates ZKP of the attestations from EAS using RISC Zero ZKVM.",
      link: "https://ethglobal.com/showcase/zkattestify-1jxe4",
    },
    {
      title: "NeoXGrind 2024",
      dates: "August 2 – 16, 2024",
      description:
        "Decentralized application (dApp) for the creation, trading, and management of meme-inspired cryptocurrency tokens.",
      link: "https://github.com/whoisgautxm/neox-pump",
    },
    {
      title: "Aligned Builders Hackathon",
      dates: "October 25 – 29, 2024",
      description:
        "A Decentralized Fiat-to-Crypto Escrow System Powered by Aligned Layer.",
      link: "https://github.com/Shivannsh/ZkSetu",
    },
    {
      title: "Polkadot Hacker House",
      dates: "November 26 – December 3, 2024",
      description:
        "A PvP betting Dapp on Moonbeam using Chainlink Price feeds.",
      link: "https://github.com/whoisgautxm/PvP-Betting-Frontend",
    },
    {
      title: "zkVerify ZK App and Infra Builders",
      dates: "November 20 – December 10, 2024",
      description:
        "Allows users to obtain private attestations from reputable sources about personal information.",
      link: "https://github.com/whoisgautxm/AttestVerify",
    },
    {
      title: "ZK Online Hackathon for Web3 Builders",
      dates: "January 27 – February 14, 2025",
      description:
        "ML model marketplace that provide predictions but maintains the privacy of ML model datasets.",
      link: "https://github.com/whoisgautxm/ShadowML",
    },
  ],
} as const;
