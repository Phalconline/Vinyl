export default {
  dispatchHistoryStateUpdate(url) {
    const historyStateUpdateEvent = new CustomEvent('historyStateUpdate', {detail: {url: url}});

    if (url) {
      window.dispatchEvent(historyStateUpdateEvent);
    }
  }
}
