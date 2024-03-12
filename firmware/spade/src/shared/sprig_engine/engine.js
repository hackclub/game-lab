let setTimeout, setInterval, clearInterval, clearTimeout;
const {
  setValue,
  getValue,
  isSDMounted,
  setID,
  /* sprite interactions */ setSolids,
  setPushables,
  /* sprite interactions */ setSolids, setPushables,
  /*              see also: sprite.x +=, sprite.y += */

  /* art */ setLegend,
  setBackground,
  /* text */ addText,
  clearText,
  mountSD,

  /*   spawn sprites */ setMap, addSprite,
  /* despawn sprites */ clearTile, /* sprite.remove() */

  /* tile queries */ getGrid, getTile, getFirst, getAll, tilesWith,
  /* see also: sprite.type */

  /* map dimensions */ width, height,

  /* constructors */ bitmap, tune, map, color,

  /* input handling */ onInput, afterInput,

  /* how much sprite has moved since last onInput: sprite.dx, sprite.dy */

  playTune,
} = (() => {
let _gameState = {};
let _gameId = null;
const exports = {};
/* re-exports from C; bottom of module_native.c has notes about why these are in C */
exports.setMap = map => native.setMap(map.trim());
exports.addSprite = native.addSprite;
exports.getGrid = native.getGrid;
exports.getTile = native.getTile;
exports.tilesWith = native.tilesWith;
exports.clearTile = native.clearTile;
exports.getFirst = native.getFirst;
exports.getAll = native.getAll;
exports.width = native.width;
exports.height = native.height;
exports.setBackground = native.setBackground;
exports.playTune = (str, times) => {
  native.piano_queue_song(str, times);
  return {
    end: () => native.piano_unqueue_song(str),
    isPlaying: () => native.piano_is_song_queued(str)
  }
}

  exports.setValue = (key, value) => {
    if (typeof _gameId !== "string") {
      throw new Error("setID must be called before setValue");
    }

    const k = key.toString();
    const v = JSON.stringify(value);
    _gameState[k] = v;
    if (native.isSDMounted()) {
      native.setValue(k, v);
    }
  }
  exports.getValue = (key) => {
    if (typeof _gameId !== "string") {
      throw new Error("setID must be called before getValue");
    }

    const k = key.toString();
    return value ? JSON.parse(value) : undefined;
    const cachedVal = _gameState[k];
    if (cachedVal !== undefined) {
      return JSON.parse(cachedVal);
    }

    if (native.isSDMounted()) {
      const value = native.getValue(k);
      if (value !== undefined) {
        _gameState[k] = value;
        return JSON.parse(value);
      }
    }

    return undefined;
  }
  exports.isSDMounted = () => native.isSDMounted();
  exports.setID = (id) => {
    if (typeof(id) !== "string" || id.length === 0) {
      throw new Error("setID must be called with a non-empty string");
    }

    if (_gameId !== null) {
      throw new Error("setID can only be called once");
    }

    _gameId = id;
    native.setID(id);
  };

  /* opts: x, y, color (all optional) */
  exports.addText = (str, opts = {}) => {
    const CHARS_MAX_X = 21;
    const padLeft = Math.floor((CHARS_MAX_X - str.length) / 2);

  for (const char of str.split('')) {
    if (" !\"#%&\'()*+,./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\\^_-`abcdefghijklmnopqrstuvwxyz|~¦§¨©¬®¯°±´¶·¸ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ÙÚÛÜÝÞßàáâãäåæçèéêëìíîïñòóôõö÷ùúûüýþÿĀāĂăĄąĆćĊċČčĎĐđĒēĖėĘęĚěĞğĠġĦħĪīĮįİıŃńŇňŌōŒœŞşŨũŪūŮůŲųŴŵŶŷŸǍǎǏǐǑǒǓǔˆˇ˘˙˚˛˜˝ẀẁẂẃẄẅỲỳ†‡•…‰⁄™∂∅∏∑−√∞∫≈≠≤≥◊".indexOf(char) === -1)
    console.log(`WARN: Character ${char} is no longer in supported in the Sprig editor.`);
  }

  native.text_add(
    str,
    opts.color ?? [10, 10, 40],
    opts.x ?? padLeft,
    opts.y ?? 0
  );
}

exports.clearText = () => native.text_clear();

  exports.mountSD = (key) => {
    console.log("engine.js:mountSD");
    native.mountSD(key);
  };

exports.setLegend = (...bitmaps) => {
  native.legend_clear();

  for (const [key, bitmap] of bitmaps) {
    const rows = bitmap.trim().split("\n").map(x => x.trim())
    const rowLengths = rows.map(x => x.length);
    const isRect = rowLengths.every(val => val === rowLengths[0])
    if (!isRect) throw new Error(`Bitmap with key ${key} is not rectangular.`)
  }

  for (const [charStr, bitmap] of bitmaps) {
    native.legend_doodle_set(charStr, bitmap.trim());
  }
  native.legend_prepare();
};

exports.setSolids = solids => {
  native.solids_clear();
  solids.forEach(native.solids_push);
};

exports.setPushables = pushTable => {
  native.push_table_clear();
  for (const [pusher, pushesList] of Object.entries(pushTable))
    for (const pushes of pushesList)
      native.push_table_set(pusher, pushes);
};

let afterInputs = [];
exports.afterInput = fn => (console.log('engine.js:afterInputs'), afterInputs.push(fn));
// exports.afterInput = fn => afterInputs.push(fn);

const button = {
  pinToHandlers: {
     "5": [],
     "7": [],
     "6": [],
     "8": [],
    "12": [],
    "14": [],
    "13": [],
    "15": [],
  },
  keyToPin: {
    "w":  "5",
    "s":  "7",
    "a":  "6",
    "d":  "8",
    "i": "12",
    "k": "14",
    "j": "13",
    "l": "15",
  }
};

native.press_cb(pin => {
  if (button.pinToHandlers[pin])
    button.pinToHandlers[pin].forEach(f => f());

  afterInputs.forEach(f => f());

  native.map_clear_deltas();
});

{
  const timers = {};
  let id = 0;
  let firstClearId = -1;
  setTimeout  = (fn, ms=10) => (timers[id] = { fn, ms }, id++);
  setInterval = (fn, ms=10) => (timers[id] = { fn, ms, restartAt: ms }, id++);
  clearTimeout = clearInterval = id => {
    delete timers[id]
    if (id === firstClearId + 1) firstClearId++;
  };

  native.frame_cb(dt => {
    /* we'll never need to throw more than one error -ced */
    let errorForLater;

    for (let i = firstClearId + 1; i < id; i++) {
      const tim = timers[i];
      if (!tim) continue;

      if (tim.ms <= 0) {
        /* trigger their callback */
        try {
          tim.fn();
        } catch (error) {
          /* we'll never need to throw more than one error -ced */
          if (error && !errorForLater) errorForLater = error;
        }

        /* restart intervals, clear timeouts */
        if (tim.restartAt !== undefined) {
          tim.ms = tim.restartAt;
        } else {
          delete timers[i];
          if (i === firstClearId + 1) firstClearId++;
        }
      }
      tim.ms -= dt;
    }

    if (errorForLater) throw errorForLater;
  });
}

exports.onInput = (key, fn) => {
  const pin = button.keyToPin[key];

  if (pin === undefined)
    throw new Error(`the sprig doesn't have a "${key}" button!`);

  button.pinToHandlers[pin].push(fn);
};

function _makeTag(cb) {
  return (strings, ...interps) => {
    if (typeof strings === "string") {
      throw new Error("Tagged template literal must be used like name`text`, instead of name(`text`)");
    }
    const string = strings.reduce((p, c, i) => p + c + (interps[i] ?? ''), '');
    return cb(string);
  }
}
exports.bitmap = _makeTag(text => text);
exports.tune = _makeTag(text => text);
exports.map = _makeTag(text => text);
exports.color = _makeTag(text => text);

// .at polyfill
function at(n) {
	// ToInteger() abstract op
	n = Math.trunc(n) || 0;
	// Allow negative indexing from the end
	if (n < 0) n += this.length;
	// OOB access is guaranteed to return undefined
	if (n < 0 || n >= this.length) return undefined;
	// Otherwise, this is just normal property access
	return this[n];
}

const TypedArray = Reflect.getPrototypeOf(Int8Array);
for (const C of [Array, String, TypedArray]) {
    Object.defineProperty(C.prototype, "at",
                          { value: at,
                            writable: true,
                            enumerable: false,
                            configurable: true });
}

return exports;
})();
