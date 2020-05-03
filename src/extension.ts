import * as vscode from 'vscode';
import { getSelectedText, transformJavascriptToTs } from './utils';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'make-a-type.transformJSObjectToTypedInterfaceClipboard',
    () => {
      getSelectedText()
        .then((json) => transformJavascriptToTs(json))
        .then((result) => {
          vscode.env.clipboard.writeText(result);
        });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
