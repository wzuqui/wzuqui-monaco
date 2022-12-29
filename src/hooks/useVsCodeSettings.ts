import { selectVscodeSettingsJson } from '../features/workspace/workspaceSlice';
import { IVsCodeSettings } from '../interfaces/vscode-settings';
import { useRootSelector } from './useRootSelector';

export function useVsCodeSettings() {
  try {
    const vsCodeSettingsJson = useRootSelector(selectVscodeSettingsJson);
    const vsCodeSettings: IVsCodeSettings = JSON.parse(vsCodeSettingsJson?.content ?? '{}');
    return vsCodeSettings;
  } catch {
    return {} as IVsCodeSettings;
  }
}
