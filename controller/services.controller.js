import Service from "../model/service.model.js";

export const addService = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      res.status(400).send({ error: "All fields are required." });
    }

    if (typeof name !== "string") {
      res.status(400).send({
        error: "Provided service name is invalid, It has to be string.",
      });
    }

    if (typeof description !== "string") {
      res.status(400).send({
        error: "Provided service description is invalid. It has to be string.",
      });
    }

    if (typeof price !== "number") {
      res.status(400).send({
        error: "Provided service price is invalid. It has to be number.",
      });
    }

    const service = new Service({ name, description, price });
    await service.save();
    res.status(201).send({
      success: "Service has been added to the database successfully.",
    });
  } catch (error) {
    console.error("Error adding services, check logs", error.message);
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services, check logs", error.message);
  }
};

export const getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    res.json(service);
  } catch (error) {
    console.error("Error fetching services, check logs", error.message);
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const service = await Service.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );

    if (!service) {
      return res
        .status(404)
        .json({ error: "Service does not exist in the database." });
    }

    return res
      .status(200)
      .json({ success: "Service updated successfully.", service });
  } catch (error) {
    console.error("Error updating service.", error.message);
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res
        .status(404)
        .json({ error: "Service does not exist in the database." });
    }
    return res.json({
      success: `Services with id: (${id}) deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting service.", error.message);
  }
};
