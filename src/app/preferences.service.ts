import { Injectable } from '@angular/core';
// import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// const { preferences } = Preferences;

@Injectable({
  providedIn: 'root'
})

export class PreferencesService {
  constructor() { }
  
  async getPrefs(key: string): Promise<any> {
    const item = await Preferences.get({ 
      key: key 
    });
    return JSON.parse(item.value);
  }
  
  async setPrefs(key: string, value: any): Promise<void> {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }
  
  public removePrefs = async () => {
    await Preferences.remove({ key: 'name' });
  };
  
  
}