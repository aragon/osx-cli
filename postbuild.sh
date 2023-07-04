#!/bin/sh
{ echo "#!/usr/bin/env node" && cat dist/main.js; } > dist/temp.js && mv dist/temp.js dist/main.js
