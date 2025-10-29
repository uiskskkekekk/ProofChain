// SPDX-License-Identifier: MIT
// 聲明 SPDX 授權，這是 Solidity 0.6.8 版之後的標準要求
pragma solidity ^0.8.20;

contract ProofChain {

    /**
     * @dev 定義儲存的存證紀錄結構。
     * @param timestamp 存證時的區塊時間戳 (Unix timestamp)。
     * @param owner 存證者的錢包地址。
     */
    struct Record {
        uint256 timestamp;
        address owner;
    }

    /**
     * @dev 建立一個 "映射" (mapping)，可以把它想像成一個 key-value 資料庫。
     * Key 是檔案的 Hash (bytes32 格式)。
     * Value 是上面定義的 Record 結構。
     * `public` 關鍵字會自動為我們生成一個名為 `records` 的唯讀函式，
     * 讓任何人都可以根據 fileHash 查詢存證紀錄。
     */
    mapping(bytes32 => Record) public records;

    /**
     * @dev 存證函式：將一個檔案的 Hash 寫入區塊鏈。
     * @param _fileHash 前端傳入的 32-byte (256-bit) 檔案 Hash。
     */
    function storeProof(bytes32 _fileHash) public {
        // 1. 驗證 (Require)
        // 確保這個 Hash 還沒有被存證過。
        // 如果 records[_fileHash].timestamp 不等於 0，表示已存在，交易將會失敗並回退。
        require(records[_fileHash].timestamp == 0, "Proof already exists for this hash.");

        // 2. 寫入儲存
        // 將 Hash、當前區塊的時間戳、以及呼叫此函式的錢包地址，
        // 一起打包成一個 Record 並存入 mapping 中。
        records[_fileHash] = Record({
            timestamp: block.timestamp, // `block.timestamp` 是區塊鏈提供的當前時間
            owner: msg.sender           // `msg.sender` 是呼叫此功能的錢包地址
        });
    }
}