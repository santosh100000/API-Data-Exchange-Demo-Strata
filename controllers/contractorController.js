import { StrataPlusContractor } from "../models/StrataPlusContractor.js";

const addContractor = async (req, res) => {
  try {
    console.log("Got inside the controller");

    // Get the client string from the request body

    const contractorData = req.body;

    console.log(`contractor data: ${contractorData}`);
    console.log("updated details:", JSON.stringify(contractorData, null, 2));

    // Generate ConID
    const existingContractor = await StrataPlusContractor.findOne().sort(
      "-ConID"
    );
    const latestConID = existingContractor ? existingContractor.ConID : 0;

    // Create a new Contractor instance with the mapped clients array
    const contractor = new StrataPlusContractor({
      ...contractorData,
      ConID: latestConID + 1,
    });

    // Save the contractor to the database
    await contractor.save();

    console.log("Contractor saved successfully");
    res
      .status(200)
      .json({ message: "Contractor added successfully", contractor });
  } catch (error) {
    console.error("Error adding contractor:", error);
    res
      .status(500)
      .json({ error: "Failed to add contractor", message: error.message });
  }
};

export default addContractor;
