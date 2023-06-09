const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require("../helpers/create-user-token")
const getToken = require("../helpers/get-token")
const getUserBytoken = require("../helpers/get-user-by-token")

module.exports = class UserController {

    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body
        

        //validations
        if(!name){
            res.status(422).json({message:"O nome é obrigatório"})
            return
        }

        if(!email){
            res.status(422).json({message:"O email é obrigatório"})
            return
        }

        if(!phone){
            res.status(422).json({message:"O phone é obrigatório"})
            return
        }

        if(!password){
            res.status(422).json({message:"O password é obrigatório"})
            return
        }

        if(!confirmPassword){
            res.status(422).json({message:"O confirmPassword é obrigatório"})
            return
        }
        

        if(password !== confirmPassword){
            res.status(422).json({message:"O password e o confirmPassword não combinam"})
            return
        }
        
        //check if user exists 
        const userExists = await User.findOne({email: email})

        if(userExists) {
            res.status(422).json({message:"O email já está cadastrado"})
            return
        }
        
        
        //create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save()
            
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({message: error})

        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        //check if user exists 
        const user = await User.findOne({email: email})
        if(!user) {
            res.status(422).json({message:"O email não está cadastrado"})
            return
        }
        
        if(!password) {
            res.status(422).json({message:"A senha é obrigatória"})
            return
        }

        //check if password match
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) {
            res.status(422).json({message:"Senha incorreta"})
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if(req.headers.authorization) {
            
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if(!user) {
            res.status(422).json({message:"Usuário não encontrado"})

            return
        }

        res.status(200).json({user})

    }

    static async editUser(req, res) {
        
        const id = req.params.id

        //check if user exists
        const token = getToken(req)
        const user = await getUserBytoken(token)

        const { name, email, phone, password, confirmPassword } = req.body

        if(req.file) {
            user.image = req.file.filename
        }

        //validations
        if(!name){
            res.status(422).json({message:"O nome é obrigatório"})
            return
        }

        user.name = name
        

        if(!email){
            res.status(422).json({message:"O email é obrigatório"})
            return
        }

        //check if email has already taken
        const userExists = await User.findOne({email: email})

        if(user.email !== email && userExists){
            res.status(422).json({message:"Utilize outro email"})
            return
        }
        user.email = email
        
        if(!phone){
            res.status(422).json({message:"O phone é obrigatório"})
            return
        }

        user.phone = phone

        if(!password){
            res.status(422).json({message:"O password é obrigatório"})
            return
        }

        if(password !== confirmPassword){
            res.status(422).json({message:"As senhas não combinam"})
            return
        } else if (password === confirmPassword && password != null ) {

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            await User.findOneAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true},
            )

            res.status(200).json({message: "Usuário atualizado com sucesso"})
        } catch (error) {
            res.status(500).json({message: error})
            return
        }
    }
}
