#!/bin/sh

BUILD_DIR="./Build"

# xcframeworks don't like to override previous xcframeworks
printf "+ cleaning build folders... "
rm -rf $BUILD_DIR
echo "done."

if [ "$1" == "clean" ]; then exit 0; fi

# build the bare-metal iOS package
xcodebuild archive \
    -project MagTekSDK.xcodeproj \
    -scheme "MagTekSDK" \
    -destination "generic/platform=iOS" \
    -archivePath "$BUILD_DIR/archives/MagTekSDK"

# TODO: get the simulator build working
#xcodebuild archive \
#    -project MagTekSDK.xcodeproj \
#    -scheme "MagTekSDK" \
#    -destination "generic/platform=iOS Simulator" \
#    -archivePath "$BUILD_DIR/archives/MagTekSDK_Simulator"

# create the bundle
xcodebuild -create-xcframework \
    -output "$BUILD_DIR/xcframeworks/MagTekSDK.xcframework" \
    -archive "$BUILD_DIR/archives/MagTekSDK.xcarchive" -framework MagTekSDK.framework \
    #-archive "$BUILD_DIR/archives/MagTekSDK_Simulator.xcarchive" -framework MagTekSDK.framework

if [ "$1" == "sign" ]; then
    # sign the bundle using system's developer account
    devid=$(security find-identity -p codesigning | grep 'Apple Development' | cut -f 4 -d ' ' | head -n 1)
    codesign --timestamp -s $devid "$BUILD_DIR/xcframeworks/MagTekSDK.xcframework"
fi
