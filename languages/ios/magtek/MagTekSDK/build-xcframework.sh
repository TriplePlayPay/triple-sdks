#!/bin/sh
# this is a fucking mess on both Apple and MagTek's part
# enjoy...

if [ $# -ge 1 ] && ([ "$1" != "clean" ] && [ "$1" != "sign" ]); then
    echo "not a supported sub-command: '$1'"
    exit 0
fi

build_path="./Build" # just build it in the same folder
archive_path="$build_path/Archives"

# begone thot
echo "cleaning build folder..."; rm -rf $build_path
if [ "$1" == "clean" ]; then echo "+ all clean"; exit 0; fi

# create the framework archive for bare-metal
xcodebuild archive \
    -project MagTekSDK.xcodeproj \
    -scheme MagTekSDK_iOS \
    -destination "generic/platform=iOS" \
    -archivePath "$archive_path/MagTekSDK_iOS"

# create the framework archive for the simulator
xcodebuild archive \
    -project MagTekSDK.xcodeproj \
    -scheme MagTekSDK_iOS_Simulator \
    -destination "generic/platform=iOS Simulator" \
    -archivePath "$archive_path/MagTekSDK_iOS_Simulator"

# create the bundle
xcodebuild -create-xcframework \
    -archive "$archive_path/MagTekSDK_iOS.xcarchive" -framework MagTekSDK.framework \
    -archive "$archive_path/MagTekSDK_iOS_Simulator.xcarchive" -framework MagTekSDK.framework \
    -output "$build_path/MagTekSDK.xcframework"

# sign the bundle with the current user's dev account if they so choose
if [ "$1" == "sign" ]; then
    echo "signing the xcframework bundle with $USER's apple development account"
    apple_id=$(security find-identity -p codesigning \
        | grep 'Apple Development' \
        | cut -f 4 -d ' ' \
        | head -n 1 )
    codesign --timestamp -s $apple_id "$build_path/MagTekSDK.xcframework"
    echo "successfully signed the bundle."
fi

echo "+ done"
