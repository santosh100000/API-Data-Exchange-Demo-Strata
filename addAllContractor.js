import mongoose from "mongoose";
import { StrataPlusContractor } from "./models/StrataPlusContractor.js"; // Import your Contractor model
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_CONNECTION_STRING;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const addContractors = async (contractors) => {
  try {
    // Iterate over each contractor object
    for (const contractorData of contractors) {
      // Create a new Contractor document
      const contractor = new StrataPlusContractor(contractorData);
      // Save the document to the database
      await contractor.save();
      console.log(`Contractor added: ${contractor._id}`);
    }
    console.log("All contractors added successfully.");
  } catch (error) {
    console.error("Error adding contractors:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// updatePaymentDetails(contractors);

const contractors = [
  {
    contact: {
      name: "Michael Brown",
      phone: "555666777",
      fax: "777888999",
      email: "michael@example.com",
    },
    _id: "65fc3015b6eeefd4990a8fe3",
    ConID: 123458,
    tradingName: "GHI Services",
    entityName: "GHI Services Pty Ltd",
    abn: "34567890123",
    trade: "Carpenter",
    streetAddress: "789 Elm Street",
    suburb: "Brisbane",
    state: "QLD",
    postcode: "4000",
    ohAndSRequested: false,
    status: "Approved",
    __v: 0,
    paymentDetails: {
      contractorId: "65fc3015b6eeefd4990a8fe3",
      accountName: "Michael Brown",
      bank: "Sample Bank",
      bsb: "234567",
      accountNumber: "876543210",
      payPerHour: 55,
    },
  },
  {
    contact: {
      name: "Emily Johnson",
      phone: "999888777",
      fax: "444555666",
      email: "emily@example.com",
    },
    _id: "65fc3015b6eeefd4990a8fe9",
    ConID: 123460,
    tradingName: "MNO Plumbing",
    entityName: "MNO Plumbing Pty Ltd",
    abn: "56789012345",
    trade: "Plumber",
    streetAddress: "678 Maple Avenue",
    suburb: "Perth",
    state: "WA",
    postcode: "6000",
    ohAndSRequested: true,
    status: "Approved",
    __v: 0,
    paymentDetails: {
      contractorId: "65fc3015b6eeefd4990a8fe9",
      accountName: "Emily Johnson",
      bank: "Sample Bank",
      bsb: "345678",
      accountNumber: "765432109",
      payPerHour: 60,
    },
  },
  {
    contact: {
      name: "Sarah Williams",
      phone: "444555666",
      fax: "777888999",
      email: "sarah@example.com",
    },
    _id: "65fc3015b6eeefd4990a8ffc",
    ConID: 123466,
    tradingName: "EFG Maintenance",
    entityName: "EFG Maintenance Pty Ltd",
    abn: "98765432109",
    trade: "Maintenance",
    streetAddress: "1213 Oak Street",
    suburb: "Brisbane",
    state: "QLD",
    postcode: "4000",
    ohAndSRequested: true,
    status: "Approved",
    __v: 0,
    paymentDetails: {
      contractorId: "65fc3015b6eeefd4990a8ffc",
      accountName: "Sarah Williams",
      bank: "Sample Bank",
      bsb: "456789",
      accountNumber: "654321098",
      payPerHour: 65,
    },
  },
  {
    contact: {
      name: "Michelle Brown",
      phone: "777888999",
      fax: "222333444",
      email: "michelle@example.com",
    },
    _id: "65fc3016b6eeefd4990a9005",
    ConID: 123469,
    tradingName: "LMN Services",
    entityName: "LMN Services Pty Ltd",
    abn: "65432109876",
    trade: "Services",
    streetAddress: "1516 Walnut Street",
    suburb: "Hobart",
    state: "TAS",
    postcode: "7000",
    ohAndSRequested: false,
    status: "Pending",
    __v: 0,
    paymentDetails: {
      contractorId: "65fc3016b6eeefd4990a9005",
      accountName: "Michelle Brown",
      bank: "Sample Bank",
      bsb: "567890",
      accountNumber: "543210987",
      payPerHour: 70,
    },
  },
  {
    contact: {
      name: "Richard Miller",
      phone: "111222333",
      fax: "444555666",
      email: "richard@example.com",
    },
    _id: "65fc3016b6eeefd4990a900e",
    ConID: 123472,
    tradingName: "QWE Services",
    entityName: "QWE Services Pty Ltd",
    abn: "32109876543",
    trade: "Services",
    streetAddress: "1819 Pine Street",
    suburb: "Adelaide",
    state: "SA",
    postcode: "5000",
    ohAndSRequested: true,
    status: "Not Approved",
    __v: 0,
    paymentDetails: {
      contractorId: "65fc3016b6eeefd4990a900e",
      accountName: "Richard Miller",
      bank: "Sample Bank",
      bsb: "678901",
      accountNumber: "432109876",
      payPerHour: 75,
    },
  },
];
const updatePaymentDetails = async (contractors) => {
  try {
    // Iterate over each contractor object
    for (const contractorData of contractors) {
      // Update the payment details for the contractor
      await StrataPlusContractor.findOneAndUpdate(
        { ConID: contractorData.ConID },
        { $set: { paymentDetails: contractorData.paymentDetails } }
      );
      console.log(
        `Payment details updated for contractor with ConID: ${contractorData.ConID}`
      );
    }
    console.log("All payment details updated successfully.");
  } catch (error) {
    console.error("Error updating payment details:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

//updateContractors(contractors);
addContractors(contractors);
//updatePaymentDetails(contractors);
