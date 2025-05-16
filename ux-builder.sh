#!/bin/sh

echo "Removing files and directories from previous build"
rm chatter-build.tar.gz
rm -rf build

npm install

echo "Running build"
npm run build

echo "Generating tarball to deploy..."
tar cvzf chatter-build.tar.gz ./build

echo "Syncing all native platforms"
npx cap sync

echo "Done build at" `date`
