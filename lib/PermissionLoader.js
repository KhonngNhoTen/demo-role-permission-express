/**
 * Relationship includes:
 * - Permission - permossion
 * - Roles - permission
 * @typedef {Object} RelationshipPermissions
 * @property {number} role
 * @property {string} permissionCode
 * @property {string} linkedPermisisonCode
 */

const { glob } = require("glob");
const Permission = require("./Permission");
class PermissionLoader {
  /** @type {Permission[]} */
  permissions = [];
  roles = [];

  /** @type {RelationshipPermissions[]} */
  relationships = [];

  constructor(myPaths) {
    glob.sync(myPaths).forEach((e) => this.loadFile(e));
    console.log(this.permissions);
  }

  loadFile(path) {
    /** @type {import("./Permission")}  */
    const permission = require(path);
    permission.getPermissions().forEach((per) => {
      const setRoles = new Set(this.roles);
      this.permissions.push(per);
      per.links.forEach((linked) =>
        this.relationships.push({ permissionCode: per.code, linkedPermisisonCode: linked })
      );
      per.roles.forEach((role) => {
        setRoles.add(role);
        this.relationships.push({ permissionCode: per.code, role });
      });
      this.roles = Array.from(this.roles);
    });
  }

  getPermissionsByCode(code) {
    return this.permissions.filter((per) => per.code === code);
  }

  getPermissionsByRole(role) {
    const relations = this.relationships.filter((e) => e.role === role);
    return this.permissions.filter((e) => {
      return relations.find((re) => re.permissionCode === e.code);
    });
  }

  getPermissionsByPermission(permissionCode) {
    const relations = this.relationships.filter((e) => e.linkedPermisisonCode === permissionCode);
    return this.permissions.filter((e) => {
      return relations.find((re) => re.permissionCode === e.code);
    });
  }

  getRoles() {
    return this.roles;
  }

  getApis() {
    return this.permissions.filter((e) => e.type === Permission.TYPE_PERMISSION.API);
  }
}

module.exports = PermissionLoader;
