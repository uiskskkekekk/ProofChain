### File structure

```
/proofchain
├── src/
│   ├── components/
│   │   ├── Notarize.jsx       # 「存證」功能 (包含上傳、Hash)
│   │   └── Verify.jsx         # 「驗證」功能

│   ├── context/
│   │   └── BlockchainContext.jsx      # 全局管理錢包、合約實例、連線狀態
│
│   ├── utils/                   # 工具函式
│   │   ├── constants.js
│   │   └── fileHasher.js      # 計算檔案 Hash 的函式
│
│   ├── App.css                  # 主要的 CSS 樣式表
│   ├── App.jsx                  # 應用程式的主佈局
│   └── main.jsx                 # 應用程式的入口點
│
├── package.json
└── vite.config.js
```

### 前端使用 BlockchainContext

`BlockchainContext` 提供全域 React context，管理錢包連線、合約實例與連線狀態。主要重點是 `currentAccount`，它儲存已連接的錢包地址。

#### 1. 用 Provider 包住你的 App

```jsx
import { BlockchainProvider } from "./src/context/BlockchainContext";

function App() {
  return <BlockchainProvider>{/* 你的 App 組件 */}</BlockchainProvider>;
}
```

#### 2. 在組件中取得區塊鏈功能

使用自訂 hook 取得錢包、帳號、合約狀態與方法：

```jsx
import { useBlockchain } from "./src/context/BlockchainContext";

function MyComponent() {
  const { currentAccount, connectWallet, proofChainContract, loading } =
    useBlockchain();

  return (
    <div>
      <button onClick={connectWallet} disabled={loading}>
        {currentAccount ? `錢包: ${currentAccount}` : "連接錢包"}
      </button>
      {/* 可以用 proofChainContract 與智能合約互動 */}
    </div>
  );
}
```

#### 3. Context 提供哪些內容？

- `currentAccount`：已連接的錢包地址（字串或 null）
- `connectWallet()`：觸發 MetaMask 連線的函式
- `proofChainContract`：Ethers.js 合約實例（可呼叫合約方法）
- `loading`：連線/載入狀態布林值

#### 4. 常見用法

- 呼叫 `connectWallet()` 連接 MetaMask 並取得使用者帳號
- 用 `proofChainContract` 呼叫智能合約方法（如存證、驗證）
- 用 `currentAccount` 顯示錢包狀態或做權限判斷

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```
