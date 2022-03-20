import * as ts from 'typescript';

function extractTypeSignature(filename: string, aliasName: string): string {
  const program: ts.Program = ts.createProgram([filename], {
    emitDeclarationOnly: true,
  });
  const sourceFile = program.getSourceFile(filename);
  const typeChecker = program.getTypeChecker();
  // @ts-ignore
  const statement: ts.Statement | undefined = sourceFile.statements.find(
    (s: ts.Statement) => ts.isTypeAliasDeclaration(s) && s.name.text === aliasName
  );
  if (!statement) {
    throw new Error(`Type: '${aliasName}' not found in file: '${filename}'`);
  }
  const type: ts.Type = typeChecker.getTypeAtLocation(statement);
  const values: string[] = [];
  // Iterate over the `ts.Symbol`s representing Property Nodes of `ts.Type`
  for (const prop of type.getProperties()) {
    const name: string = prop.getName();

    if (isNaN(+name)) {
      continue;
    }
    
    const propType: ts.Type = typeChecker.getTypeOfSymbolAtLocation(
      prop,
      statement
    );
    const propTypeName: string = typeChecker.typeToString(propType);
    values.push(propTypeName);
  }
  return `type ${aliasName} = [${values.join(', ')}]`;
}

const answerSignature = extractTypeSignature('./types/script.ts', 'Answer');
console.log(answerSignature);
