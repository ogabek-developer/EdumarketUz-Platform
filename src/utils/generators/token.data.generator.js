
import { ClientError } from "shokhijakhon-error-handler";
import { AdminModel } from "../../models/index.js";

async function generatorTokenData(tokenData, user) {

  if (user.role === "admin") {
    const admin = await AdminModel.findOne({
      where: { user_id: user.id }
    });

    if (!admin) {
      throw new ClientError("Admin data not found", 404);
    }

    return {
      ...tokenData,
      is_admin: true,
      is_super: admin.is_super
    };  
  }

  return {
    ...tokenData,
    is_admin: false,
    is_super: false
  };
}

export default generatorTokenData;
