const BisinessDefinition = require("../model/bisinessDefinition");
const asyncHandler = require("../util/asyncHandler");
const ErrorResponse = require("../util/errorResponse");

exports.createBisinessDefinition = asyncHandler(async (req, res, next) => {
  const bisinessDefinition = await BisinessDefinition.create(req.body);
  if (!bisinessDefinition) {
    return next(
      new ErrorResponse("could not register bisness definition", 400)
    );
  }
  res.status(201).json({
    message: "new business definition successfuly created",
    data: bisinessDefinition,
    status: 201,
  });
});
exports.fetchBisinessDefinition = asyncHandler(async (req, res, next) => {
  const bisinessDefinition = await BisinessDefinition.find({});
  if (!bisinessDefinition) {
    return next(new ErrorResponse("could not find bisness definition", 500));
  }
  res.status(200).json({
    message: "bisness definitions successfuly found",
    count: bisinessDefinition.length,
    data: bisinessDefinition,
  });
});
exports.fetchSingleBisinessDefinition = asyncHandler(async (req, res, next) => {
  const bisinessDefinition = await BisinessDefinition.findById(req.params.id);
  if (!bisinessDefinition) {
    return next(new ErrorResponse("could not find bisness definition", 500));
  }
  res.status(201).json({
    message: "bisness definitions successfuly found",
    data: bisinessDefinition,
  });
});
exports.deleteBisinessDefinition = asyncHandler(async (req, res, next) => {
  const bisinessDefinition = await BisinessDefinition.findByIdAndDelete(
    req.params.id
  );
  if (!bisinessDefinition) {
    return next(new ErrorResponse("could not delete bisness definition", 500));
  }
  res.status(201).json({
    message: "bisness definitions successfuly deleted",
    data: [],
  });
});
exports.updateBisinessDefinition = asyncHandler(async (req, res, next) => {
  const bisinessDefinition = await BisinessDefinition.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!bisinessDefinition) {
    return next(new ErrorResponse("could not update bisness definition", 500));
  }
  res.status(201).json({
    message: "bisness definitions successfuly updated",
    data: bisinessDefinition,
  });
});
