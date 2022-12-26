import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  IContextViewService,
  ITelemetryService,
  IThemeService,
  IKeybindingService,
  INotificationService,
  ContextMenuService,
  DynamicStandaloneServices,
  DefaultController,
} from './monaco-utils';

export function getController(
  target: any,
  getActionsFn: any,
  resolveMenuHeight: any
) {
  const services = new DynamicStandaloneServices(target.container, {});

  const telemetryService = services.get(ITelemetryService);
  const notificationService = services.get(INotificationService);
  const contextViewService = services.get(IContextViewService);
  const keybindingService = services.get(IKeybindingService);

  const themeService = services.get(IThemeService);
  themeService.setTheme('vs-dark');

  const contextMenuService = new ContextMenuService(
    telemetryService,
    notificationService,
    contextViewService,
    keybindingService,
    themeService
  );

  return class Controller extends DefaultController {
    onContextMenu(tree: any, file: any, event: any) {
      tree.setFocus(file);
      const anchorOffset = { x: -10, y: -3 };
      const anchor = {
        x: event._posx + anchorOffset.x,
        y: event._posy + anchorOffset.y,
      };
      const actions = getActionsFn && getActionsFn(file, event);
      if (!actions || !actions.length) {
        return false;
      }

      contextMenuService.showContextMenu({
        getAnchor: () => anchor,
        getActions: () => actions || [],
        getActionItem: (action: any) => null,
        onHide: (wasCancelled: any) => {
          if (wasCancelled) {
            tree.domFocus();
          }
        },
      });
      super.onContextMenu(tree, file, event);
      if (resolveMenuHeight) {
        this.resolveMenuHeight(event);
      }

      return true;
    }
    resolveMenuHeight(event: any) {}
  };
}

export function createController(
  target: any,
  getActionsFn: any,
  resolveMenuHeight: any
) {
  const Controller = getController(target, getActionsFn, resolveMenuHeight);
  return new Controller();
}
