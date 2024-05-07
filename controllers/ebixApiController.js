import axios from "axios";
import { StrataPlusContractor } from "../models/StrataPlusContractor.js"; // Assuming you have a Contractor model

// Controller function to synchronize contractor data with the Ebix API
export const syncContractorsWithEbix = async (req, res) => {
  try {
    // Extract the URL from the request body
    const { url } = req.body;
    console.log(`url: ${url}`);
    // Make a GET request to the provided URL
    const response = await axios.get(url);
    console.log(`response ${response}`);
    // Extract the contractors data from the response
    const ebixContractors = response.data;

    let newContractorsCount = 0;
    let updatedContractorsCount = 0;
    const newContractors = [];

    // Iterate through each contractor from Ebix
    for (const ebixContractor of ebixContractors) {
      // Check if the contractor already exists in Strataplus database
      const existingContractor = await StrataPlusContractor.findOne({
        ConID: ebixContractor.ConID,
      });

      if (existingContractor) {
        // Update existing contractor
        await StrataPlusContractor.findOneAndUpdate(
          { ConID: ebixContractor.ConID },
          ebixContractor
        );
        updatedContractorsCount++;
      } else {
        // Create new contractor if not exists
        await StrataPlusContractor.create(ebixContractor);
        newContractors.push(ebixContractor);
        newContractorsCount++;
      }
    }

    return res.status(200).json({
      success: true,
      message: "Contractors synchronized successfully",
      newContractorsCount: newContractorsCount,
      updatedContractorsCount: updatedContractorsCount,
      totalContractorsCompared: ebixContractors.length,
      newContractors: newContractors,
    });
  } catch (error) {
    console.error("Error syncing contractors with Ebix:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
