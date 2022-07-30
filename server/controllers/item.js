const Item = require('../models/item.model');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({items})
  } catch(error) {
    return res.status(500).json({message: "Something went wrong.."});
  }
}

// exports.postItems = async(req, res) => {
//   const {name, price, isAvailable, comments, category} = req.body
//   try {
//     const newItem = await Item.create({name, price, isAvailable, comments, category});
//     return res.status(200).json({newItem})
//   } catch(error) {
//     return res.status(500).json({message: "Something went wrong.."});
//   }
// }