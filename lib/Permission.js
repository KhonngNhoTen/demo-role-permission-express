/**
 * @typedef {Object} PermissionSchema
 * @property {string} code
 * @property {string} name
 * @property {string} desciption
 * @property {string} url
 * @property {string} baseUrl
 * @property {"PUBLIC"|"AUTHENTICATED_USER"|"SPECIFY_ROLES"} scope
 * @property {Promise[]} middlewares
 * @property {Promise} handler
 * @property {string[]} links
 * @property {PermissionApiSchema[]} apis
 * @property {PermissionUiSchema[]} ui
 */
/**
 * @typedef {Object} PermissionUiSchema
 * @property {string} code
 * @property {string} name
 * @property {string} desciption
 * @property {"PUBLIC"|"AUTHENTICATED_USER"|"SPECIFY_ROLES"} scope
 * @property {string[]} links
 * @property {PermissionUiSchema[]} ui
 * */
/**
 * @typedef {Object} PermissionApiSchema
 * @property {string} code
 * @property {string} name
 * @property {string} desciption
 * @property {string} url
 * @property {"PUBLIC"|"AUTHENTICATED_USER"|"SPECIFY_ROLES"} scope
 * @property {Promise[]} middlewares
 * @property {Promise} handler
 * @property {string[]} links
 */

const e = require("express");

class Permission {
  static TYPE_PERMISSION = {
    API: 1,
    UI: 2,
  };

  /**
   * @param {PermissionSchema} schema
   * @param {Permission} wrapperPermission
   */
  constructor(schema, wrapperPermission = null) {
    // Create instance
    this.name = schema.name;
    this.code = schema.code;
    this.desciption = schema.desciption;

    this.scope = schema.scope ?? "SPECIFY_ROLES";
    this.roles = schema.roles ?? [];

    this.middlewares = schema.middlewares;
    this.handler = schema.handler;

    this.url = this.method = null;
    if (schema.url) {
      let [method, url] = schema.url.split(" ");
      method = method.toLowerCase();
      this.method = method;
      this.url = wrapperPermission && wrapperPermission.baseUrl ? wrapperPermission.baseUrl + url : url;
    }

    this.baseUrl = schema.baseUrl;
    this.links = schema.links ?? [];

    if (schema.type) this.type = schema.type;
    else this.type = this.method && this.url ? Permission.TYPE_PERMISSION.API : Permission.TYPE_PERMISSION.UI;

    this.isGenerated = this.code !== undefined;
    this.permissions = [];

    schema.ui = schema.ui ?? [];
    schema.apis = schema.apis ?? [];

    /** @type {Permission[]} */
    this.permissions = [];

    if (Array.isArray(schema)) {
      this.permissions = this.permissions.concat(this.createChilds(schema, this));
      this.enable = false;
    } else {
      this.permissions = this.permissions.concat(this.createChilds([...schema.ui, ...schema.apis], this));
      this.enable = true;
    }
  }

  /** @param {PermissionSchema[]} permissions */
  createChilds(permissions, wrapperPermission) {
    const that = this;
    if (!permissions || permissions.length === 0) return [];
    const result = [];
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      result.push(new Permission(permission, that));
    }
    return result;
  }

  /** @returns {Permission[]} */
  getPermissions() {
    let permissions = [];
    if (this.enable) permissions.push(this);
    for (let i = 0; i < this.permissions.length; i++)
      permissions = [...permissions, ...this.permissions[i].getPermissions()];

    return permissions;
  }

  /** @returns {Permission[]} */
  getApis() {
    return this.getPermissions().filter((e) => e.type === Permission.TYPE_PERMISSION.API);
  }

  registry(router) {
    const middlewares = [...(this.middlewares ?? []), this.handler];
    router[this.method](this.url, middlewares);
  }
}

module.exports = Permission;
