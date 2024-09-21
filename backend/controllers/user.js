const User = require('../models/user.Schema')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const Account = require('../models/account.Schema')


const signupSchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    password: zod.string()
})
module.exports.register = async(req,res) =>
{
    
    console.log(req.body)
    const {success} = signupSchema.safeParse(req.body)
    if(!success)
    {
        return res.json({
            msg: 'Email already taken / Incorrect Inputs'
        })
    }

    const user = await User.findOne({email : req.body.email })
    if(user)
    {
        return res.json({
            msg: "User with given email already exists"
        })
    }

    const createdUser = await User.create({name: req.body.name, email : req.body.email, password :  req.body.password})
    if(!createdUser)
        return res.json({msg: 'User creation failes'})

    await Account.create({userId : createdUser._id, balance : 1 + Math.floor(Math.random() * 100000)})

    return res.json({msg: 'User created successfully!',
        createdUser
    })

}



module.exports.login = async(req,res) =>
{
    const { email, password} = req.body

    const user = await User.findOne({email})
    if(!user)
    {
        return res.json({msg: 'email not registered'})
    }
    
    if(user.password !== password)
    {
        return res.json({msg: 'Invalid password!'})
    }
    let userId = user._id
    let token = jwt.sign({userId }, process.env.JWT_SECRET)

    return res.json({msg: 'User signed in ', token })


}

const updateBody = zod.object({
    name : zod.string().optional(),
    email : zod.string().optional(),
    password : zod.string().optional()
})

module.exports.update = async(req,res) =>
{

    const {success} = updateBody.safeParse(req.body)

    if(!success)
    {
        return res.status(411).json({msg: 'Error while updating info'})
    }

     let result = await User.updateOne({id: req.userId}, {$set : req.body})
    //  console.log(result)
     if (result.modifiedCount === 0) {
        return res.status(404).json({ msg: 'User not found or no changes made' });
    }
    return res.json({msg: 'User updated'})
}


module.exports.filterBy = async(req,res) =>
{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            name: {
                "$regex": filter
            }
        }, {
            email: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            name: user.name,
            email: user.email,
            _id: user._id
        }))
    })
}