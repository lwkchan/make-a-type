import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "make-a-type" is now active!');

  let disposable = vscode.commands.registerCommand(
    'make-a-type.makeAType',
    () => {
      vscode.window.showInformationMessage('Hello World from make a type!');
      const currentEditor = vscode.window.activeTextEditor;
      const selection = vscode.window.activeTextEditor?.selection;
      if (!selection || !currentEditor) {
        return;
      }
      const length = selection.end.character - selection.start.character;

      const range =
        length === 0
          ? currentEditor.document.getWordRangeAtPosition(selection.anchor)
          : new vscode.Range(selection.start, selection.end);

      const text = currentEditor.document.getText(range);
      console.log('text:', text);
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
