module.exports = {
  name: "bank",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/libs/bank",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js"
  ]
};
