"use strict";
exports.id = 949;
exports.ids = [949];
exports.modules = {

/***/ 2385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ useResponsive)
/* harmony export */ });
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9868);
/* harmony import */ var _mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



const useResponsive = (op, key, end)=>{
    const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.useTheme)();
    const query = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>{
        switch(op){
            case "up":
                return theme.breakpoints.up(key);
            case "down":
                return theme.breakpoints.down(key);
            case "between":
                return theme.breakpoints.between(key, end);
            case "only":
                return theme.breakpoints.only(key);
        }
    }, [
        end,
        key,
        op,
        theme.breakpoints
    ]);
    return _mui_material_useMediaQuery__WEBPACK_IMPORTED_MODULE_1___default()(query);
};


/***/ }),

/***/ 1563:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ getPathname)
/* harmony export */ });
/* unused harmony export getNilPathname */
/* harmony import */ var $modules_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6903);

const getPathname = (path)=>(0,$modules_checks__WEBPACK_IMPORTED_MODULE_0__/* .isString */ .HD)(path) ? path : path.pathname;
const getNilPathname = (path)=>isString(path) ? path : path?.pathname;


/***/ }),

/***/ 6903:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HD": () => (/* binding */ isString),
/* harmony export */   "tq": () => (/* binding */ isMobile)
/* harmony export */ });
/* unused harmony exports isUndefined, isNull, isNil, isDefined, hasLength, isStringFull, isArray, isArrayFull, isArrayStrings, isObject, isObjectFull, isNumber, isBoolean, isNumeric, isDateString, isDate, isValue, hasValue, isFunction */
const isUndefined = (val)=>typeof val === "undefined";
const isNull = (val)=>val === null;
const isNil = (val)=>val == null;
const isDefined = (arg)=>!isNil(arg);
const hasLength = (val)=>val.length > 0;
const isString = (val)=>typeof val === "string";
const isStringFull = (val)=>isString(val) && hasLength(val);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isArray = (val)=>Array.isArray(val);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const isArrayFull = (val)=>Array.isArray(val) && hasLength(val);
const isArrayStrings = (val)=>isArrayFull(val) && val.every((v)=>isStringFull(v));
const isObject = (val)=>typeof val === "object" && !isNull(val);
const isObjectFull = (val)=>isObject(val) && hasLength(Object.keys(val));
const isNumber = (val)=>typeof val === "number" && !Number.isNaN(val) && Number.isFinite(val);
const isBoolean = (val)=>typeof val === "boolean";
const isNumeric = (val)=>/^[+-]?([0-9]*[.])?[0-9]+$/.test(val);
const isDateString = (val)=>isStringFull(val) && /^\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(val);
const isDate = (val)=>val instanceof Date;
const isValue = (val)=>isStringFull(val) || isNumber(val) || isBoolean(val) || isDate(val);
const hasValue = (val)=>isArrayFull(val) ? val.every((o)=>isValue(o)) : isValue(val);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (val)=>typeof val === "function";
const isMobile = ()=>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(typeof navigator === "undefined" ? "SSR" : navigator.userAgent);


/***/ }),

/***/ 371:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ routes)
/* harmony export */ });
const api = (path = [])=>new Proxy((args)=>({
            pathname: "/" + path.join("/"),
            ...args
        }), {
        get: (_, key)=>key === "index" ? api(path) : api([
                ...path,
                key
            ])
    });
const routes = api();


/***/ }),

/***/ 1949:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ DashboardLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6860);
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8095);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_sidebar__WEBPACK_IMPORTED_MODULE_4__]);
_sidebar__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// material

//


// ----------------------------------------------------------------------
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const RootStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden"
});
const MainStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div")(({ theme  })=>({
        flexGrow: 1,
        overflow: "auto",
        minHeight: "100%",
        paddingTop: APP_BAR_MOBILE + 24,
        // paddingBottom: theme.spacing(10),
        [theme.breakpoints.up("lg")]: {
            paddingTop: APP_BAR_DESKTOP + 24,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    }));
