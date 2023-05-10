const userModel = require("../model/user");

const addUser = async (req,res) => {
    try {
        const {name, age, hobbies} = req.body;
        if(!name || !age || !hobbies){
            return res.status(400).json({message: "All fields required"});
        }
        const data = await userModel.create({
            username: name,
            age,
            hobbies
        })
        return res.status(201).json({message: "newly record created", data: data})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const updateUser = async (req,res) => {
    try {
        const {userId} = req.params
        const {name, age, hobbies} = req.body;
        const userData = await userModel.findOne({_id: userId});
        if(!userData){
            return res.status(404).json({message: "Data doesn't exists"});
        }
        const data = await userModel.findByIdAndUpdate({_id: userId},{
            $set: {
                username: name,
                age,
                hobbies
            }
        })
        return res.status(201).json({message: "updated record", data: data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const getData = async (req, res) => {
    try {
        const data = await userModel.find();
        return res.status(200).json({message: "all users records", data: data});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const getDataById = async (req, res) => {
    try {
        const {userId} = req.params;
        const data = await userModel.findOne({_id: userId});
        if(!data){
            return res.status(404).json({message: "Data doesn't exists"});
        }
        return res.status(200).json({message: "user records", data: data});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const deleteRecord = async (req, res) => {
    try {
        const {userId} = req.params
        console.log(userId)
        const data = await userModel.findOne({_id: userId});
        if(!data){
            return res.status(404).json({message: "Data doesn't exists"});
        }
        await userModel.findByIdAndDelete({_id: userId});
        return res.status(204).json({message: "Record deleted successfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Interal Server Error"});
    }
}

module.exports = {
    addUser,
    updateUser,
    getData,
    getDataById,
    deleteRecord
}