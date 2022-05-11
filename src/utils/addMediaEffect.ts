import textPressSoundSrc from '../static/audio/text-press.mp3';

function addMediaEffect(
  func = (...args: unknown[]) => {},
  sound = textPressSoundSrc,
  vibrateDuration = 200,
) {
  return function aftered(...args: unknown[]) {
    func(...args);
    navigator?.vibrate(vibrateDuration);
    (new Audio(sound).cloneNode(true) as HTMLAudioElement).play();
  };
}

export default addMediaEffect;
