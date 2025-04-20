export function txtSlicer(txt: string, maxlingth: number = 50) {
  if (txt.length >= maxlingth) return `${txt.slice(0, maxlingth)}....`;
  return txt;
}
