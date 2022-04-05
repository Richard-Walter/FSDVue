export async function vueTemplateToString(src) {
  
    src = '/html/InfowindowPOI.html'
    const response = await fetch(src);
    const data = await response.text();
    console.log(data);
    return data
  }
  