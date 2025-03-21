import { SourceMapConsumer } from 'source-map';
import { readFileSync } from 'fs';

var input = readFileSync('./out/index.js.map', { encoding: 'utf-8' });

var consumer = await new SourceMapConsumer(input);

let foundNullMapping = false;
consumer.eachMapping((m)=> {
  if (m.source === null) {
    foundNullMapping = true;
    console.log(m);
  }
});

if (!foundNullMapping) console.warn('No null mappings');