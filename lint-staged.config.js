module.exports = {
  "src/**/*.{ts}":
    (filenames) => "tsc --noEmit", // https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments

  "*.ts": [
    "eslint --fix",
    "prettier --write"
  ]
}
