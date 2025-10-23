```
/proofchain
├── src/
│   ├── components/
│   │   ├── Notarize.jsx       # 「存證」功能 (包含上傳、Hash)
│   │   └── Verify.jsx         # 「驗證」功能
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
