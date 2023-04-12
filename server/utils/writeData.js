import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

const writeData = (appendData, fileName) => {
  let datajson = readFileSync(join("DB", fileName), "utf-8");
  let newData = JSON.parse(datajson);
  newData.push(appendData);
  datajson = JSON.stringify(newData);
  console.log(datajson);
  writeFileSync(join("DB", fileName), datajson, "utf-8");
};

export default writeData;
