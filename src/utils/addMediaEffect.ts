import React from 'react';
import textPressSoundSrc from '../static/audio/text-press.mp3';

function addMediaEffect(
  func: React.MouseEventHandler<HTMLElement> | undefined,
  sound = textPressSoundSrc,
  vibrateDuration = 200,
) {
  if (func === undefined) return undefined;

  return function aftered(event: React.MouseEvent<HTMLElement>) {
    func!(event);
    navigator?.vibrate(vibrateDuration);
    (new Audio(sound).cloneNode(true) as HTMLAudioElement).play();
  };
}

export default addMediaEffect;
