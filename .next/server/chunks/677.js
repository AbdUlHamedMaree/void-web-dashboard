"use strict";
exports.id = 677;
exports.ids = [677];
exports.modules = {

/***/ 6181:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "C": () => (/* reexport */ DashboardVehiclesNewEditForm)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mrii/react-form-builder"
var react_form_builder_ = __webpack_require__(9072);
// EXTERNAL MODULE: external "yup"
var external_yup_ = __webpack_require__(5609);
;// CONCATENATED MODULE: ./src/ui/components/sections/dashboard/vehicles/new&edit/form.tsx





const schema = (0,external_yup_.object)({
    name: (0,external_yup_.string)().trim().required(),
    plateNumber: (0,external_yup_.string)().trim().required(),
    model: (0,external_yup_.string)().trim().required()
});
const baseDefaultValues = {
    name: "",
    plateNumber: "",
    model: ""
};
const DashboardVehiclesNewEditForm = ({ mode ="new" , onSubmit , defaultValues: propsDefaultValues  })=>{
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
                children: isNew ? "New Vehicle" : `Edit Vehicle "${defaultValues?.name}"`
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(material_.Paper, {
                elevation: 2,
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
                                        name: "plateNumber",
                                        fullWidth: true
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(material_.Grid, {
                                    md: 6,
                                    xs: 12,
                                    item: true,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_form_builder_.TextInput, {
                                        name: "model",
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
                                children: isNew ? "Create Vehicle" : "Save Changes"
                            })
                        })
                    ]
                })
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/ui/components/sections/dashboard/vehicles/new&edit/index.ts



/***/ })

};
;