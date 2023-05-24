const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const Job = require("../models/job-model/jobModel");
const ErrorHandler = require("../utils/errorhandler");
const ApiFetaures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;

//Create Job
exports.createJob = catchAsyncError(async (req, res, next) => {
  const newJobData = {
    name: req.body.caption,
    about: req.body.about,
    owner: req.user,
    time: req.body.time,
    label: req.body.label,
    salary: req.body.salary,
    location: req.body.location,
    startEmployee: req.body.startEmployee,
    endEmployee: req.body.endEmployee,
  };
  const newJob = await Job.create(newJobData);
  const user = await User.findById(req.user._id);
  user.myJobs.push(newJob._id);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Successfully Job created",
    job: newJob,
  });
});

//Get All Job
exports.getAllJobs = catchAsyncError(async (req, res, next) => {
  const apifeatures = new ApiFetaures(
    Job.find().sort({ createdAt: -1 }).populate("owner"),
    req.query
  ).search();
  // Job.find().sort({ createdAt: -1 }).populate("owner")

  const jobs = await apifeatures.query;

  res.status(200).json({
    success: true,
    jobs,
  });
});

//Get Single Job
exports.getJob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate("owner");
  if (!job) {
    return next(new ErrorHandler("Job Not Found", 404));
  }

  res.status(200).json({
    success: true,
    job: job,
  });
});

//Apply Single Job
exports.applyJob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandler("Job Not Found", 404));
  }
  const result = await cloudinary.uploader.upload(req.body.cv, {
    folder: "cv",
    resource_type: "auto",
  });
  const applicantData = {
    user: req.user._id,
    cv: result.secure_url,
  };
  await job.applicants.push(applicantData);
  await job.save();

  const newJob = await Job.findById(req.params.id).populate("owner");
  // console.log(file.tempFilePath);
  res.status(200).json({
    success: true,
    job: newJob,
  });
});
