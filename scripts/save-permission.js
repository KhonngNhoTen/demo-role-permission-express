const path = require("path");
const { connection } = require("../databases");
const { PermissionLoader } = require("../lib");
const { models } = require("../models");
const { init } = require("../models/Project.model");
const { Permission, Role } = models;

async function main() {
  const transaction = await connection.transaction();
  try {
    const Loader = new PermissionLoader(path.join(__dirname, "../permissions/**.permission.js"));
    Loader.loadFileRolePermisison(path.join(__dirname, "../role-permission.json"));
    for (let i = 0; i < Loader.permissions.length; i++) await savePermission(Loader.permissions[i]);

    for (let i = 0; i < Loader.roles.length; i++) {
      const role = Loader.roles[i];
      await connection.models["RolePermission"].destroy({ where: { RoleCode: role }, transaction });
      await saveRole(role, transaction);
      const policy = Loader.getPermissionsByRole(role);
      for (let j = 0; j < policy.length; j++) await saveRolePermisison(role, policy[j], transaction);
    }

    await transaction.commit();
    console.log("Save permision successfully!!");
    process.exit(1);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
  }
}

async function saveRole(role, transaction = null) {
  const roles = {
    User: {
      name: "User",
    },
    Leader: {
      name: "Leader",
    },
    Project_manager: { name: "Project manager" },
    Admin: { name: "Admin" },
  };

  const [r, created] = await Role.findOrCreate({
    where: { code: role },
    defaults: {
      name: roles[role].name,
      code: role,
    },
    transaction,
  });
  console.log(r);

  if (!created) await Role.update({ name: roles[role].name, code: role }, { where: { code: r.code }, transaction });

  return r;
}

/** @param {Permissions} permission */
async function savePermission(permission, transaction = null) {
  if (!permission.code) return null;
  const [per, created] = await Permission.findOrCreate({
    where: { code: permission.code },
    defaults: {
      code: permission.code,
      name: permission.name,
      desciption: permission.desciption ?? "",
      scope: permission.scope,
      url: permission.url,
      method: permission.method,
      type: permission.type,
    },
    transaction,
  });
  if (!created)
    await Permission.update(
      {
        code: permission.code,
        name: permission.name,
        desciption: permission.desciption ?? "",
        scope: permission.scope,
        url: permission.url,
        method: permission.method,
        type: permission.type,
      },
      { where: { code: per.code }, transaction }
    );
  return per;
}

async function saveRolePermisison(r, p, transaction = null) {
  await connection.models["RolePermission"].findOrCreate({
    where: {
      RoleCode: r,
      PermissionCode: p.code,
    },
    defaults: {
      RoleCode: r,
      PermissionCode: p.code,
    },
    transaction,
  });
}

main();
