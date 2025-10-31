// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofChain {

    struct Record {
        uint256 timestamp;
        address owner;
    }

    /**
     * Key => Hash (bytes32 format)。
     * Value => Record
     * `public` will generate the read-only `records` function
     */
    mapping(bytes32 => Record) public records;

    function storeProof(bytes32 _fileHash) public {
        // Ensure that this hash has not been previously verified.
        require(records[_fileHash].timestamp == 0, "Proof already exists for this hash.");

        records[_fileHash] = Record({
            timestamp: block.timestamp, // `block.timestamp` 是區塊鏈提供的當前時間
            owner: msg.sender           // `msg.sender` 是呼叫此功能的錢包地址
        });
    }
}