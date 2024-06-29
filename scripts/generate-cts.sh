#!/bin/bash


# TypeScript projects using `moduleResolution: nodenext` expect
# explicit extensions to be included in declaration files,
# and to have a different set of declarations for commonjs
# modules (.d.cts) and ES modules (.d.ts). `tsc` unfortunately
# doesn't provide a way to generate these declarations files,
# so I'm manually creating them in this script.

# This script should be run after the `build` script, and will
# Cambiar al directorio del script
cd "$(dirname "$0")"

# Verificar la existencia del directorio dist
if [ ! -d "../dist" ]; then
  echo "Directory 'dist' does not exist. Aborting."
  exit 1
fi

# Buscar archivos .d.ts en el directorio dist
files=$(find ../dist -type f -name "*.d.ts")

# Verificar si se encontraron archivos .d.ts
if [ -z "$files" ]; then
  echo "No .d.ts files found in dist directory."
  exit 1
fi

# Loop a través de los archivos .d.ts encontrados
for file in $files; do
    # Update imports to include the '.cjs' extension
    sed -E "s/(.*)from '([^']*)'/\1from '\2.cjs'/g" "$file" > "${file%.d.ts}.d.cts"
    # Add `.js` extensions to .d.ts files
    sed -i -e "s/\(.*\)from '\([^']*\)'/\1from '\2.js'/g" "$file"
done
