#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${ROOT_DIR}/dist-download"
ARCHIVE_NAME="25cafe-github-ready.zip"
ARCHIVE_PATH="${OUTPUT_DIR}/${ARCHIVE_NAME}"

mkdir -p "${OUTPUT_DIR}"
rm -f "${ARCHIVE_PATH}"

cd "${ROOT_DIR}"

zip -rq "${ARCHIVE_PATH}" \
  src public index.html package.json tsconfig.json vite.config.ts components.json \
  -x "**/node_modules/**" "**/.DS_Store"

echo "Archive prepared:"
echo "${ARCHIVE_PATH}"
