// swift-tools-version: 6.0

import PackageDescription

let package = Package(
  name: "AppleIntelligence",
  platforms: [
    // Foundation Models (Apple's on-device model) requires macOS 26 or later
    .macOS("26.0")
  ],
  dependencies: [
    .package(url: "https://github.com/raycast/extensions-swift-tools", from: "1.1.0")
  ],
  targets: [
    .executableTarget(
      name: "AppleIntelligence",
      dependencies: [
        .product(name: "RaycastSwiftMacros", package: "extensions-swift-tools"),
        .product(name: "RaycastSwiftPlugin", package: "extensions-swift-tools"),
        .product(name: "RaycastTypeScriptPlugin", package: "extensions-swift-tools"),
      ]
    )
  ]
)
