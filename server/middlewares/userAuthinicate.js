const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const userAuthnicate = async (req, res, next) => {
 const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const token = req.header("Authorization").split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ msg: "authorization denied" });
        }
        
        
        const verified = jwt.verify(token,"secret");
      
       
        console.log(verified);
        if (!verified) {
            return res.status(401).json({ msg: "authorization denied" });
        }
        req.user = verified.user.id;
        console.log(req.user);
        next();
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
module.exports = userAuthnicate;
