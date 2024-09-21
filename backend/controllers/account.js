const  mongoose  = require('mongoose')
const Account = require('../models/account.Schema')
const User = require('../models/user.Schema')

module.exports.getBalance = async(req,res) =>
{
    // console.log(req.user)
    const account = await Account.findOne({userId:req.user})
    // console.log(account)

    return res.json({ balance : account.balance})

}

module.exports.transfer = async(req,res) =>
{
    const session = await mongoose.startSession()
    session.startTransaction()

    const {amount , sendTo} = req.body
    // console.log(amount, sendTo)
    const account = await Account.findOne({userId : req.user}).session(session)
    // console.log(account)
    if(amount < 0)
    {
        return res.json({msg: 'Amount should be greater that  0 '})
    }
    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({msg: 'Insufficient balance'})
    }
    const toAccount = await Account.findOne({userId: sendTo}).session(session)
    
    if(!toAccount) 
    {
        await session.abortTransaction()
        return res.status(400).json({msg: 'User account not found'})
    }

    await Account.updateOne({userId : req.user}, { $inc :{ balance : -amount } }).session(session)
    await Account.updateOne ({userId: sendTo}, { $inc : { balance: +amount } }).session(session)

    await session.commitTransaction();

    return res.json({msg :'Transfer successfull'})

}