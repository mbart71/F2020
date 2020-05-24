module.exports = {
  name: "info",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/libs/info",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js"
  ]
};
