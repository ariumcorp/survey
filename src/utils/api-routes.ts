export const ApiRoutes = {
  Security: {
    AuthenticateUser: "auth",
    getTranslation: "internationalization/configuration/filtered",
    getUserInfo: "userInfo",
    getUserRole: "userRole",
    getUserPermission: "UserPermission",
    getUrlEndppiont: "urlEndpoint",
    GetAccess: "/resource/filtered",
  },
  AdminCenter: {
    GetRole: "role/filtered",
    Role: "role",
    getUserByRole: "permission/role/user/assignment/filter",
    manageUserByRole: "permission/role/user/assignment/process",
    AuthenticateUser: "auth",
    GetUser: "user/filtered",
    GetUserGeneric: "user/filtered/generic",
    GetRoleGeneric: "role/filtered/generic",
    GetApplicationGeneric: "application/filtered/generic",
    GetPermissionBySubjectFilter:
      "permission/subject/permission/assignment/filter",
    PermissionBySubjectAsignment:
      "permission/subject/permission/assignment/process",
  },
};
