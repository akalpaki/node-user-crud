// code taken from https://github.com/ai/nanoid

const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

export function nanoid(size: number = 21): string {
  let id = '';
  for (let i = 0; i <= size; i++) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
}
