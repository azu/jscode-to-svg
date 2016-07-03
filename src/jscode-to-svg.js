// LICENSE : MIT
"use strict";
const espree = require("espree");
import astToSVG from "./ast-to-svg";
import commentsPlugin  from "./plugins/comments"
import tokensPlugin  from "./plugins/tokens"
const defaultPlugins = [
    tokensPlugin,
    commentsPlugin
];
export function toSVG(code, plugins = defaultPlugins) {
    var ast = espree.parse(code, {
        // attach range information to each node
        range: true,
        // attach line/column location information to each node
        loc: true,
        // create a top-level comments array containing all comments
        comment: true,
        // attach comments to the closest relevant node as leadingComments and
        // trailingComments
        attachComment: true,
        // create a top-level tokens array containing all tokens
        tokens: true,
        // specify the language version (3, 5, 6, or 7, default is 5)
        ecmaVersion: 7,
        // specify which type of script you're parsing (script or module, default is script)
        sourceType: "module",
        // specify additional language features
        ecmaFeatures: {
            // enable JSX parsing
            jsx: true,
            // enable return in global scope
            globalReturn: true,
            // enable implied strict mode (if ecmaVersion >= 5)
            impliedStrict: true,
            // allow experimental object rest/spread
            experimentalObjectRestSpread: true
        }
    });
    const options = {
        fontFamily: "monospace",
        fontSize: 12,
        css: `
.Keyword {
    fill: #159393b;
}
.Identifier{
    fill: #516aec;
}
.Boolean, .Null, .String, .RegExp {
    fill: #159393;
}
.Comment {
    fill: #9e8f9e;
}`,
        width: "200",
        height: "auto"
    };
    return astToSVG(ast, plugins, options);
}