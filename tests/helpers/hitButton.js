export default function(selector){
  browser.waitForVisible(selector)
  browser.click(selector)
}
