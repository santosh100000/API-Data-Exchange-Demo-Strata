import mongoose from "mongoose";

const { Schema } = mongoose;

const PaymentSchema = new Schema({
  contractorId: {
    type: Schema.Types.ObjectId,
    ref: "StrataPlusContractor",
    required: false,
  },
  accountName: { type: String, required: true },
  bank: { type: String, required: true },
  bsb: { type: String, required: true },
  accountNumber: { type: String, required: true },
  payPerHour: { type: Number, required: true },
});

const InsuranceSchema = new Schema({
  description: { type: String, required: true },
  insurer: { type: String, required: true },
  holder: { type: String, required: true },
  number: { type: String, required: true },
  expiry: { type: Date, required: true },
  comments: { type: String },
});

const StrataPlusContractorSchema = new Schema({
  ConID: { type: Number, unique: true, required: true },
  tradingName: { type: String, required: true },
  entityName: { type: String, required: true },
  abn: { type: String },
  trade: {
    type: String,
    enum: [
      "Plumbing",
      "Carpenter",
      "Cleaners",
      "Electrician",
      "Builder",
      "Landscaper",
      "Tiler",
    ],
    default: "Plumbing",
  },
  streetAddress: { type: String, required: true },
  suburb: { type: String, required: true },
  state: {
    type: String,
    enum: ["NSW", "VIC", "WA", "SA", "QLD", "ACT", "NT", "TAS"],
    default: "NSW",
  },
  postcode: { type: String, required: true },
  ohAndSRequested: { type: Boolean, default: false },
  contact: {
    name: { type: String },
    phone: { type: String, required: true },
    mobile: { type: String },
    fax: { type: String },
    email: { type: String, required: true },
  },
  paymentDetails: [PaymentSchema],
  insuranceDetails: [InsuranceSchema], // Embed insurance details as a subdocument array
  status: {
    type: String,
    enum: [
      "Approved",
      "Not Approved",
      "Restricted",
      "Exempt",
      "Alert",
      "Strata New",
      "Pending",
    ],
    default: "Pending",
  },
});

// Middleware to generate unique ConID before saving
StrataPlusContractorSchema.pre("save", async function (next) {
  try {
    if (!this.ConID) {
      const existingContractor = await this.model("StrataPlusContractor")
        .findOne()
        .sort("-ConID");
      const latestConID = existingContractor ? existingContractor.ConID : 0;
      this.ConID = latestConID + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const StrataPlusContractor = mongoose.model(
  "StrataPlusContractor",
  StrataPlusContractorSchema
);
export { StrataPlusContractor };
