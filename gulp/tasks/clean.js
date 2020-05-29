import del from 'del'
import colors from 'ansi-colors'
import log from 'fancy-log'
import { dest } from '../config'
const { js, css } = dest

const build = () => () => {
  return del(
    [
      `${js}/*.js`,
      `${js}/*.js.map`,
      `${css}/*.css`,
      `${css}/*.css.map`,

      `!${js}/site.js`,
      `!${css}/site.css`,
    ],
    {
      force: true,
    }
  ).then(paths => log('Deleted:', colors.magenta(paths.join('\n'))))
}

module.exports.build = build
