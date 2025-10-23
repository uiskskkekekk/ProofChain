export const CONTRACT_ADDRESS = "0xC784f504Db552259078220d89F09bE7776c96c67";

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "records",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_fileHash",
        type: "bytes32",
      },
    ],
    name: "storeProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
