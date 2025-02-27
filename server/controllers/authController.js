const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    let user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    } else {
      user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "Email already exists" });
      } else {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Create and send JWT
        
      res.json({ msg: "User registered successfully" });

        
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        
        const payload = {
            user: {
                id: user.id,
                username: user.username,
                   }
        };
        
        jwt.sign(payload, "secret", (err, token) => {
            if (err) throw err;
            res.json({ token,success: true });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}


module.exports = { registerUser,loginUser };
