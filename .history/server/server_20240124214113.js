import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.js";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken"
const app = express()

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.get('/api', (req, res) => {
    res.json(
       "from backend-side"
    );
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/profileimages');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({storage: storage});
  
  app.post("/image/profile", upload.single('file'), (req, res, err) => {
  
    return res.json({
      Status: "Success",
      filename: req.file.filename
    });
    /// tre sa trimitem inapoi req.file.path si req.file.filename pot
  });
  
  app.post("/image/profile/user", (req,res, err) => {
    const query = "UPDATE users SET profileimage = ? where username = ?";
    db.query(query, [req.body.filename, req.body.user], (err, result) => {
      if(err) return json(err);
      else {
        console.log("User's profile has been updated")
        return res.json({Status: "Success"})
      }
    })
  })
  
  app.post("/image/user", (req, res, err) => {
    const query = "Select profileimage from users where username = ?";
    db.query(query, [req.body.username], (err, data) => {
      if(err) {
        console.log(err);
        return res.json(err);
      }
      else {
        
        return res.json({
          Status: "Success",
          profileimage: data[0].profileimage
        });
      }
    })
  })
  
  const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/postimages');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload2 = multer({storage: storage2});
  
  app.post("/image/post", upload2.single('file'), (req, res, err) => {
  
    return res.json({
      Status: "Success",
      filename: req.file.filename
    });
    /// tre sa trimitem inapoi req.file.path si req.file.filename pot
  });
  
  const verifyJwt = (req, res, next) => {
    const token = req.headers["access-token"];
    if(!token){
      return res.json("we need token please provide it for next time")
    } else {
      jwt.verify(token, "jwtSecretKey", (err, decoded) => {
        if(err){
          res.json("Not Authenticated");
        }else{
           req.userId = decoded.id;
           next();
        }
      })
    }
  }

  app.get('/checkauth', verifyJwt, (req, res) => {
      return res.json("Authenticated");
  })
  
// server.js

const calculateBMI = require('./calculators/calculators.js');

// Calculators - BEGIN
app.post('/calculate-bmi', (req, res) => {
  console.log('Received request:', req.body);
  try {
    const { weight, height } = req.body;
    console.log(typeof weight);

    if (typeof weight !== 'number' || typeof height !== 'number') {
      res.status(400).send({ error: 'Weight and height must be numbers' });
      return;
    }

    const bmi = calculateBMI(weight, height);
    res.json({ bmi });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
