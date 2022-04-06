export async function vueTemplateToString(src, varDict) {

  //console.log(varDict);


  const response = await fetch(src);
  let html = await response.text();

  //console.log("pre-parse", html);

  for (const [key, value] of Object.entries(varDict)) {
    console.log(key, value);
    let search = `{{${key}}}`
    html = (html.replaceAll(search, value))
  }
  console.log('###############################');
  console.log(html);

  return html;
}
