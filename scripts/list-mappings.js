import { SourceMapConsumer } from 'source-map';
import { readFileSync } from 'fs';

var input = readFileSync('./out/index.js.map', { encoding: 'utf-8' });

var consumer = await new SourceMapConsumer(input);

consumer.eachMapping((m)=>console.log(m));
