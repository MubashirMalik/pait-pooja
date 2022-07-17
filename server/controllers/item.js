const Item = require('../models/item.model');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({items})
  } catch(error) {
    return res.status(500).json({message: "Something went wrong.."});
  }
}