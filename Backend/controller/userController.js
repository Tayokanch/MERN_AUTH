import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const SECRET = process.env.SECRET;
const signUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Missing Field' });
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: 'User with this email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ name, email, role, password: hashedPassword });
  try {
    await user.save();
    return res.status(201).json({ message: "You've successfully signed up" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  try {
    if (!existingUser) {
      return res.status(400).json({ error: 'User not found. Signup Please' });
    }

    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    const payload = {
      name: existingUser.name,
      id: existingUser._id.toString(),
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: '35s' });
    console.log('Gegenerated Token\n', token);

    //For Refresh Token

    res.cookie('token', token, {
      path: '/',
      maxAge: 30 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ erro: 'Internal Server Error' });
  }
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  //once the cookie expires, it get removed from the headers authomatically
  if (!cookies)
    return res.status(404).json({ message: 'Access denied. Token is missing' });
  const token = cookies.split('=')[1];
  if (!token)
    return res.status(404).json({ message: 'Token not found. Please log in' });
  jwt.verify(String(token), SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid Token' });
    }
    req.decodedUser = decodedUser;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.decodedUser.id;
  try {
    const user = await User.findById(userId, '-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  try {
    if (!cookies)
      return res
        .status(404)
        .json({ message: 'Access denied. Token is missing' });
    const prevToken = cookies.split('=')[1];
    if (!prevToken) return res.status(404).json({ message: 'Token not found' });
    jwt.verify(String(prevToken), SECRET, (err, decodedUser) => {
      if (err) {
        return res.status(400).json({ message: 'Authentication failed' });
      }
      res.clearCookie('token');
      req.cookies['token'] = '';
      const token = jwt.sign({ id: decodedUser.id }, SECRET, {
        expiresIn: '35s',
      });

      console.log('Regenerated Token\n', token);

      res.cookie('token', token, {
        path: '/',
        maxAge: 30 * 1000,
        httpOnly: true,
      });
      req.decodedUser = decodedUser;

      next();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logOut = (req, res)=>{
  const cookies = req.headers.cookie;
  if (!cookies)
    return res.status(404).json({ message: 'Access denied. Token is missing' });
  const token = cookies.split('=')[1];
  if (!token)
    return res.status(404).json({ message: 'Token not found. Please log in' })
  jwt.verify(String(token), SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(400).json({ message: 'Authentication failed' });
    }
    res.clearCookie('token');
    req.cookies['token'] = '';
    return res.status(200).json({message: "Succesffuly Logged out"})
})
}

export { signUp, login, verifyToken, getUser, refreshToken, logOut };
