export async function vueTemplateToString() {
    
    const src = '/html/InfowindowPOI.html'
    const response = await fetch(src);
    const html = await response.text()
    console.log(html);
    return html
}
  