

import { sequelize } from "../lib/db.service.js";
import Category from "./course/Category.model.js";
import Course from "./course/Course.model.js";
import Lesson from "./course/Lesson.model.js";
import Payment from "./order/Payment.model.js";
import Purchase from "./order/Purchase.model.js";
import RefreshToken from "./session/Refreshtoken.model.js";
import Admin from "./user/Admin.model.js";
import Instructor from "./user/Instructor.model.js";
import User from "./user/User.model.js";

const UserModel = User(sequelize);
const AdminModel = Admin(sequelize);
const InstructorModel = Instructor(sequelize);
const RefreshTokenModel = RefreshToken(sequelize);
const PurchaseModel = Purchase(sequelize);
const PaymentModel = Payment(sequelize);
const CourseModel = Course(sequelize);
const LessonModel = Lesson(sequelize);
const CategoryModel = Category(sequelize);

export {
    UserModel,
    AdminModel,
    InstructorModel,
    RefreshTokenModel,
    PurchaseModel,
    PaymentModel,
    CourseModel,
    LessonModel,
    CategoryModel
};