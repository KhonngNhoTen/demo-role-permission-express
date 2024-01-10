const Permission = require("./Permission");

/** @typedef {import("./Permission").PermissionSchema} PermissionSchema */

/**
 * @typedef {Object} BaseRouteSchema
 * @property {string} baseUrl
 * @property {"ENABLE"|"DISABLE"|"VIEW"} enable
 * @property {"PUBLIC"|"AUTHENTICATED_ROLE"|"SPECIFY_ROLES"} allows
 * @property {number[]|undefined} roles
 * @property {PermissionSchema[]} permissions
 */

class BaseRoute {
  /** @param {BaseRouteSchema} options */
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.enable = options.enable;
    this.allows = options.allows;
    this.roles = options.roles;
    if (options.permissions) {
      this.permissions = this.createChilds(options.permissions);
    }
  }

  /** @param {PermissionSchema[]} permissions */
  createChilds(permissions) {
    if (!permissions || permissions.length === 0) return null;
    const childs = [];
    for (let i = 0; i < permissions.length; i++) childs.push(new Permission(permissions[i]));
    return childs;
  }

  /**
   * Get array of permissions. Include chillds
   * @returns {Permission[]}
   */
  listPermissions() {
    const pers = [];
    for (let i = 0; i < this.permissions.length; i++) pers = [...this.permissions[i].listPermissions()];
    return pers;
  }

  /**
   * Get array of APIs. Include chillds
   * @returns {Permission[]}
   */
  listApis() {
    return this.listPermissions().filter((e) => e.type === Permission.TYPE.API);
  }
}

module.exports = BaseRoute;
