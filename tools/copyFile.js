import fs from 'fs'

export default function copyFile(source, target) {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(target);
  rd.on("error", err => {throw err})
  wr.on("error", err => {throw err});
  rd.pipe(wr);
}