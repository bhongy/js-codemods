// from: https://www.toptal.com/javascript/write-code-to-rewrite-your-code

export default (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // find declaration for "geometry" import
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: "Literal",
      value: "geometry"
    }
  });

  // get the local name for the imported module
  const localName =
    importDeclaration.find(j.Identifier)
    .get(0) // get the first NodePath from the Collection
    .node.name; // get the Node in the NodePath and grab its "name"

  return root.find(j.MemberExpression, {
    object: { name: localName },
    property: { name: 'circleArea' },
  })
    .replaceWith(({ node }) => {
      node.property.name = 'getCircleArea';
      return node;
    })
    .toSource();
};
