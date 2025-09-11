module.exports = function zyyo_delay(zyyo_ms) {
  return new Promise((resolve) => setTimeout(resolve, zyyo_ms))
}
