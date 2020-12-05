const audioContext = window.AudioContext || (window as any).webkitAudioContext;
export default new audioContext();
