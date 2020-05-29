import gulp from 'gulp'
import config from './gulp/config'

const getTaskBuild = task => require(`./gulp/tasks/${task}`).build(gulp)
const getTaskWatch = task => require(`./gulp/tasks/${task}`).watch(gulp)

gulp.task('clean', getTaskBuild('clean'))
gulp.task('svgicons', getTaskBuild('svgicons'))
gulp.task('copy', getTaskBuild('copy'))
gulp.task('sass', () => getTaskBuild('sass'))
gulp.task('webpack', getTaskBuild('webpack'))

gulp.task('copy:watch', getTaskWatch('copy'))
gulp.task('svgicons:watch', getTaskWatch('svgicons'))
gulp.task('sass:watch', getTaskWatch('sass'))
gulp.task('webpack:watch', getTaskWatch('webpack'))

const setmodeProd = done => {
  config.setEnv('production')
  config.logEnv()
  done()
}

const setmodeDev = done => {
  config.setEnv('development')
  config.logEnv()
  done()
}

gulp.task(
  'build',
  gulp.series(
    setmodeProd,
    'clean',
    // 'svgicons',
    'sass',
    'webpack',
  )
)

gulp.task(
  'build:dev',
  gulp.series(
    setmodeDev,
    'clean',
    // 'svgicons',
    'sass',
    'webpack',
  )
)

gulp.task(
  'watch',
  gulp.parallel(
    'copy:watch',
    // 'svgicons:watch',
    'webpack:watch',
    'sass:watch',
  )
)

gulp.task('default', gulp.series(['build:dev', 'watch']))
