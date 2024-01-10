/**
 * @typedef {Object} PermissionSchema
 * @property {string} code
 * @property {string} name
 * @property {string} description
 * @property {string|undefined} url
 * @property {string[]|undefined} links
 * @property {string|undefined} method
 * @property {"ENABLE"|"DISABLE"|"VIEW"} enable
 * @property {"PUBLIC"|"AUTHENTICATED_ROLE"|"SPECIFY_ROLES"} allows
 * @property {number[]|undefined} roles
 * @property {Promise|undefined} handler
 * @property {Promise[]|undefined} middlewares
 * @property {number} type
 * @property {PermissionSchema[]} permissions
 */

class Permission {
  //#region Attributes
  static TYPE = {
    MENU: 1,
    UI: 2,
    API: 3,
  };
  //#endregion

  /** @param {PermissionSchema} options */
  constructor(options) {
    this.code = options.code;
    this.name = options.name;
    this.description = options.description;
    this.handler = options.handler;
    this.middlewares = options.middlewares;
    this.middlewares = options.allows;
    this.links = options.links;
    this.enable = options.enable;
    this.roles = options.roles;

    const [method, url] = options.url.split(" ");
    this.method = method.toLowerCase;
    this.url = url;

    this.type = options.type ?? Permission.TYPE.UI;
    if (options.permissions) {
      /** @type {Permission[]} */
      this.permissions = this.createChilds(options.permissions);
    }
  }

  /** @param {Permission[]} permissions */
  createChilds(permissions) {
    if (!permissions || permissions.length === 0) return null;
    const pers = [];
    for (let i = 0; i < permissions.length; i++) {
      const permission = new Permission(permissions[i]);
      //   const childs = this.createChilds(permission.permissions);
      if (childs) permission.permissions = childs;
    }
    return pers;
  }

  /**
   * Get array of permissions. Include chillds
   * @returns {Permission[]}
   */
  listPermissions() {
    const pers = [];
    for (let i = 0; i < this.permissions.length; i++) {
      const per = this.permissions[i];
      pers.push(per);
      pers = [...per.listPermissions()];
    }
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
module.exports = Permission;
