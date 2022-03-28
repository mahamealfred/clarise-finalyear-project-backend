const asyncHandler = require("../util/asyncHandler");
const ErrorResponse = require("../util/errorResponse");
exports.createEmployeeFromFileUpload = asyncHandler(async (req, res, next) => {
  // if (!req.files) {
  //   console.log(req.files);
  //   return next(new ErrorResponse("please provide file", 400));
  // }
  // creating custom file name
  try {
    const initialValue = "File";
    min = Math.ceil(1000);
    max = Math.floor(10000);
    const number = Math.floor(Math.random() * (max - min) + min);
    const generatedCode = initialValue + number;
    const excelFile = req.files.excelFile;
    const fileName = `${generatedCode}-${excelFile.name}`;
    //defining path to file

    const pathToFile = `${process.env.FILE_UPLOAD}/${fileName}`;
    //uploading file
    await excelFile.mv(pathToFile);
    console.log("uploaded");
  } catch (error) {
    // console.log("not uploaded");
  }
});
