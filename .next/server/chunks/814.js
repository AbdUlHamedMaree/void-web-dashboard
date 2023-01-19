"use strict";
exports.id = 814;
exports.ids = [814];
exports.modules = {

/***/ 8080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GJ": () => (/* binding */ AppRoleEnum),
/* harmony export */   "Q$": () => (/* binding */ AppRoleToReadable),
/* harmony export */   "uv": () => (/* binding */ mockUser)
/* harmony export */ });
/* harmony import */ var _scandinavia_mock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1643);
/* harmony import */ var _scandinavia_mock__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scandinavia_mock__WEBPACK_IMPORTED_MODULE_0__);

var AppRoleEnum;
(function(AppRoleEnum) {
    AppRoleEnum["ADMIN"] = "ADMIN";
    AppRoleEnum["MANAGER"] = "MANAGER";
    AppRoleEnum["DRIVER"] = "DRIVER";
})(AppRoleEnum || (AppRoleEnum = {}));
const AppRoleToReadable = {
    ADMIN: "Admin",
    DRIVER: "Driver",
    MANAGER: "Manager"
};
const mockUser = (user)=>({
        id: _scandinavia_mock__WEBPACK_IMPORTED_MODULE_0__.unique(3),
        name: _scandinavia_mock__WEBPACK_IMPORTED_MODULE_0__.fullname(),
        email: `${_scandinavia_mock__WEBPACK_IMPORTED_MODULE_0__.username()}@gmail.com`,
        role: _scandinavia_mock__WEBPACK_IMPORTED_MODULE_0__.pick(...Object.values(AppRoleEnum)),
        phoneNumber: _scandinavia_mock__WEBPACK_IMPORTED_MODULE_0__.phone() + "",
        ...user
    });


/***/ }),

/***/ 1814:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* reexport */ DashboardUsersNewEditForm)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mrii/react-form-builder"
var react_form_builder_ = __webpack_require__(9072);
// EXTERNAL MODULE: ./src/logic/models/user.ts
var user = __webpack_require__(8080);
// EXTERNAL MODULE: external "yup"
var external_yup_ = __webpack_require__(5609);
;// CONCATENATED MODULE: ./src/ui/components/sections/dashboard/users/new&edit/form.tsx







const schema = (0,external_yup_.object)({
    name: (0,external_yup_.string)().trim().required(),
    email: (0,external_yup_.string)().trim().email().required(),
    role: (0,external_yup_.string)().trim().required().oneOf(Object.values(user/* AppRoleEnum */.GJ)),
    phoneNumber: (0,external_yup_.string)().trim().required()
});
const baseDefaultValues = {
    name: "",
    email: "",
    role: "",
    phoneNumber: ""
};
const DashboardUsersNewEditForm = ({ mode ="new" , onSubmit , defaultValues: propsDefaultValues  })=>{
    const isNew = (0,external_react_.useMemo)(()=>mode === "new", [
        mode
    ]);
    const defaultValues = (0,external_react_.useMemo)(()=>({
            ...baseDefaultValues,
            ...propsDefaultValues
        }), [
        propsDefaultValues
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Container, {
        maxWidth: "lg",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                variant: "h4",
                children: isNew ? "New User" : `Edit User "${defaultValues?.name}"`
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(material_.Card, {
                sx: {
                    mt: 3,
                    p: 2
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_form_builder_.FormBuilder, {
                    validation: schema,
                    onSubmit: onSubmit,
                    defaultValues: defaultValues,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Grid, {
                            container: true,
                            rowSpacing: 3,
                            columnSpacing: 2,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(material_.Grid, {
                                    md: 6,
                                    xs: 12,
                                    item: true,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_form_builder_.TextInput, {
                                        name: "name",
                                        fullWidth: true
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(material_.Grid, {
                                    md: 6,
                                    xs: 12,
                                    item: true,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_form_builder_.TextInput, {
                                        name: "email",
                                        fullWidth: true
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(material_.Grid, {
                                    md: 6,
                                    xs: 12,
                                    item: true,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_form_builder_.SelectInput, {
                                        name: "role",
                                        items: user/* AppRoleToReadable */.Q$,
                                        fullWidth: true
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(material_.Grid, {
                                    md: 6,
                                    xs: 12,
                                    item: true,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_form_builder_.TextInput, {
                                        name: "phoneNumber",
                                        fullWidth: true
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(material_.Box, {
                            sx: {
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 3
                            },
                            children: /*#__PURE__*/ jsx_runtime_.jsx(react_form_builder_.FormSubmitInput, {
                                size: "large",
                                variant: "contained",
                                children: isNew ? "Create User" : "Save Changes"
                            })
                        })
                    ]
                })
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/ui/components/sections/dashboard/users/new&edit/index.ts



/***/ })

};
;