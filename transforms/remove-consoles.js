// from: https://www.toptal.com/javascript/write-code-to-rewrite-your-code

export default (file, { jscodeshift: j }) =>
  j(file.source)
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        object: {
          type: "Identifier",
          name: "console"
        }
      }
    })
    .remove()
    .toSource();
