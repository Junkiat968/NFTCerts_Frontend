import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const templateFile = (type) => {
    var fileName = "";
    const wb = XLSX.utils.book_new();
    if (type == "grades") {
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
            ["Name","Id","Grade"], ["Junkiat",22000732,"C"]
        ]), "Sheet1");
        fileName = "grades_template"
    } else if (type == "accounts") {
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([
            ["id","addr"], [22000732,"0x69449a4E966E0334B8848D838251E6F16956cAD3"]
        ]), "Sheet1");
        fileName = "accounts_template"
    }
    const buf = XLSX.write(wb, { type:"buffer", bookType:"xlsx" });

    const fileType =
    "application/vnd.ms-excel;charset=UTF-8";
    const fileExtension = ".xlsx";

    const data = new Blob([buf], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);


  }
  export default templateFile;
