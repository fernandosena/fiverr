import { Prisma, PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { renameSync } from "fs";
import jwt from "jsonwebtoken";

const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};
export const signUp = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    if (email && password) {
      const user = await prisma.user.create({
        data: {
          email,
          password: await generatePassword(password),
        },
      });
      return res.status(200).json({
        user: { id: user.id, email: user.email },
        jwt: createToken(email, user.id),
      });
    }
    return res.status(400).send("Email and Password required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Interval Server Error.");
  }
};

export const login = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(400).send("User not found.");
      }
      const auth = await compare(password, user.password);
      if (!auth) {
        return res.status(400).send("Invalid password");
      }

      return res.status(200).json({
        user: { id: user.id, email: user.email },
        jwt: createToken(email, user.id),
      });
    }
    return res.status(400).send("Email and Password required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Interval Server Error.");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    if (req?.userId) {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: {
          id: req.userId,
        },
      });
      delete user.password;
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Interval Server Error.");
  }
};

export const setUserInfo = async (req, res, next) => {
  try {
    if (req?.userId) {
      const { userName, fullName, description } = req.body;
      if (userName && fullName && description) {
        const prisma = new PrismaClient();
        const userNameValid = await prisma.user.findUnique({
          where: {
            username: userName,
          },
        });
        if (userNameValid) {
          return res.status(200).json({ userNameErro: true });
        }

        await prisma.user.update({
          where: {
            id: req.userId,
          },
          data: {
            username: userName,
            fullName,
            description,
            isProfileInfoSet: true,
          },
        });
        return res.status(200).send("Profile data updated successfully.");
      }
    } else {
      return res
        .status(400)
        .send("Username, full name and description should be included.");
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(400).json({
          userNameErro: true,
        });
      }
    } else {
      return res.status(500).send("Interval Server Error.");
    }
    throw err;
  }
};

export const setUserImage = async (req, res, next) => {
  try {
    if (req.file) {
      if (req.userId) {
        const date = Date.now();
        let fileName = "uploads/profiles/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const prisma = new PrismaClient();
        await prisma.user.update({
          where: {
            id: req.userId,
          },
          data: { profileImage: fileName },
        });
        return res.status(200).json({ img: fileName });
      }
      return res.status(400).send("Cookie Error.");
    }
    return res.status(400).send("Image not included.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Interval Server Error.");
  }
};
