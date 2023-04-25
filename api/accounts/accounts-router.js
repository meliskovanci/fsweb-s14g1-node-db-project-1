const router = require('express').Router()
const Accounts = require("./accounts-model");
const {checkAccountPayload,checkAccountNameUnique,checkAccountId,} = require("./accounts-middleware");

router.get('/', async(req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
})

router.get('/:id',checkAccountId, (req, res, next) => {
 res.json(req.account)
})

router.post('/',checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
   const newAccount = await Accounts.create(req.newAccount)
   res.status(201).json(newAccount)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.newAccount)
    res.status(200).json(updatedAccount)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',checkAccountId, async(req, res, next) => {
 try {
  const deletedAccount = await Accounts.deleteById(req.params.id)
  res.json(deletedAccount)
 } catch (error) {
  next(error)
 }
})

router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({message:err.message , stack: err.stack})
  next()
})

module.exports = router;
