const parkingModel = require("../mongodb/models/parking");

module.exports.getAllVehicle = async (req, res) => {
  const { dateTime } = req.body;
  const filterDate = new Date(dateTime).toISOString();

  console.log(filterDate);
  try {
    const parkings = await parkingModel.find({
      dateTime: { $gte: filterDate },
    });

    if (parkings) res.status(200).send(parkings);
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};

module.exports.getVehicle = async (req, res) => {
  const entryId = req.query.eid;
  try {
    if (!entryId) throw new Error("Entry Id is Required");

    const parking = await parkingModel.findById(entryId);
    if (parking) res.status(200).send(parking);
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};

module.exports.addVehicle = async (req, res) => {
  const { vehicleNumber, vehicleType, exitTime, xoffset, yoffset, dateTime } =
    req.body;

  try {
    if (
      !vehicleNumber ||
      !vehicleType ||
      !exitTime ||
      !xoffset ||
      !yoffset ||
      !dateTime
    ) {
      throw new Error("Fields Cannot be Empty");
    }

    const curDate = new Date();
    console.log(curDate);

    const entDate = new Date(dateTime).toISOString();
    const extDate = new Date(exitTime).toISOString();

    if (entDate < curDate || exitTime < curDate)
      throw new Error("Date cannot be Less than current date");

    if (extDate <= entDate)
      throw new Error("Entry Time should be greater than Exit Time");

    const parking = await parkingModel.create({
      vehicleNumber: vehicleNumber,
      vehicleType: vehicleType,
      exitTime: extDate,
      xoffset: xoffset,
      yoffset: yoffset,
      dateTime: entDate,
    });

    if (parking) {
      res.status(200).send(parking);
    }
  } catch (err) {
    res.status(400).json({
      code: err.code,
      msg: err.message,
    });
  }
};

module.exports.filterData = async (req, res) => {
  const fil = req.params.filter;
  const filterDate = new Date(fil).toISOString();
  try {
    const parkings = await parkingModel.find({
      dateTime: { $lte: filterDate },
      exitTime: { $gte: filterDate },
    });

    if (parkings) res.status(200).send(parkings);
  } catch (err) {
    res.status(400).json({
      msg: err.message,
    });
  }
};
