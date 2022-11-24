import { Categories, Transaction } from "../models/models.js";

//set categoireis
//post http://localhost:8080/api/categories/post
export const setCategories = async (req, res) => {
  const Create = new Categories({
    type: "Saving",
    color: "#FCBE44",
  });
  try {
    const data = await Create.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get categories
//get:http://localhost:8080/api/categories/get
export const getCategories = async (req, res) => {
  let list = await Categories.find({ type: "Saving" });
  try {
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

//set transections
//post:http://localhost:8080/api/transactions/post
export const setTransactions = async (req, res) => {
  if (!req.body) return res.status(400);
  const { name, type, amount } = req.body;

  const transactions = new Transaction({
    name,
    type,
    amount,
    date: Date.now(),
  });

  const data = await transactions.save();
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get tall transections
//get:http://localhost:8080/api/transactions/get
export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({});

  try {
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};
//delete  transections
//get:http://localhost:8080/api/transactions/id
export const deleteTransection = async (req, res) => {
  if (!req.body) res.status(400).json({ message: "Request body not Found" });
  await Transaction.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted...!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Record");
    });
};

export const get_Labels = async (req, res) => {
  Transaction.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
};
