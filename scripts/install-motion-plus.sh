#!/bin/sh

# Load .env.local if exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

if [ -z "$MOTION_TOKEN" ]; then
  echo "MOTION_TOKEN not set"
  exit 1
fi

echo "Installing motion-plus..."
if bun add "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=$MOTION_TOKEN" --no-save --ignore-scripts --silent; then
  echo "motion-plus installed"
else
  echo "Failed to install motion-plus"
  exit 1
fi