const DashboardLayout = ({ children  })=>{
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(RootStyle, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_navbar__WEBPACK_IMPORTED_MODULE_3__/* .DashboardLayoutNavbar */ .A, {
                onOpenSidebar: ()=>setOpen(true)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_sidebar__WEBPACK_IMPORTED_MODULE_4__/* .DashboardLayoutSidebar */ ._, {
                isOpenSidebar: open,
                onCloseSidebar: ()=>setOpen(false)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MainStyle, {
                children: children
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3682:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ navConfig)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7915);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material__WEBPACK_IMPORTED_MODULE_1__);


const navConfig = [
    {
        title: "dashboard",
        path: "/dashboard",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_1__.Speed, {})
    },
    {
        title: "Live Preview",
        path: "/dashboard/live",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_1__.LiveTv, {})
    },
    {
        title: "Users",
        path: "/dashboard/users",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_1__.PeopleAltOutlined, {}),
        children: [
            {
                title: "List",
                path: "/list"
            },
            {
                title: "Add",
                path: "/new"
            }
        ]
    },
    {
        title: "Devices",
        path: "/dashboard/devices",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_1__.MemoryOutlined, {}),
        children: [
            {
                title: "List",
                path: "/list"
            },
            {
                title: "Add",
                path: "/new"
            }
        ]
    },
    {
        title: "Vehicles",
        path: "/dashboard/vehicles",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_icons_material__WEBPACK_IMPORTED_MODULE_1__.DirectionsCarOutlined, {}),
        children: [
            {
                title: "List",
                path: "/list"
            },
            {
                title: "Add",
                path: "/new"
            }
        ]
    }
];


/***/ }),

/***/ 6860:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "A": () => (/* binding */ DashboardLayoutNavbar)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mui/icons-material"
var icons_material_ = __webpack_require__(7915);
;// CONCATENATED MODULE: ./src/ui/components/layouts/dashboard/searchbar.tsx





const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;
const SearchbarStyle = (0,styles_.styled)("div")(({ theme  })=>({
        top: 0,
        left: 0,
        zIndex: 99,
        width: "100%",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        height: APPBAR_MOBILE,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: theme.spacing(0, 3),
        boxShadow: theme.shadows[8],
        backgroundColor: `${(0,styles_.alpha)(theme.palette.background.default, 0.72)}`,
        [theme.breakpoints.up("md")]: {
            height: APPBAR_DESKTOP,
            padding: theme.spacing(0, 5)
        }
    }));
const DashboardLayoutSearchbar = ()=>{
    const [isOpen, setOpen] = (0,external_react_.useState)(false);
    const handleOpen = ()=>{
        setOpen((prev)=>!prev);
    };
    const handleClose = ()=>{
        setOpen(false);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(material_.ClickAwayListener, {
        onClickAway: handleClose,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            children: [
                !isOpen && /*#__PURE__*/ jsx_runtime_.jsx(material_.IconButton, {
                    onClick: handleOpen,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_material_.Search, {})
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(material_.Slide, {
                    direction: "down",
                    in: isOpen,
                    mountOnEnter: true,
                    unmountOnExit: true,
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(SearchbarStyle, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(material_.Input, {
                                autoFocus: true,
                                fullWidth: true,
                                disableUnderline: true,
                                placeholder: "Search…",
                                startAdornment: /*#__PURE__*/ jsx_runtime_.jsx(material_.InputAdornment, {
                                    position: "start",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_material_.Search, {})
                                }),
                                sx: {
                                    mr: 1,
                                    fontWeight: "fontWeightBold"
                                }
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(material_.Button, {
                                variant: "contained",
                                onClick: handleClose,
                                children: "Search"
                            })
                        ]
                    })
                })
            ]
        })
    });
};

;// CONCATENATED MODULE: ./src/ui/components/shared/menu-popover.tsx
// material



const ArrowStyle = (0,styles_.styled)("span")(({ theme  })=>({
        [theme.breakpoints.up("sm")]: {
            top: -7,
            zIndex: 1,
            width: 12,
            right: 20,
            height: 12,
            content: "''",
            position: "absolute",
            borderRadius: "0 0 4px 0",
            transform: "rotate(-135deg)",
            background: theme.palette.background.paper,
            borderRight: `solid 1px ${(0,styles_.alpha)(theme.palette.grey[500], 0.12)}`,
            borderBottom: `solid 1px ${(0,styles_.alpha)(theme.palette.grey[500], 0.12)}`
        }
    }));
