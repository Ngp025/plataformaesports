(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nmodule.exports = _defineProperty;\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/defineProperty.js?");

/***/ }),

/***/ "./node_modules/moment/locale sync recursive (en|es)$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync (en|es)$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./es\": \"./node_modules/moment/locale/es.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./node_modules/moment/locale sync recursive (en|es)$\";\n\n//# sourceURL=webpack:///./node_modules/moment/locale_sync_(en%7Ces)$?");

/***/ }),

/***/ "./src/versus/components/user/login/loginFunctions.js":
/*!************************************************************!*\
  !*** ./src/versus/components/user/login/loginFunctions.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ \"./node_modules/moment-timezone/index.js\");\n/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n //Login Functions\n\nfunction teamRegisterData() {\n  var playerTeamData = location.href.split('/')[5].split('-');\n  return playerTeamData;\n}\n\nfunction logOut() {\n  localStorage.clear();\n  sessionStorage.clear();\n  location.reload();\n}\n\nfunction onChange(e) {\n  var _e$target = e.target,\n      name = _e$target.name,\n      value = _e$target.value;\n  this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, name, value));\n}\n\nfunction recoveryPassword(_x, _x2, _x3, _x4) {\n  return _recoveryPassword.apply(this, arguments);\n}\n\nfunction _recoveryPassword() {\n  _recoveryPassword = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(email, pass, confirm, loginState) {\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            event.preventDefault();\n\n            if (!(pass === confirm)) {\n              _context.next = 6;\n              break;\n            }\n\n            _context.next = 4;\n            return fetch(\"users/newPassword/\".concat(email), {\n              method: 'POST',\n              body: JSON.stringify({\n                tempPassword: pass\n              }),\n              headers: {\n                Accept: 'application/json',\n                'Content-Type': 'application/json'\n              }\n            }).then(function (res) {\n              return res.json();\n            }).then(function (jsonMess) {\n              if (!jsonMess.alert) {\n                loginState('validation');\n              } else {\n                alert(jsonMess.alert);\n              }\n            });\n\n          case 4:\n            _context.next = 7;\n            break;\n\n          case 6:\n            alert('Disculpe la contraseña no es exactamente igual por favor indique correctamente');\n\n          case 7:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n  return _recoveryPassword.apply(this, arguments);\n}\n\nfunction loginBeta(loginState, localLogin, mainColor) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"login-box\",\n    className: \"login-box  opacity animatedO\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"login-tittle\",\n    className: \"login-tittle\"\n  }, \"Bienvenido\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"form\", {\n    id: \"form-loginlocal\",\n    className: \"form-loginlocal\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-loginlocal-email\",\n    className: \"label-loginlocal-email\",\n    htmlFor: \"email-local-input\"\n  }, \"Correo Electr\\xF3nico\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"email-local-input\",\n    className: \"email-local-input\",\n    type: \"email\",\n    placeholder: \"Ingrese su correo electr\\xF3nico\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('email-local-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('email-local-input').style.borderBottom = '1px solid #ffffff';\n    } //style={{}}\n    //error={errors.email}\n\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-loginlocal-password\",\n    className: \"label-loginlocal-password\",\n    htmlFor: \"password\"\n  }, \"Password\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"password-local-input\",\n    className: \"password-local-input\",\n    type: \"password\",\n    placeholder: \"Ingresa su password\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('password-local-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('password-local-input').style.borderBottom = '1px solid #ffffff';\n    } //error={}//errors.password\n\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"button\", {\n    id: \"submit-loginlocal\",\n    className: \"submit-loginlocal\",\n    type: \"submit\",\n    onClick: function onClick() {\n      return localLogin();\n    },\n    style: {\n      backgroundColor: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, \"Ingresar\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"canvas\", {\n    id: \"login-canvas\",\n    className: \"login-canvas\",\n    style: {\n      backgroundColor: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"button\", {\n    id: \"to-register\",\n    className: \"to-register\",\n    onClick: function onClick() {\n      return loginState('register');\n    },\n    style: {\n      border: \"solid 1px rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, \"\\xBFNo estas registrado a\\xFAn?\", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"span\", {\n    id: \"elevate-span-register\",\n    className: \"elevate-span\",\n    style: {\n      color: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, \"Registrate\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"a\", {\n    id: \"submit-lostPass\",\n    className: \"submit-lostPass\",\n    type: \"submit\",\n    onClick: function onClick() {\n      return loginState('recovery');\n    },\n    style: {\n      color: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, \"\\xBFOlvidaste tu contrase\\xF1a?\")));\n}\n\nfunction registerBeta(localRegister, mainColor, invoke) {\n  var customer = location.href.split(\"/\")[4];\n  console.log(customer);\n  /*\n  if(customer === \"copavenadotuerto\"){\n    function selectInit(elems) {\n      var instances = M.FormSelect.init(elems, 0);\n    }\n    setTimeout(() => {\n      selectInit(document.querySelectorAll('select'));\n    }, 25);\n    } */\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"register-box\",\n    className: \"register-box opacity animatedO\",\n    style: {\n      display: \"\".concat(invoke === 'teamregister' ? 'block' : 'none'),\n      border: \"\".concat(invoke === 'teamregister' ? \"solid 2px rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\") : '')\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"register-tittle\",\n    className: \"register-tittle\"\n  }, invoke === 'teamregister' ? 'Registro y equipo' : 'Registro'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"form\", {\n    id: \"form-register-local\",\n    className: \"form-loginlocal\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-name-register\",\n    className: \"label-name-register\",\n    htmlFor: \"name-register-input\"\n  }, \"Nombre completo\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"name-register-input\",\n    className: \"name-register\",\n    type: \"text\",\n    placeholder: \"Nombre y apellido\",\n    autoComplete: \"off\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('name-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('name-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"club-label\",\n    className: \"club-label\",\n    style: {\n      display: customer === \"copavenadotuerto\" ? \"block\" : \"none\"\n    }\n  }, \"Club\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"select\", {\n    id: \"club-select\",\n    className: \"club-select\",\n    style: {\n      display: customer === \"copavenadotuerto\" ? \"block\" : \"none\",\n      color: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    disabled: true,\n    selected: true\n  }, \"Selecciona tu club\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Sportivo B Rivadavia\"\n  }, \" Sportivo B Rivadavia \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Defensores Talleres\"\n  }, \" Defensores Talleres \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Ciudad Nueva F.B.C.\"\n  }, \" Ciudad Nueva F.B.C. \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Centenario F.B.C.\"\n  }, \" Centenario F.B.C. \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Sacachispas F.B.C.\"\n  }, \" Sacachispas F.B.C. \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Atl. Jorge Newbwry\"\n  }, \" Atl. Jorge Newbwry \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Central Argentino F.B.C.\"\n  }, \" Central Argentino F.B.C. \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Juventud Pueyredon\"\n  }, \" Juventud Pueyredon \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Ciudad\"\n  }, \"Club Ciudad\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"option\", {\n    value: \"Sportivo Avellaneda\"\n  }, \" Sportivo Avellaneda \")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-nickname-register\",\n    className: \"nickname-register-label\",\n    style: {\n      display: invoke === 'teamregister' ? 'block' : 'none'\n    },\n    htmlFor: \"nickname-input\"\n  }, \"Nickname\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"nickname-input\",\n    className: \"nickname-register-input\",\n    type: \"text\",\n    autoComplete: \"off\" //defaultValue = {`${invoke === \"teamregister\" ? \"Ingrese su Nick\" : \"\"}`}\n    ,\n    style: {\n      display: invoke === 'teamregister' ? 'block' : 'none'\n    },\n    placeholder: \"Ingrese su nick\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('nickname-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('nickname-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-email-register\",\n    className: \"label-email-register\",\n    style: {\n      display: invoke === 'teamregister' ? 'none' : 'block'\n    },\n    htmlFor: \"email-register-input\"\n  }, \"Correo electr\\xF3nico\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"email-register-input\",\n    className: \"email-register\",\n    type: \"text\",\n    placeholder: \"\".concat(invoke === 'teamregister' ? teamRegisterData()[2] : 'Correo Electronico'),\n    autoComplete: \"off\",\n    defaultValue: \"\".concat(invoke === 'teamregister' ? teamRegisterData()[2] : ''),\n    style: {\n      display: invoke === 'teamregister' ? 'none' : 'block'\n    },\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('email-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('email-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-email-register\",\n    className: \"label-email-register\",\n    style: {\n      display: invoke === 'teamregister' ? 'none' : 'block'\n    },\n    htmlFor: \"email-register-input-confirm\"\n  }, \"Confirma tu correo electr\\xF3nico\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"email-register-input-confirm\",\n    className: \"email-register\",\n    type: \"text\",\n    placeholder: \"\".concat(invoke === 'teamregister' ? teamRegisterData()[2] : 'Confirma tu email'),\n    autoComplete: \"off\",\n    defaultValue: \"\".concat(invoke === 'teamregister' ? teamRegisterData()[2] : ''),\n    onChange: function onChange() {\n      var mail = document.getElementById('email-register-input');\n      var cMail = document.getElementById('email-register-input-confirm');\n\n      function validMail() {\n        cMail.style.outline = \"1px solid green\";\n        cMail.style.border = \"none\";\n        mail.style.outline = \"1px solid green\";\n        mail.style.border = \"none\";\n      }\n\n      function invalidMail() {\n        cMail.style.outline = \"1px solid red\";\n        cMail.style.border = \"none\";\n        mail.style.outline = \"1px solid red\";\n        mail.style.border = \"none\";\n      }\n\n      mail.value.trim().toLowerCase() === cMail.value.trim().toLowerCase() ? validMail() : invalidMail();\n      mail.value.trim().toLowerCase() === cMail.value.trim().toLowerCase() ? validMail() : invalidMail();\n    },\n    style: {\n      display: invoke === 'teamregister' ? 'none' : 'block'\n    },\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('email-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('email-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-date-register\",\n    className: \"label-date-register\",\n    htmlFor: \"email-register-input\"\n  }, \"Fecha de nacimiento\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"date-register-input\",\n    className: \"date-register\",\n    type: \"date\",\n    defaultValue: \"01/01/2000\",\n    style: {\n      color: 'rgba(130, 134, 153, 0.35)'\n    },\n    onChange: function onChange() {\n      event.target.style.color = '#ffffff';\n      var userDate = event.target.value.split('-');\n      var isUnder16 = moment_timezone__WEBPACK_IMPORTED_MODULE_4___default()().subtract(16, 'years').format('YYYY-MM-DD').split('-');\n\n      if (userDate[0] >= 1920) {\n        var tutorData = document.getElementById('tutor-data');\n        setTimeout(function () {\n          if (isUnder16[0] > userDate[0]) {\n            tutorData.style.display = 'none';\n          }\n\n          if (isUnder16[0] === userDate[0]) {\n            if (isUnder16[1] > userDate[1]) {\n              tutorData.style.display = 'none';\n            }\n\n            if (isUnder16[1] === userDate[1]) {\n              if (isUnder16[2] > userDate[2]) {\n                tutorData.style.display = 'none';\n                alert('aqui');\n              }\n\n              if (isUnder16[2] === userDate[2]) {\n                tutorData.style.display = 'none';\n              }\n\n              if (isUnder16[2] < userDate[2]) {\n                tutorData.style.display = 'block';\n              }\n            }\n\n            if (isUnder16[1] < userDate[1]) {\n              tutorData.style.display = 'block';\n            }\n          }\n\n          if (isUnder16[0] < userDate[0]) {\n            tutorData.style.display = 'block';\n          }\n        }, 1000);\n      }\n    },\n    max: '2005-01-01',\n    min: '1920-01-01',\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('date-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('date-register-input').style.borderBottom = '1px solid #ffffff';\n    },\n    placeholder: \"Fecha de nacimiento\",\n    autoComplete: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"tutor-data\",\n    className: \"tutor-data animatedO opacity\",\n    style: {\n      display: 'none'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-tutor-name-register\",\n    className: \"label-name-register\",\n    htmlFor: \"name-register-input\"\n  }, \"Nombre completo de el padre, la madre o tutor\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"name-tutor-register-input\",\n    className: \"name-register\",\n    type: \"text\",\n    placeholder: \"Nombre y apellido (padre madre o tutor)\",\n    autoComplete: \"off\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('name-tutor-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('name-tutor-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-tutor-date-register\",\n    className: \"label-date-register\",\n    htmlFor: \"document-tutor-input\"\n  }, \"N\\xFAmero de documento de el padre la madre o tutor\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"document-tutor-input\",\n    className: \"document-input\",\n    type: \"number\",\n    placeholder: \"Documento (padre madre o tutor)\",\n    autoComplete: \"off\",\n    min: \"1200000\",\n    max: \"20000000\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('document-tutor-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('document-tutor-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"tutor-auth\",\n    className: \"tutor-auth\"\n  }, \"Una vez enviado el formulario el representante acepta la participacion del menor a su cargo en nuestros torneos. Bienvenidos.\", ' ')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-date-register\",\n    className: \"label-date-register\",\n    htmlFor: \"document-input\"\n  }, \"N\\xFAmero de documento\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"document-input\",\n    className: \"document-input\",\n    type: \"number\",\n    placeholder: \"Documento del jugador\",\n    autoComplete: \"off\",\n    min: \"1200000\",\n    max: \"20000000\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('document-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('document-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-city-register\",\n    className: \"label-city-register\",\n    htmlFor: \"city-input\"\n  }, \"Municipio / Comuna\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"city-register-input\",\n    className: \"city-register\",\n    type: \"text\",\n    placeholder: \"Ingrese su ciudad\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('city-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('city-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-password-register\",\n    className: \"label-password-register\",\n    htmlFor: \"password-register-input\"\n  }, \"Contrase\\xF1a\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"password-register-input\",\n    className: \"password-register\",\n    type: \"password\",\n    placeholder: \"Ingrese su contrase\\xF1a\",\n    autoComplete: \"off\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('password-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('password-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-passwordconfirm-register\",\n    className: \"label-passwordconfirm-register\",\n    htmlFor: \"passwordconfirm-register-input\"\n  }, \"Confirmar contrase\\xF1a\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"passwordconfirm-register-input\",\n    className: \"passwordconfirm-register\",\n    type: \"password\",\n    placeholder: \"Confime su contrase\\xF1a\",\n    autoComplete: \"off\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('passwordconfirm-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('passwordconfirm-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-policy-register\",\n    className: \"label-policy-register\"\n  }, \"Al registrarse usted acepta nuestros\", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"a\", {\n    onClick: function onClick() {\n      return window.open('https://www.plataformaesports.com/#/terms-and-politics', 'Diseño Web', 'width=300, height=200');\n    }\n  }, \"terminos y politicas de uso\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"button\", {\n    id: \"register-submit\",\n    className: \"register-submit\",\n    type: \"submit\",\n    onClick: function onClick() {\n      return localRegister();\n    },\n    style: {\n      backgroundColor: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\"),\n      border: \"2px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, \"Registrarse\")));\n}\n\nfunction recovery(loginState, mainColor) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"recovery-box\",\n    className: \"recovery-box opacity animatedO\",\n    style: {\n      display: 'none'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"recovery-tittle\",\n    className: \"recovery-tittle\"\n  }, \"Recuperar contrase\\xF1a\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"recovery-condition\",\n    className: \"recovery-condition\"\n  }, \"Al realizar el cambio de contrase\\xF1a debe recordar que no podra cambiarla nuevamente por las siguientes 72 horas luego de culminar el proceso.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"form\", {\n    id: \"form-recovery\",\n    className: \"form-recovery\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-recovery-email\",\n    className: \"label-recovery-email\",\n    htmlFor: \"email-recovery-input\"\n  }, \"Correo Electr\\xF3nico\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"email-recovery-input\",\n    className: \"email-recovery-input\",\n    type: \"email\",\n    placeholder: \"Ingrese su correo electr\\xF3nico\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('email-local-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('email-recovery-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-recovery-password\",\n    className: \"label-recovery-password\",\n    htmlFor: \"password-recovery-input\"\n  }, \"Nueva contrase\\xF1a\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"password-recovery-input\",\n    className: \"password-recovery-input\",\n    type: \"password\",\n    placeholder: \"Ingresa su password\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('password-local-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('password-recovery-input').style.borderBottom = '1px solid #ffffff';\n    } //error={}//errors.password\n\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-recovery-password-2-confirm\",\n    className: \"label-recovery-password-2-confirm\",\n    htmlFor: \"password-recovery-input-2-confirm\"\n  }, \"Confirma la nueva contrase\\xF1a\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"password-recovery-input-2-confirm\",\n    className: \"password-recovery-input-2-confirm\",\n    type: \"password\",\n    placeholder: \"Ingresa su password\",\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('password-local-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('password-recovery-input-2-confirm').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"button\", {\n    id: \"submit-recovery\",\n    className: \"submit-recovery\",\n    type: \"submit\",\n    onClick: function onClick() {\n      return recoveryPassword(document.getElementById('email-recovery-input').value, document.getElementById('password-recovery-input').value, document.getElementById('password-recovery-input-2-confirm').value, loginState);\n    }\n    /*fetch*/\n    ,\n    style: {\n      backgroundColor: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, \"VALIDAR\")));\n}\n\nfunction loginButtonDisplay(navigation, mainColor) {\n  function loginButton() {\n    if (localStorage.userData) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"button\", {\n        id: \"profile-button\",\n        className: \"modal-trigger tooltipped  login-button highGradeButton\",\n        \"data-tooltip\": \"Mira tu perfil\",\n        style: {\n          boxShadow: \"0 0 50px 0 rgba(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \", 0.25)\"),\n          border: \" solid 2px rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n        },\n        onMouseOver: function onMouseOver() {\n          event.target.style.backgroundColor = \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue);\n        },\n        onMouseLeave: function onMouseLeave() {\n          event.target.style.backgroundColor = \"rgba(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \", 0\");\n        },\n        onClick: function onClick() {\n          return location.href = '/#/perfil';\n        }\n      }, \"Perfil\");\n    } else {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"button\", {\n        id: \"plataformaesports-singIn-button\",\n        \"data-target\": \"modal1\",\n        className: \"modal-trigger tooltipped login-button lowGradeButton\",\n        \"data-tooltip\": \"Iniciar sesi\\xF3n\"\n      }, \"Ingresa\");\n    }\n  }\n\n  if (navigation === 'Cargando') {\n    /*#__PURE__*/\n    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"p\", {\n      title: \"...\"\n    }, \"...\");\n  } else {\n    return loginButton();\n  }\n}\n\nfunction cleanAndSafe() {\n  var email = JSON.parse(localStorage.userData).email;\n\n  var IDP = JSON.parse(localStorage.userData)._id;\n\n  fetch(\"users/cleanInfo/\".concat(IDP, \"/\").concat(email)).then(function (res) {\n    return res.json();\n  }).then(function (data) {\n    return d;\n  });\n  localStorage.clear();\n  location.reload();\n}\n\nfunction validationModal(localValidation, mainColor) {\n  if (localStorage.userData) {\n    var userData = JSON.parse(localStorage.userData);\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"validation-box\",\n    className: \"validation-box  opacity animatedO\",\n    style: {\n      display: 'none'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"validation-tittle\",\n    className: \"validation-tittle\"\n  }, \"\\xA1S\\xF3lo un paso m\\xE1s!\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"form\", {\n    id: \"form-validation\",\n    className: \"form-validation\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-email-token\",\n    className: \"label-email-token\"\n  }, \"Un c\\xF3digo de validaci\\xF3n fu\\xE9 enviado a su email\", ' ', localStorage.userData ? userData.email : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"label-validation-token\",\n    className: \"label-validation-token\",\n    htmlFor: \"validation-token-input\"\n  }, \"C\\xF3digo de validaci\\xF3n\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"input\", {\n    id: \"validation-token-input\",\n    className: \"validation-token-input\",\n    type: \"text\",\n    placeholder: \"Coloque aqui su codigo de validaci\\xF3n\",\n    style: {\n      border: \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    },\n    onMouseEnter: function onMouseEnter() {\n      document.getElementById('passwordconfirm-register-input').style.borderBottom = \"1px solid rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\");\n    },\n    onMouseLeave: function onMouseLeave() {\n      document.getElementById('passwordconfirm-register-input').style.borderBottom = '1px solid #ffffff';\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"button\", {\n    id: \"validate-submit\",\n    className: \"validate-submit\",\n    onClick: function onClick() {\n      return localValidation();\n    },\n    style: {\n      backgroundColor: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    }\n  }, \"Validar\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    style: {\n      color: \"rgb(\".concat(mainColor.red, \", \").concat(mainColor.green, \", \").concat(mainColor.blue, \")\")\n    },\n    id: \"clearRegister\",\n    className: \"clearRegister\",\n    onClick: function onClick() {\n      return cleanAndSafe();\n    }\n  }, \"Comenzar de nuevo.\")));\n}\n\nfunction updating() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"updating-box\",\n    className: \"updating-box  opacity animatedO\",\n    style: {\n      display: 'none'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"img\", {\n    id: \"loading-img-updating-box\",\n    className: \"loading-img\",\n    src: \"https://res.cloudinary.com/versus/image/upload/v1585185745/Statics_images/xxpauscz8misoyrhkjis.gif\"\n  }));\n}\n\nfunction congrats() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"div\", {\n    id: \"congrats-box\",\n    className: \"congrats-box  opacity animatedO\",\n    style: {\n      display: 'none'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"img\", {\n    id: \"congrats-img\",\n    className: \"congrats-img\",\n    src: \"../../../media/assets/elipse-1.svg\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(\"label\", {\n    id: \"congrats-tittle\",\n    className: \"congrats-tittle\"\n  }, \"\\xA1Registro Exitoso!\"));\n}\n\nvar login = {\n  loginButtonDisplay: loginButtonDisplay,\n  registerBeta: registerBeta,\n  loginBeta: loginBeta,\n  logOut: logOut,\n  validationModal: validationModal,\n  updating: updating,\n  congrats: congrats,\n  teamRegisterData: teamRegisterData,\n  recovery: recovery\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (login);\n\n//# sourceURL=webpack:///./src/versus/components/user/login/loginFunctions.js?");

/***/ })

}]);