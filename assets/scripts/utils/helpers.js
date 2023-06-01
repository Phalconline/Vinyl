export default {
  updateGETParam(getParamName, value, regex) {
    let url = window.location.href;

    if (url.includes(getParamName)) {
      url = url.replace(regex, `${getParamName}=${value}`);
    } else if(url.includes('?')){
      url = [url, `${getParamName}=${value}`].join('&');
    } else {
      url = [url, `${getParamName}=${value}`].join('?');
    }

    window.history.pushState({path: url}, '', url);
  }
}
