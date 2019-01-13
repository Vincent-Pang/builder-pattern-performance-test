import * as Benchmark from 'benchmark';
import {Builder} from 'builder-pattern';

interface UserInfo {
  id: number;
}

const obj: any = {};

const builder = Builder<UserInfo>();

const suite = new Benchmark.Suite();

// add tests
suite
  .add('Vanilla', () => {
    obj.id = 1;
  })
  .add('Builder', () => {
    builder.id(1);
  })
  // add listeners
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .on('complete', (event: any) => {
    console.log('Fastest is ' + event.currentTarget.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });

// logs
// Vanilla x 665,864,750 ops/sec ±0.74% (83 runs sampled)
// Builder x 17,418,895 ops/sec ±0.95% (86 runs sampled)
// Fastest is Vanilla
