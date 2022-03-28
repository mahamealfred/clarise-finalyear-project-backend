const BisinessIdea = require("../model/bissnessIdeas");
const BisinessDefinition = require("../model/bisinessDefinition");
const asyncHandler = require("../util/asyncHandler");
const ErrorResponse = require("../util/errorResponse");
const nodemailer = require("../util/nodemailer");

const IdeaStrength = (totalCriteria, failedCritetial) => {
  const successCriterias = totalCriteria - failedCritetial;
  const ideaSrengthPersentage = (successCriterias * 100) / totalCriteria;
  return ideaSrengthPersentage;
};
exports.createBisinessIdea = asyncHandler(async (req, res, next) => {
  const bisiness = await BisinessDefinition.findById(
    req.body.bisinessDefinition
  );
  if (!bisiness) {
    return next(new ErrorResponse("could not find Bisiness Definition", 404));
  }
  const conditions = bisiness.conditions;

  const bisinessDefinition = conditions._id;
  const userBisinessCriterion = req.body.conditions;

  let failedCriteria = 0;
  const totalCriteria = conditions.length;
  let status = "pending";
  for (const key in conditions) {
    let criterion = userBisinessCriterion[key].criterion;
    let preDefinedCondition = conditions[key].criterion;

    if (JSON.stringify(criterion) != JSON.stringify(preDefinedCondition)) {
      failedCriteria = failedCriteria + 1;
    }
  }
  //let differentCreteria=(failedCriteria/totalCriteria)*100
  const ideaStrengthPer=IdeaStrength(totalCriteria,failedCriteria);
  if (failedCriteria === 0 || ideaStrengthPer >=70) {
    status = "approved";
  }
  else if(ideaStrengthPer===0){
    status="pending"
  }
   else {
    status = "rejected";
  }
  const bisinessIdea = {
    name: req.body.name,
    owner: req.body.owner,
    bisinessDefinition: bisinessDefinition,
    description: req.body.description,
    conditions: userBisinessCriterion,
    status: status,
    ideaSrengthPersentage: IdeaStrength(totalCriteria, failedCriteria),
  };
  const options = {
    email: req.body.email,
    name: bisinessIdea.name,
    status: status,
  };

  const bn = await BisinessIdea.create(bisinessIdea);
  if (!bn) {
    return next("could not sasve", 500);
  }
  await nodemailer(options);
  res.status(201).json({
    message: bn.status,
    data: bn,
    status: 201,
  });
});
exports.getBusinessIdea = asyncHandler(async (req, res, next) => {
  const businessIdeas = await BisinessIdea.find({});
  if (!businessIdeas) {
    return next(new ErrorResponse("could not get Business Ideas", 500));
  }
  res.status(200).json({
    msg: "data found successfully",
    count: businessIdeas.length,
    data: businessIdeas,
  });
});
exports.getSingleBusinessIdea = asyncHandler(async (req, res, next) => {
  try{
    const businessIdeas = await BisinessIdea.findById(req.params.id);
    if (!businessIdeas) {
      return next(new ErrorResponse("unable to find single business ida", 400));
    }
   return res.status(200).json({
      msg: "data found successfully",
      count: businessIdeas.length,
      data: businessIdeas,
    });
  }catch(error){
   return res.status(500).json({
     status:500,
     error:"Sever error "+error.message
   })
  }
  
});
