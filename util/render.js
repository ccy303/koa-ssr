const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const inject = require('./inject');
module.exports = () => {
  const Render = {
    normalizeReactElement: reactElement => {
      return reactElement && reactElement.default ? reactElement.default : reactElement;
    },
    render: (name, locals = {}) => {
      const reactElement = Render.normalizeReactElement(require(path.join(__dirname, '../dist/js', name)));
      const element = React.createElement(reactElement, locals);
      inject.inject();
      return ReactDOMServer.renderToString(element);
    },
  };
  return async (ctx, next) => {
    ctx.render = Render.render;
    await next();
  };
};
