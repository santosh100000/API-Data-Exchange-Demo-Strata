import { StrataPlusContractor } from "../models/StrataPlusContractor.js";

const getContractorsForEbix = async (req, res) => {
  try {
    // Query the database to find all contractors with client 'Strataplus'
    const contractors = await StrataPlusContractor.find().select(
      "-paymentDetails"
    );

    console.log("got called for Ebix end point api");
    console.log(contractors);

    // Return the list of contractors as JSON response
    res.status(200).json(contractors);
  } catch (error) {
    // If there's an error, return an error response
    console.error("Error retrieving Strataplus contractors:", error);
    res.status(500).json({
      error: "Failed to retrieve Strataplus contractors",
      message: error.message,
    });
  }
};

// Export the controller function
export default getContractorsForEbix;