const MenuPopover = ({ children , sx , ...other })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Popover, {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        PaperProps: {
            sx: {
                p: 1,
                width: 200,
                overflow: "inherit",
                ...sx
            }
        },
        ...other,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(ArrowStyle, {
                className: "arrow"
            }),
            children
        ]
    });
};

// EXTERNAL MODULE: ./src/ui/components/shared/link.tsx
var shared_link = __webpack_require__(8476);
;// CONCATENATED MODULE: ./src/ui/components/layouts/dashboard/account-popover.tsx






const MENU_OPTIONS = [
    {
        label: "Profile",
        icon: "eva:person-fill",
        linkTo: "#"
    },
    {
        label: "Settings",
        icon: "eva:settings-2-fill",
        linkTo: "#"
    }
];
const DashboardLayoutAccountPopover = ()=>{
    const [open, setOpen] = (0,external_react_.useState)(null);
    const handleOpen = (event)=>{
        setOpen(event.currentTarget);
    };
    const handleClose = ()=>{
        setOpen(null);
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(material_.IconButton, {
                onClick: handleOpen,
                sx: {
                    p: 0,
                    ...open ? {
                        "&:before": {
                            zIndex: 1,
                            content: "''",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            position: "absolute",
                            bgcolor: (theme)=>(0,styles_.alpha)(theme.palette.grey[900], 0.8)
                        }
                    } : {}
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Avatar, {
                    src: "/__mock/john-doe.png",
                    alt: "photoURL"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(MenuPopover, {
                open: Boolean(open),
                anchorEl: open,
                onClose: handleClose,
                sx: {
                    p: 0,
                    mt: 1.5,
                    ml: 0.75,
                    "& .MuiMenuItem-root": {
                        typography: "body2",
                        borderRadius: 0.75
                    }
                },
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_.Box, {
                        sx: {
                            my: 1.5,
                            px: 2.5
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                variant: "subtitle2",
                                noWrap: true,
                                children: "John Doe"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
                                variant: "body2",
                                sx: {
                                    color: "text.secondary"
                                },
                                noWrap: true,
                                children: "Administrator"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(material_.Divider, {
                        sx: {
                            borderStyle: "dashed"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(material_.Stack, {
                        sx: {
                            p: 1
                        },
                        children: MENU_OPTIONS.map((option)=>/*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
                                href: option.linkTo,
                                component: shared_link/* Link */.r,
                                onClick: handleClose,
                                children: option.label
                            }, option.label))
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(material_.Divider, {
                        sx: {
                            borderStyle: "dashed"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(material_.MenuItem, {
                        onClick: handleClose,
                        sx: {
                            m: 1
                        },
                        children: "Logout"
                    })
                ]
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/ui/components/layouts/dashboard/navbar.tsx
// material



// components
//



// ----------------------------------------------------------------------
const DRAWER_WIDTH = 280;
const navbar_APPBAR_MOBILE = 64;
const navbar_APPBAR_DESKTOP = 92;
const RootStyle = (0,styles_.styled)(material_.AppBar)(({ theme  })=>({
        boxShadow: "none",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        backgroundColor: (0,styles_.alpha)(theme.palette.background.default, 0.72),
        [theme.breakpoints.up("lg")]: {
            width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
        }
    }));
const ToolbarStyle = (0,styles_.styled)(material_.Toolbar)(({ theme  })=>({
        minHeight: navbar_APPBAR_MOBILE,
        [theme.breakpoints.up("lg")]: {
            minHeight: navbar_APPBAR_DESKTOP,
            padding: theme.spacing(0, 5)
        }
    }));
const DashboardLayoutNavbar = ({ onOpenSidebar  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(RootStyle, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ToolbarStyle, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(material_.IconButton, {
                    onClick: onOpenSidebar,
                    sx: {
                        mr: 1,
                        color: "text.primary",
                        display: {
                            lg: "none"
                        }
                    },
                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_material_.Menu, {})
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(DashboardLayoutSearchbar, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(material_.Box, {
                    sx: {
                        flexGrow: 1
                    }
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(material_.Stack, {
                    direction: "row",
                    alignItems: "center",
                    spacing: {
                        xs: 0.5,
                        sm: 1.5
                    },
                    children: /*#__PURE__*/ jsx_runtime_.jsx(DashboardLayoutAccountPopover, {})
                })
            ]
        })
    });
};


/***/ }),

/***/ 8095:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ DashboardLayoutSidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _nav_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3682);
/* harmony import */ var $logic_hooks_use_responsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2385);
/* harmony import */ var $ui_components_shared_scrollbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3884);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var $ui_components_shared_nav_section__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2198);
/* harmony import */ var $ui_components_shared_logo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4566);
/* harmony import */ var $ui_components_shared_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8476);
/* harmony import */ var $routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(371);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([$ui_components_shared_nav_section__WEBPACK_IMPORTED_MODULE_8__]);
$ui_components_shared_nav_section__WEBPACK_IMPORTED_MODULE_8__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];












// ----------------------------------------------------------------------
const DRAWER_WIDTH = 280;
const RootStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div")(({ theme  })=>({
        [theme.breakpoints.up("lg")]: {
            flexShrink: 0,
            width: DRAWER_WIDTH
        }
    }));
const AccountStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div")(({ theme  })=>({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2, 2.5),
        borderRadius: Number(theme.shape.borderRadius) * 1.5,
        // backgroundColor: theme.palette.grey[500_12],
        backgroundColor: theme.palette.grey[200]
    }));
const DashboardLayoutSidebar = ({ isOpenSidebar , onCloseSidebar  })=>{
    const { pathname  } = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const isDesktop = (0,$logic_hooks_use_responsive__WEBPACK_IMPORTED_MODULE_5__/* .useResponsive */ .F)("up", "lg");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isOpenSidebar) {
            onCloseSidebar?.();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        pathname
    ]);
    const renderContent = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)($ui_components_shared_scrollbar__WEBPACK_IMPORTED_MODULE_6__/* .Scrollbar */ .L, {
        sx: {
            height: 1,
            "& .simplebar-content": {
                height: 1,
                display: "flex",
                flexDirection: "column"
            }
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                sx: {
                    px: 2.5,
                    py: 1
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx($ui_components_shared_link__WEBPACK_IMPORTED_MODULE_10__/* .Link */ .r, {
                    underline: "none",
                    href: $routes__WEBPACK_IMPORTED_MODULE_11__/* .routes.dashboard.index */ ._.dashboard.index(),
                    sx: {
                        color: "text.primary"
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx($ui_components_shared_logo__WEBPACK_IMPORTED_MODULE_9__/* .Logo */ .T, {
                        textAlign: "center",
                        fontSize: 88
                    })
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                sx: {
                    mb: 5,
                    mx: 2.5
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(AccountStyle, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Avatar, {
                            src: "/__mock/john-doe.png",
                            alt: "John Doe"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                            sx: {
                                ml: 2
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                    variant: "subtitle2",
                                    sx: {
                                        color: "text.primary"
                                    },
                                    children: "John Doe"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {
                                    variant: "body2",
                                    sx: {
                                        color: "text.secondary"
                                    },
                                    children: "Administrator"
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx($ui_components_shared_nav_section__WEBPACK_IMPORTED_MODULE_8__/* .NavSection */ .y, {
                navConfig: _nav_config__WEBPACK_IMPORTED_MODULE_4__/* .navConfig */ .K
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                sx: {
                    flexGrow: 1
                }
            })
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(RootStyle, {
        children: [
            !isDesktop && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Drawer, {
                open: isOpenSidebar,
                onClose: onCloseSidebar,
                PaperProps: {
                    sx: {
                        width: DRAWER_WIDTH
                    }
                },
                children: renderContent
            }),
            isDesktop && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Drawer, {
                open: true,
                variant: "persistent",
                PaperProps: {
                    sx: {
                        width: DRAWER_WIDTH,
                        bgcolor: "background.default",
                        borderRightStyle: "dashed"
                    }
                },
                children: renderContent
            })
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8476:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ NextLinkComposed),
/* harmony export */   "r": () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8103);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5246);
/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__);







// Add support for the sx prop for consistency with the other branches.
const Anchor = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.styled)("a")({});
const NextLinkComposed = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function NextLinkComposed({ to , linkAs , replace , scroll , shallow , prefetch , legacyBehavior =true , locale , ...other }, ref) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
        href: to,
        prefetch: prefetch,
        as: linkAs,
        replace: replace,
        scroll: scroll,
        shallow: shallow,
        passHref: true,
        locale: locale,
        legacyBehavior: legacyBehavior,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Anchor, {
            ref: ref,
            ...other
        })
    });
});
// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function Link(props, ref) {
    const { activeClassName ="active" , as , className: classNameProps , href , legacyBehavior , linkAs: linkAsProp , locale , noLinkStyle , prefetch , replace , role , scroll , shallow , ...other } = props;
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx__WEBPACK_IMPORTED_MODULE_2___default()(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName
    });
    const isExternal = typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);
    if (isExternal) {
        if (noLinkStyle) {
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Anchor, {
                className: className,
                href: href,
                ref: ref,
                ...other
            });
        }
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Link__WEBPACK_IMPORTED_MODULE_5___default()), {
            className: className,
            href: href,
            ref: ref,
            ...other
        });
    }
    const linkAs = linkAsProp || as;
    const nextjsProps = {
        to: href,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior,
        locale
    };
    if (noLinkStyle) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NextLinkComposed, {
            className: className,
            ref: ref,
            ...nextjsProps,
            ...other
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Link__WEBPACK_IMPORTED_MODULE_5___default()), {
        component: NextLinkComposed,
        className: className,
        ref: ref,
        ...nextjsProps,
        ...other
    });
});


