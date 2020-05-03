import * as vscode from 'vscode';
import { getSelectedText, addToClipboard } from './utils';
import { transformJavascriptToTs } from './transformers';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'make-a-type.transformJSObjectToTypedInterfaceClipboard',
    () => {
      getSelectedText()
        .then((json) => transformJavascriptToTs(json))
        .then((result) => addToClipboard(result))
        .then(() =>
          vscode.window.showInformationMessage('Interface copied to clipboard')
        );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
