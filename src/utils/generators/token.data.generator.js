import { ClientError } from "shokhijakhon-error-handler";
import { AdminModel, InstructorModel } from "../../models/index.js";

async function generatorTokenData(findUser) {
  const flags = {
    is_student: false,
    is_instructor: false,
    is_admin: false,
    is_super_admin: false
  };

  if (findUser.role === "student") {
    return {
      ...flags,
      is_student: true
    };
  }

  if (findUser.role === "instructor") {
    const instructor = await InstructorModel.findOne({
      where: { user_id: findUser.id },
      attributes: ["id"]
    });

    if (!instructor) {
      throw new ClientError("Instructor not found", 404);
    }

    return {
      ...flags,
      is_instructor: true,
      instructor_id: instructor.id
    };
  }

  if (findUser.role === "admin") {
    const admin = await AdminModel.findOne({
      where: { user_id: findUser.id },
      attributes: ["is_super"]
    });

    if (!admin) {
      throw new ClientError("Admin not found", 404);
    }

    return {
      ...flags,
      is_admin: true,
      is_super_admin: admin.is_super
    };
  }

  throw new ClientError("Invalid role", 400);
}

export default generatorTokenData;