/***/ }),

/***/ 4566:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);


const Logo = (props)=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Typography, {
        ...props,
        fontFamily: "Akronim",
        children: "VOID"
    });
};


/***/ }),

/***/ 2198:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ NavSection)
/* harmony export */ });
/* unused harmony export NavItem */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var $logic_utils_get_pathname__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1563);
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8476);
/* harmony import */ var url_join__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9140);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7915);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([url_join__WEBPACK_IMPORTED_MODULE_6__]);
url_join__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];









const RotateIcon = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)(({ icon: Icon , rotate: _ , degree: __ , ...props })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Icon, {
        ...props
    }))(({ theme , degree =-180 , rotate =false  })=>({
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeOut
        }),
        transform: `rotate(${rotate ? degree : 0}deg)`
    }));
const ListItemStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)((props)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ListItemButton, {
        disableGutters: true,
        ...props
    }))(({ theme  })=>({
        ...theme.typography.body2,
        height: 48,
        position: "relative",
        textTransform: "capitalize",
        color: theme.palette.text.secondary,
        borderRadius: theme.shape.borderRadius
    }));
const ListItemIconStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ListItemIcon)({
    width: 22,
    height: 22,
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});
const NavItem = ({ item: { title , path , icon , info , children  } , active , partial  })=>{
    const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
    const isActive = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>active(path), [
        path,
        active
    ]);
    const isPartial = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>partial(path), [
        path,
        partial
    ]);
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isPartial);
    const toggle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        setOpen((prev)=>!prev);
    }, []);
    const activeStyle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            color: "primary.main",
            fontWeight: "bold",
            bgcolor: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }), [
        theme.palette.action.selectedOpacity,
        theme.palette.primary.main
    ]);
    const partialStyle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            color: "primary.main",
            fontWeight: "medium"
        }), []);
    if (children) {
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ListItemStyle, {
                    onClick: toggle,
                    sx: {
                        ...isPartial && partialStyle
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ListItemIconStyle, {
                            children: icon
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ListItemText, {
                            disableTypography: true,
                            primary: title
                        }),
                        info,
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RotateIcon, {
                            icon: _mui_icons_material__WEBPACK_IMPORTED_MODULE_7__.KeyboardArrowDown,
                            rotate: open,
                            sx: {
                                mr: 1
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Collapse, {
                    in: open,
                    timeout: "auto",
                    unmountOnExit: true,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.List, {
                        component: "div",
                        disablePadding: true,
                        children: children.map((item)=>{
                            const itemPath = (0,url_join__WEBPACK_IMPORTED_MODULE_6__["default"])((0,$logic_utils_get_pathname__WEBPACK_IMPORTED_MODULE_8__/* .getPathname */ .R)(path), (0,$logic_utils_get_pathname__WEBPACK_IMPORTED_MODULE_8__/* .getPathname */ .R)(item.path));
                            const isActiveSub = active(itemPath);
                            return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ListItemStyle, {
                                component: _link__WEBPACK_IMPORTED_MODULE_5__/* .NextLinkComposed */ .Z,
                                to: itemPath,
                                sx: {
                                    ...isActiveSub && activeStyle,
                                    pl: 2
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ListItemIconStyle, {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
                                            component: "span",
                                            sx: {
                                                width: 4,
                                                height: 4,
                                                display: "flex",
                                                borderRadius: "50%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                bgcolor: "text.disabled",
                                                transition: (theme)=>theme.transitions.create("transform"),
                                                ...isActiveSub && {
                                                    transform: "scale(2)",
                                                    bgcolor: "primary.main"
                                                }
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ListItemText, {
                                        disableTypography: true,
                                        primary: item.title
                                    })
                                ]
                            }, title);
                        })
                    })
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ListItemStyle, {
        component: _link__WEBPACK_IMPORTED_MODULE_5__/* .NextLinkComposed */ .Z,
        to: path,
        sx: {
            ...isActive && activeStyle
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ListItemIconStyle, {
                children: icon && icon
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ListItemText, {
                disableTypography: true,
                primary: title
            }),
            info && info
        ]
    });
};
const NavSection = ({ navConfig , ...other })=>{
    const { pathname  } = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const match = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((path)=>path ? pathname.endsWith((0,$logic_utils_get_pathname__WEBPACK_IMPORTED_MODULE_8__/* .getPathname */ .R)(path)) : false, [
        pathname
    ]);
    const partial = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((path)=>path ? pathname.startsWith((0,$logic_utils_get_pathname__WEBPACK_IMPORTED_MODULE_8__/* .getPathname */ .R)(path)) : false, [
        pathname
    ]);
    const items = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>navConfig.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NavItem, {
                item: item,
                active: match,
                partial: partial
            }, item.title)), [
        match,
        navConfig,
        partial
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
        ...other,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.List, {
            disablePadding: true,
            sx: {
                p: 1
            },
            children: items
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3884:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ Scrollbar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var simplebar_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4172);
/* harmony import */ var simplebar_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(simplebar_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var $modules_checks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6903);






const RootStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div")(()=>({
        flexGrow: 1,
        height: "100%",
        overflow: "hidden"
    }));
const SimpleBarStyle = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)((simplebar_react__WEBPACK_IMPORTED_MODULE_1___default()))(({ theme  })=>({
        maxHeight: "100%",
        "& .simplebar-scrollbar": {
            "&:before": {
                backgroundColor: (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.alpha)(theme.palette.grey[600], 0.48)
            },
            "&.simplebar-visible:before": {
                opacity: 1
            }
        },
        "& .simplebar-track.simplebar-vertical": {
            width: 10
        },
        "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
            height: 6
        },
        "& .simplebar-mask": {
            zIndex: "inherit"
        }
    }));
const Scrollbar = ({ children , ...other })=>{
    const mobile = (0,react__WEBPACK_IMPORTED_MODULE_4__.useMemo)(()=>(0,$modules_checks__WEBPACK_IMPORTED_MODULE_5__/* .isMobile */ .tq)(), []);
    if (mobile) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
            ...other,
            sx: {
                overflowX: "auto",
                ...other.sx
            },
            children: children
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(RootStyle, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SimpleBarStyle, {
            timeout: 500,
            clickOnTrack: false,
            ...other,
            children: children
        })
    });
};


/***/ })

};
;