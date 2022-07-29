import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const templateFile = (edata, fileName) => {
    const fileType =
    "application/vnd.ms-excel;charset=UTF-8";
  const fileExtension = ".xlsx";

    // const ws = XLSX.utils.json_to_sheet(apiData);
    // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([edata], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);


  }
  export default templateFile;
