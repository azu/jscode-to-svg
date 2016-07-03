export default function process(ast, plugins, options) {
    let contents = [];
    plugins.forEach(plugin => {
        const nodes = plugin(ast, options);
        if (!Array.isArray(nodes)) {
            nodes.push(node);
            return;
        }
        nodes.forEach(node => {
            contents.push(node);
        });
    });
    const viewWidth = options.width;
    const viewHeight = options.height === "auto" ? ast.loc.end.line * options.fontSize + options.fontSize : options.height;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewWidth} ${viewHeight}">
    <style>${options.css}</style>
    <g id="jscode-to-svg-container" font-family="${options.fontFamily}" font-size="${options.fontSize}">
${contents.join("\n")}
    </g>
</svg>`
}