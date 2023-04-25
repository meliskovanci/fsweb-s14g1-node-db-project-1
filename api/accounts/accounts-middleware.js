const db = require("../../data/db-config");
const Accounts = require("./accounts-model");



exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  if(name === undefined || budget === undefined){
    res.status(400).json({message:"name and budget are required"})
    next();
  }else if (name.trim().lentgh < 3 || name.trim().lentgh > 100){
    res.status(400).json({message:"name of account must be between 3 and 100"})
    next();
  } else if(typeof budget !=="number" ){
    res.status(400).json({message:"budget of account must be a number"})
    next();
  } else if( budget < 0 || budget > 1000000){
    res.status(400).json({message:"budget of account is too large or too small"})
    next();
  } else{
    req.body.name = name.trim();
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const trimmedName = req.body.name.trim();
    const existingName = await db("accounts").where("name", trimmedName).first();
    if (existingName) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      req.newAccount = { name: trimmedName, budget: req.body.budget };
      next();
    }
  } catch (error) {
    next(error);
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await Accounts.getById(id);
    if (account) {
      req.account = account;
      next();
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (err) {
    next(err);
  }
}
