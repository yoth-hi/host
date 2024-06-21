let icons = {};
const G = a => a.toLowerCase().trim();
export function SetIcon(name, size, html){
  icons[G(name)] = {
    name,
    size,
    html
  }
}
export function GetIcon(name){
  return icons[G(name)]
}


SetIcon("search", 24, "<path d=\"M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909ZM18 11a7 7 0 11-14 0 7 7 0 0114 0Z\"></path>")

