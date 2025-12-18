import { sequelize } from "../lib/db.service.js";

import User from "./user/User.model.js";
import Admin from "./user/Admin.model.js";
import Instructor from "./user/Instructor.model.js";

import Category from "./course/Category.model.js";
import Course from "./course/Course.model.js";
import Lesson from "./course/Lesson.model.js";

import Purchase from "./order/Purchase.model.js";
import Payment from "./order/Payment.model.js";
import RefreshToken from "./session/Refreshtoken.model.js";

const UserModel = User(sequelize);
const AdminModel = Admin(sequelize);
const InstructorModel = Instructor(sequelize);

const CategoryModel = Category(sequelize);
const CourseModel = Course(sequelize);
const LessonModel = Lesson(sequelize);

const PurchaseModel = Purchase(sequelize);
const PaymentModel = Payment(sequelize);
const RefreshTokenModel = RefreshToken(sequelize);

/* ===== ASSOCIATIONS ===== */

// User ↔ Admin
UserModel.hasOne(AdminModel, { foreignKey: "user_id" });
AdminModel.belongsTo(UserModel, { foreignKey: "user_id" });

// User ↔ Instructor
UserModel.hasOne(InstructorModel, { foreignKey: "user_id" });
InstructorModel.belongsTo(UserModel, { foreignKey: "user_id" });

// Instructor ↔ Course
InstructorModel.hasMany(CourseModel, { foreignKey: "instructor_id" });
CourseModel.belongsTo(InstructorModel, { foreignKey: "instructor_id" });

// Category ↔ Course
CategoryModel.hasMany(CourseModel, { foreignKey: "category_id" });
CourseModel.belongsTo(CategoryModel, { foreignKey: "category_id" });

// Course ↔ Lesson
CourseModel.hasMany(LessonModel, { foreignKey: "course_id" });
LessonModel.belongsTo(CourseModel, { foreignKey: "course_id" });

// User ↔ Purchase
UserModel.hasMany(PurchaseModel, { foreignKey: "user_id" });
PurchaseModel.belongsTo(UserModel, { foreignKey: "user_id" });

// Course ↔ Purchase
CourseModel.hasMany(PurchaseModel, { foreignKey: "course_id" });
PurchaseModel.belongsTo(CourseModel, { foreignKey: "course_id" });

// Purchase ↔ Payment
PurchaseModel.hasOne(PaymentModel, { foreignKey: "purchase_id" });
PaymentModel.belongsTo(PurchaseModel, { foreignKey: "purchase_id" });

// User ↔ RefreshToken
UserModel.hasMany(RefreshTokenModel, { foreignKey: "user_id" });
RefreshTokenModel.belongsTo(UserModel, { foreignKey: "user_id" });

export {
  UserModel,
  AdminModel,
  InstructorModel,
  CategoryModel,
  CourseModel,
  LessonModel,
  PurchaseModel,
  PaymentModel,
  RefreshTokenModel
};

