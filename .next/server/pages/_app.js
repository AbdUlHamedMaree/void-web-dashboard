"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9269:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "DefaultSeoProps": () => (/* binding */ DefaultSeoProps),
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "@emotion/react"
const react_namespaceObject = require("@emotion/react");
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
// EXTERNAL MODULE: ./src/ui/cache/create-emotion-cache.ts
var create_emotion_cache = __webpack_require__(2283);
// EXTERNAL MODULE: ./src/ui/theme/index.ts + 15 modules
var theme = __webpack_require__(2263);
;// CONCATENATED MODULE: external "next-seo"
const external_next_seo_namespaceObject = require("next-seo");
// EXTERNAL MODULE: ./node_modules/next/dynamic.js
var dynamic = __webpack_require__(5152);
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/libs/checks.ts
const isServer = ()=>"undefined" === "undefined";
const isBrowser = ()=>!isServer();

;// CONCATENATED MODULE: ./src/logic/utils/scroll-to-window-hash.ts
const scrollToWindowHash = ()=>{
    const hashId = window.location.hash;
    if (!hashId) return;
    const element = document.querySelector(hashId);
    if (!element) return;
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
    });
};

// EXTERNAL MODULE: ./node_modules/nprogress/nprogress.css
var nprogress = __webpack_require__(4204);
;// CONCATENATED MODULE: ./src/ui/components/guards/auth/index.tsx


const AuthGuard = ({ children  })=>{
    // const passRoleCheck = useMemo(() => passRoleGuard(role), [role]);
    // const [passed, setPassed] = useState(false);
    // const logout = useResolvedLogout();
    // const handleUnAuth = useCallback(() => {
    //   onUnAuth?.();
    //   logout();
    // }, [logout, onUnAuth]);
    // const setUser = useAuth(s => s.setUser);
    // const { data, isLoading, isIdle } = useGetMeService.query(
    //   {},
    //   {
    //     onSuccess: ({ data: user }) => {
    //       setUser(user);
    //     },
    //     onError: () => {
    //       logout();
    //     },
    //     refetchOnReconnect: false,
    //     refetchOnMount: false,
    //     refetchOnWindowFocus: false,
    //     refetchInterval: false,
    //     refetchIntervalInBackground: false,
    //     //
    //     keepPreviousData: true,
    //     staleTime: 0,
    //     cacheTime: Infinity,
    //     optimisticResults: true,
    //     structuralSharing: true,
    //     retryOnMount: false,
    //     retry: false,
    //   }
    // );
    // const user = useMemo(() => data?.data, [data?.data]);
    // useEffect(() => {
    //   if (isLoading || isIdle) return;
    //   if (!isDefined(user) || !passRoleCheck(user.roles?.map(el => el.name)))
    //     return handleUnAuth();
    //   setPassed(true);
    // }, [handleUnAuth, isLoading, user, passRoleCheck, isIdle]);
    // TODO: splash screen
    // if (!passed) return <>loading...</>;
    if (false) {}
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: children
    });
}; // const passRoleGuard =
 //   (allowed?: VirtualRoleNameUnion | VirtualRoleNameUnion[]) =>
 //   (roles?: VirtualRoleNameUnion[]) => {
 //     if (isNil(allowed)) return true;
 //     if (isNil(roles)) return false;
 //     if (isStringFull(allowed)) return roles.includes(allowed);
 //     if (isArrayFull(allowed)) return allowed.some(role => roles.includes(role));
 //     return false;
 //   };

;// CONCATENATED MODULE: ./src/pages/_app.tsx















const url = process.env.NEXT_PUBLIC_SITE_URL;
const DefaultSeoProps = {
    canonical: url,
    titleTemplate: "%s Dubai, UAE - Void",
    defaultTitle: "Void: The Best Void Agency in Dubai, UAE",
    description: "Void is the best agency in Dubai, UAE. We build websites, mobile apps, brands, and marketing campaigns full of creativity and innovation.",
    openGraph: {
        type: "website",
        locale: "en_AE",
        url: url,
        site_name: "Void",
        images: [
            {
                url: `${url}/assets/logo/logo-portrait.png`,
                alt: "Void Agency Logo",
                width: 500,
                height: 324,
                type: "image/png"
            }
        ]
    },
    languageAlternates: [
        {
            hrefLang: "en-ae",
            href: url
        }
    ],
    twitter: {
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image"
    }
};
const TopProgressBar = dynamic_default()(null, {
    loadableGenerated: {
        modules: [
            "_app.tsx -> " + "../ui/components/shared/next-progress"
        ]
    },
    ssr: false
});
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = (0,create_emotion_cache/* createEmotionCache */.S)();
const App = ({ Component , pageProps , emotionCache =clientSideEmotionCache  })=>{
    const { asPath  } = (0,router_.useRouter)();
    const Layout = (0,external_react_.useMemo)(()=>Component.layout ?? (({ children  })=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: children
            })), [
        Component
    ]);
    (0,external_react_.useEffect)(()=>{
        if (isServer()) return;
        // To scroll to section by url hashing (ex: /home#blog)
        scrollToWindowHash();
    }, [
        asPath
    ]);
    const page = (0,external_react_.useMemo)(()=>{
        if (Component?.auth) return /*#__PURE__*/ jsx_runtime_.jsx(AuthGuard, {
            ...Component.auth,
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        });
        return /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        });
    }, [
        Component,
        pageProps
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(external_next_seo_namespaceObject.DefaultSeo, {
                ...DefaultSeoProps
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_namespaceObject.CacheProvider, {
                value: emotionCache,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(TopProgressBar, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx((head_default()), {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                            name: "viewport",
                            content: "initial-scale=1, width=device-width"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(styles_.ThemeProvider, {
                        theme: theme/* theme */.r,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(material_.CssBaseline, {}),
                            /*#__PURE__*/ jsx_runtime_.jsx(Layout, {
                                children: page
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 1913:
/***/ ((module) => {

module.exports = require("@emotion/cache");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 8442:
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 7342:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-ssr-error.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [210,766,13], () => (__webpack_exec__(9269)));
module.exports = __webpack_exports__;

})();