(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/db/index.js":
/*!*************************!*\
  !*** ./src/db/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Database; });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\nclass Database {\n  async connect() {\n    if (!this._connection) {\n      let params = {};\n\n      if (true) {\n        params = {\n          endpoint: process.env.DB_URL,\n          region: process.env.DB_REGION,\n          accessKeyId: process.env.AWS_KEY,\n          secretAccessKey: process.env.AWS_SECRET\n        };\n      } else {}\n\n      this._connection = new aws_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.DynamoDB(params);\n    }\n\n    return this._connection;\n  }\n\n  async putItem(params) {\n    return new Promise((resolve, reject) => {\n      this._connection.putItem(params, (err, data) => {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(data);\n        }\n      });\n    });\n  }\n\n  async getItem(params) {\n    return new Promise((resolve, reject) => {\n      this._connection.getItem(params, (err, data) => {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(data);\n        }\n      });\n    });\n  }\n\n  async updateItem(params) {\n    return new Promise((resolve, reject) => {\n      this._connection.updateItem(params, (err, data) => {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(data);\n        }\n      });\n    });\n  }\n\n  async scan(params = {}) {\n    return new Promise((resolve, reject) => {\n      this._connection.scan(params, (err, data) => {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(data);\n        }\n      });\n    });\n  }\n\n  async deleteItem(params) {\n    return new Promise((resolve, reject) => {\n      this._connection.deleteItem(params, (err, data) => {\n        if (err) {\n          reject(err);\n        } else {\n          resolve(data);\n        }\n      });\n    });\n  }\n\n  async createTables(tables) {\n    for (let k = 0; k < tables.length; k++) {\n      const table = tables[k];\n      await new Promise((resolve, reject) => {\n        this._connection.createTable(table, err => {\n          if (err) {\n            if (err.code !== 'ResourceInUseException') {\n              console.dir(err);\n              reject(err);\n            } else {\n              console.dir(`Table \"${table.TableName}\" exists`);\n              resolve();\n            }\n          } else {\n            console.dir(`Created table \"${table.TableName}\"`);\n            resolve();\n          }\n        });\n      });\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./src/db/index.js?");

/***/ }),

/***/ "./src/graphql/dataSources/project.js":
/*!********************************************!*\
  !*** ./src/graphql/dataSources/project.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return projectSource; });\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../db */ \"./src/db/index.js\");\n/* harmony import */ var crypto_random_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto-random-string */ \"crypto-random-string\");\n/* harmony import */ var crypto_random_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_random_string__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass projectSource {\n  // our methods go here, we are going to discuss them below\n  async getDatabase() {\n    if (!this._db) {\n      this._db = new _db__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      await this._db.connect();\n    }\n\n    return this._db;\n  }\n\n  async get(title) {\n    const db = await this.getDatabase();\n    return db.getItem({\n      TableName: 'datascrapeds',\n      Key: {\n        title: {\n          S: title.toString()\n        }\n      }\n    });\n  }\n\n  async delete(title) {\n    const db = await this.getDatabase();\n    await db.deleteItem({\n      TableName: 'datascrapeds',\n      Key: {\n        title: {\n          S: title.toString()\n        }\n      }\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/graphql/dataSources/project.js?");

/***/ }),

/***/ "./src/graphql/resolvers/index.js":
/*!****************************************!*\
  !*** ./src/graphql/resolvers/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! merge-graphql-schemas */ \"merge-graphql-schemas\");\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ \"./src/graphql/resolvers/project.js\");\n\n\nconst resolvers = [_project__WEBPACK_IMPORTED_MODULE_1__[\"default\"]];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__[\"mergeResolvers\"])(resolvers));\n\n//# sourceURL=webpack:///./src/graphql/resolvers/index.js?");

/***/ }),

/***/ "./src/graphql/resolvers/project.js":
/*!******************************************!*\
  !*** ./src/graphql/resolvers/project.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Mutation: {\n    putProject: async (source, args, {\n      dataSources\n    }, state) => {\n      const {\n        data\n      } = args;\n      let result = {};\n\n      try {\n        await dataSources.projectSource.put(data);\n      } catch (e) {\n        console.error(e);\n        result.error = 'Internal error';\n      }\n\n      return result;\n    },\n    deleteProject: async (source, args, {\n      dataSources\n    }, state) => {\n      const {\n        title\n      } = args;\n      let result = {};\n\n      try {\n        await dataSources.projectSource.delete(title);\n      } catch (e) {\n        console.error(e);\n        result.error = 'Internal error';\n      }\n\n      return result;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/graphql/resolvers/project.js?");

/***/ }),

