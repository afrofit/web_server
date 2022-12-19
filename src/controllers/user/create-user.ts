import { Request, Response } from "express";
import _ from "lodash";
import { Performance } from "./../../entity/Performance";
import { TodaysActivity } from "./../../entity/TodaysActivity";
import { AppDataSource } from "./../../data-source";

import { STATUS_CODES } from "../../types/status-codes";
import validateCreateUser from "./validation/create-user";
import { User } from "../../entity/User";
import { CreateUserRequestType } from "./types/create-user-request-type";
// import { nodeMailerTransporter } from "../../config";

const createUser = async (req: Request, res: Response) => {
  const { error } = validateCreateUser(req.body);

  if (error)
    return res.status(STATUS_CODES.BAD_REQUEST).send(error.details[0].message);

  const {
    lastName,
    firstName,
    username,
    email,
    displayPicId,
    password,
  }: CreateUserRequestType = req.body;

  try {
    const usersRepo = AppDataSource.getMongoRepository(User);
    const existingUsername = await usersRepo.findOneBy({ username });

    if (existingUsername)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Username is already taken, try a unique one.");

    const existingUserEmail = await usersRepo.findOneBy({ email });

    if (existingUserEmail)
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send("Email already exists, you can try logging with this email.");

    /** Now let's create a user */
    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;
    user.lastName = lastName;
    user.firstName = firstName;
    user.displayPicId = displayPicId;
    if (req.file) user.imageUrl = `image/${req.file.filename}`;

    await usersRepo.save(user);

    /** We need to create empty activities for the user also */
    const todaysActivityRepo = AppDataSource.getMongoRepository(TodaysActivity);
    const performanceRepo = AppDataSource.getMongoRepository(Performance);

    const todaysActivity = new TodaysActivity();
    const performanceData = new Performance();

    performanceData.userId = user.id.toString();
    performanceData.caloriesBurned = 0;
    performanceData.daysActive = 0;
    performanceData.totalUserSteps = 0;
    performanceData.totalUserTime = 0;

    todaysActivity.userId = user.id.toString();
    todaysActivity.caloriesBurned = 0;
    todaysActivity.bodyMovements = 0;

    await performanceRepo.save(performanceData);
    await todaysActivityRepo.save(todaysActivity);

    const token = user.generateToken();

    //Send email
    // const mailOptions = {
    //   from: `"Afrofit Member Services" <${process.env.EMAIL_USER}>`, // sender address
    //   to: user.email,
    //   subject: "Welcome!",
    //   template: "new_user",
    //   context: {
    //     name: user.username,
    //     adminEmail: "afrofitapp@gmail.com",
    //   },
    // };

    /** Let's really send the email now! */
    // nodeMailerTransporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     return console.log(error);
    //   }
    //   console.log("Message sent: " + info.response);
    // });

    return res
      .status(STATUS_CODES.CREATED)
      .header(process.env.TOKEN_HEADER, token)
      .send({ token, id: user.id, email: user.email });
  } catch (error) {
    console.error(error);
    return res
      .status(STATUS_CODES.INTERNAL_ERROR)
      .send("An error occured trying to create your account.");
  }
};

export default createUser;
