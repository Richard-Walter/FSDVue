export function vueTemplateToString(htmlTemplate, varDict) {
  for (const [key, value] of Object.entries(varDict)) {
    console.log(key, value);
    let search = `{{${key}}}`;
    htmlTemplate = htmlTemplate.replaceAll(search, value);
  }
  console.log("###############################");
  console.log(htmlTemplate);

  return htmlTemplate;
}

export async function getVueTemplateAsString(src) {
  const response = await fetch(src);
  let html = await response.text();

  return html;
}