/***/ "./src/graphql/types/index.js":
/*!************************************!*\
  !*** ./src/graphql/types/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! merge-graphql-schemas */ \"merge-graphql-schemas\");\n/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util_graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.graphql */ \"./src/graphql/types/util.graphql\");\n/* harmony import */ var _util_graphql__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util_graphql__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _project_graphql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.graphql */ \"./src/graphql/types/project.graphql\");\n/* harmony import */ var _project_graphql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_project_graphql__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_0__[\"mergeTypes\"])([_util_graphql__WEBPACK_IMPORTED_MODULE_1___default.a, _project_graphql__WEBPACK_IMPORTED_MODULE_2___default.a], {\n  all: true\n}));\n\n//# sourceURL=webpack:///./src/graphql/types/index.js?");

/***/ }),

/***/ "./src/graphql/types/project.graphql":
/*!*******************************************!*\
  !*** ./src/graphql/types/project.graphql ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Project\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"rank\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"url\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"points\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"username\"},\"arguments\":[],\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"comments\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]}]},{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Mutation\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"putProject\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ProjectInput\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Result\"}},\"directives\":[]},{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"deleteProject\"},\"arguments\":[{\"kind\":\"InputValueDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}}},\"directives\":[]}],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Result\"}},\"directives\":[]}]}],\"loc\":{\"start\":0,\"end\":227}};\n    doc.loc.source = {\"body\":\"type Project {\\n    title: String!\\n    rank: Int\\n    url: String!\\n    points: Int\\n    username: String!\\n    comments: Int\\n}\\n\\ntype Mutation {\\n    putProject(data: ProjectInput!): Result\\n    deleteProject(title: String!): Result\\n}\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n\n\n//# sourceURL=webpack:///./src/graphql/types/project.graphql?");

/***/ }),

/***/ "./src/graphql/types/util.graphql":
/*!****************************************!*\
  !*** ./src/graphql/types/util.graphql ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n    var doc = {\"kind\":\"Document\",\"definitions\":[{\"kind\":\"ObjectTypeDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"Result\"},\"interfaces\":[],\"directives\":[],\"fields\":[{\"kind\":\"FieldDefinition\",\"name\":{\"kind\":\"Name\",\"value\":\"error\"},\"arguments\":[],\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"String\"}},\"directives\":[]}]}],\"loc\":{\"start\":0,\"end\":33}};\n    doc.loc.source = {\"body\":\"type Result {\\n    error: String\\n}\",\"name\":\"GraphQL request\",\"locationOffset\":{\"line\":1,\"column\":1}};\n  \n\n    var names = {};\n    function unique(defs) {\n      return defs.filter(\n        function(def) {\n          if (def.kind !== 'FragmentDefinition') return true;\n          var name = def.name.value\n          if (names[name]) {\n            return false;\n          } else {\n            names[name] = true;\n            return true;\n          }\n        }\n      )\n    }\n  \n\n      module.exports = doc;\n    \n\n\n//# sourceURL=webpack:///./src/graphql/types/util.graphql?");

/***/ }),

/***/ "./src/handler.js":
/*!************************!*\
  !*** ./src/handler.js ***!
  \************************/
/*! exports provided: main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"main\", function() { return _index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n\n\n//# sourceURL=webpack:///./src/handler.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql/resolvers */ \"./src/graphql/resolvers/index.js\");\n/* harmony import */ var _graphql_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphql/types */ \"./src/graphql/types/index.js\");\n/* harmony import */ var _graphql_dataSources_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphql/dataSources/project */ \"./src/graphql/dataSources/project.js\");\n\n\n\n // creating the server\n\nconst server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"ApolloServer\"]({\n  // passing types and resolvers to the server\n  typeDefs: _graphql_types__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  resolvers: _graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  // initial context state, will be available in resolvers\n  context: () => ({}),\n  // an object that goes to the \"context\" argument\n  // when executing resolvers\n  dataSources: () => {\n    return {\n      projectSource: new _graphql_dataSources_project__WEBPACK_IMPORTED_MODULE_3__[\"default\"]()\n    };\n  }\n});\n\nconst handler = (event, context, callback) => {\n  const handler = server.createHandler(); // tell AWS lambda we do not want to wait for NodeJS event loop\n  // to be empty in order to send the response\n\n  context.callbackWaitsForEmptyEventLoop = false; // process the request\n\n  return handler(event, context, callback);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-lambda\");\n\n//# sourceURL=webpack:///external_%22apollo-server-lambda%22?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "crypto-random-string":
/*!***************************************!*\
  !*** external "crypto-random-string" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto-random-string\");\n\n//# sourceURL=webpack:///external_%22crypto-random-string%22?");

/***/ }),

/***/ "merge-graphql-schemas":
/*!****************************************!*\
  !*** external "merge-graphql-schemas" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"merge-graphql-schemas\");\n\n//# sourceURL=webpack:///external_%22merge-graphql-schemas%22?");

/***/ })

/******/ })));