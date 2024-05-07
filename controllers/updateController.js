import { StrataPlusContractor } from "../models/StrataPlusContractor.js";

const updateContractor = async (req, res) => {
  const { ConID } = req.params;
  const updatedDetails = req.body;

  console.log(`updated details; ${updatedDetails}`);
  console.log("updated details:", JSON.stringify(updatedDetails, null, 2));

  try {
    const contractor = await StrataPlusContractor.findOne({ ConID });

    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }

    // Update insurance or license details if provided in the request body
    if (updatedDetails.insuranceDetails) {
      contractor.insuranceDetails = updatedDetails.insuranceDetails;
    }

    // Update other contractor details
    delete updatedDetails.insuranceDetails; // Remove insurance details from updatedDetails
    Object.assign(contractor, updatedDetails);

    // Save the updated contractor
    const updatedContractor = await contractor.save();

    res.status(200).json(updatedContractor);
  } catch (error) {
    console.error("Error updating contractor:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default updateContractor;
