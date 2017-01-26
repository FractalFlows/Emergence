export default function(form, fields){
  for(let key in fields) {
    const selectorName = `${form} [name=${key}]`
    browser.waitForVisible(selectorName)
    browser.setValue(selectorName, fields[key])
  }
}
