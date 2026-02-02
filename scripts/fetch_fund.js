const fs = require("fs");
const axios = require("axios");

// 修改为你关注的基金代码
const fundCodes = ["161039", "001469", "519732"];

async function fetchFund(code) {
  try {
    const url = `https://fundgz.1234567.com.cn/js/${code}.js?rt=${Date.now()}`;
    const res = await axios.get(url);
    const jsonStr = res.data.replace(/^jsonpgz\((.*)\);$/, "$1");
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error(`抓取基金 ${code} 失败`, err);
    return null;
  }
}

async function main() {
  const results = [];
  for (const code of fundCodes) {
    const fund = await fetchFund(code);
    if (fund) {
      results.push({
        name: fund.name,
        code: fund.fundcode,
        jz: fund.dwjz,
        gszzl: fund.gszzl,
        gztime: fund.gztime
      });
    }
  }
  fs.writeFileSync("./src/fund_data.json", JSON.stringify(results, null, 2));
  console.log("基金数据已更新！");
}

main();
