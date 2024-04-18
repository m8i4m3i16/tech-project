## My Next.js App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- Step1. run the development server:
```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

- Step2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Additional Information

#### 串接台、美股及每月營收三隻API，讓搜尋時，可以取得相關資訊
- 搜尋區塊：輸入台、美股代號，會在下方空白處即時產生對應的資訊，同時生成自動聯想<br> -> 輸入 Enter 將取消自動聯想
- 圖表區塊：即時呈現對應的資訊
- 表格區塊：即時呈現對應的資訊

#### 側邊欄位實作Active，並使用localstorage讀取和存儲索引位置<br> -> 用滑鼠點擊，即可取消Active選取

#### Section區塊
- 側邊欄位，對應圖表的每月營收，為網頁初始的Active狀態
- 圖表區塊：做出篩選功能：分別可以抓出近3年、近5年、近8年資料
- 圖表區塊：點擊圖表中的「每月營收」或「月均價」，可自由呈現長條圖或折線圖
