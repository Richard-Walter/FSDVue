export async function vueTemplateToString(src) {
    

    const response = await fetch(src);
    const html = await response.text()
    console.log(html);
    return html
}
  