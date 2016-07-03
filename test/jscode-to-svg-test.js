// LICENSE : MIT
"use strict";
import {toSVG} from "../src/jscode-to-svg";
const assert = require("power-assert");
const fs = require("fs");
describe("jscode-to-svg-test", function () {
    it("should ", function () {
        const svg = toSVG(`
if( true ) {
  var foo = "test";
  alert(foo);
  /sage/.test(foo);
  // comment  
}`);
        console.log(svg);
        fs.writeFileSync(__dirname + "/a.svg", svg, "utf-8");
    });
});