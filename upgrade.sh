#!/bin/sh

# Upgrade to latest Yarn Modern (v4 at the moment)
# WARNING: If you're running Node.js < 18:
# 1. Who hurt you?
# 2. Use `yarn set version 3.6.4` instead.
yarn set version berry

# (optional) Set nodeLinker to node-modules - this 100% guarantees backwards compatibility
# NOTE: Not needed in latest Yarn versions, this should be automatic
yarn config set nodeLinker node-modules

# (optional) Adds `yarn upgrade-interactive` command back
# NOTE: Not needed in Yarn v4, plugins are now included
yarn plugin import interactive-tools

# Reinstalls project using Yarn Modern. This will also update your yarn.lock file, but will 
# NOT sneakily upgrade the dependencies
yarn

# Commits the changes
git add . && git commit -m "Upgrade Yarn to Yarn Berry"
