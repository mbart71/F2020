module.exports = {
  name: "race",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/libs/race",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js"
  ]
};
