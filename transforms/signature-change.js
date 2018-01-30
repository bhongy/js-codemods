// from: https://www.toptal.com/javascript/write-code-to-rewrite-your-code

export default (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: "Literal",
      value: "car"
    }
  });

  const localName = importDeclaration
    .find(j.Identifier)
    .get(0)
    .node.name;

  // current order of arguments
  const argKeys = [
    "color",
    "make",
    "model",
    "year",
    "miles",
    "bedliner",
    "alarm"
  ];

  return root
    .find(j.CallExpression, {
      callee: {
        type: "MemberExpression",
        object: { name: localName },
        property: { name: "factory" }
      }
    })
    .replaceWith(({ node }) => {
      const argumentsAsObject = j.objectExpression(
        node.arguments.map((arg, i) =>
          j.property("init", j.identifier(argKeys[i]), j.literal(arg.value))
        )
      );
      node.arguments = [argumentsAsObject];
      return node;
    })
    .toSource();
};
