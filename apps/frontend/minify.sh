#!/bin/bash
cd .next/standalone/node_modules
for d in $(find . -maxdepth 1 -type d); do
  npx --yes esbuild $(find $d -type f -name '*.js') --minify --outdir=$d --platform=node --target=node16 --format=cjs --allow-overwrite
done
cd -
