import express from 'express';
import User from '../model/user.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const role = req.decodedUser.role;
    if (!role === 'admin')
      res.status(400).json({ message: "you're not permitted" });

    const users = await User.find({}, '-password -role');
    if (!users) return res.status(404).json({ message: 'No users found' });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
