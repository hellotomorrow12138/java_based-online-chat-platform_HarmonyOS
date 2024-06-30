import preferences from '@ohos.data.preferences'
class PreferencesUtil{
  prefMap: Map<String,preferences.Preferences>=new Map()
  async loadPreference(context,name: string){
    try{
      let pref = await preferences.getPreferences(context,name)
      this.prefMap.set(name,pref)
      console.log('testTag', `加载preferences[${name}]成功`)
    }catch(e){
      console.log('testTag', `加载preferences[${name}]失败`,JSON.stringify(e))
    }
  }
  async putPreferenceUtilValue(name:string,key:string,value:preferences.ValueType){
    if(!this.prefMap.has(name)){
      console.log('testTag', `加载preferences[${name}]尚未初始化`)
      return
    }
    let pref = this.prefMap.get(name)
    // 写入数据
    await pref.put(key,value)
    await pref.flush()
  }
  async getPreferenceUtilValue(name:string,key:string,defaultValue:preferences.ValueType){
    if(!this.prefMap.has(name)){
      console.log('testTag', `加载preferences[${name}]尚未初始化`)
      return
    }
    let pref = this.prefMap.get(name)
    // 写入数据
    return await pref.get(key,defaultValue)
  }
}
const preferencesUtil = new PreferencesUtil()
export default preferencesUtil as PreferencesUtil