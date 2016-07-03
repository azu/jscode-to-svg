// LICENSE : MIT
"use strict";
const groupBy = require("lodash.groupby");
export default function tokens(ast, options = {}){
    const fontSize = options.fontSize;
    const tokensByLine = groupBy(ast.tokens, (token) => {
        return token.loc.start.line;
    });
    return Object.keys(tokensByLine).map(line => {
        const tokens = tokensByLine[line];
        const x = tokens[0].loc.start.column + 1;
        const y = tokens[0].loc.start.line;
        const tspans = tokens.map((token, index) => {
            const prevToken = tokens[index - 1];
            let margin = "";
            if (prevToken) {
                margin = new Array((token.start - prevToken.end) + 1).join(" ");
            }
            return `${margin}<tspan class="${token.type}">${token.value}</tspan>`;
        });
        return `<text x="${x * fontSize}" y="${y * fontSize}">${tspans.join("")}</text>`;
    });
}