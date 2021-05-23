const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const Inject = require('./inject');
module.exports = (option) => {
  const inject = new Inject(option)
  const Render = {
    normalizeReactElement: reactElement => {
      return reactElement && reactElement.default ? reactElement.default : reactElement;
    },
    render: (name, locals = {}) => {
      const reactElement = Render.normalizeReactElement(require(path.join(__dirname, '../dist/js', name)));
      const element = React.createElement(reactElement, locals);
      const html = ReactDOMServer.renderToString(element)
      return inject.inject(html, name, locals);
    },
  };
  return async (ctx, next) => {
    ctx.render = Render.render;
    await next();
  };
};
