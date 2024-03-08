#!/bin/sh

# go fast
echo "cleaning build folders..."
rm -rf ./{Build,DerivedData}
echo "done."

# build the VM binary package
xcodebuild archive \
    -project MagTekSDK.xcodeproj \
    -scheme "MagTekSDK (Simulator)" \
    -destination "generic/platform=iOS Simulator" \
    -archivePath "Build/archives/MagTekSDK" \

# TODO: setup the static lib for bare-metal iOS
#xcodebuild archive \
#    -project MagTekSDK.xcodeproj \
#    -scheme "MagTekSDK" \
#    -destination "generic/platform=iOS" \
#    -archivePath "archives/MagTekSDK" \

# create the bundle
xcodebuild -create-xcframework \
    -archive "Build/archives/MagTekSDK.xcarchive" -framework MagTekSDK.framework \
    -output "Build/xcframeworks/MagTekSDK.xcframework"

# sign the bundle using system's developer account
devid=$(security find-identity -p codesigning | grep 'Apple Development' | cut -f 4 -d ' ' | head -n 1)
codesign --timestamp -s $devid "Build/xcframeworks/MagTekSDK.xcframework"
