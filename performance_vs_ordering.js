/**
 *  Proof of Concept - Validation
 *  Martin Ouimet, mouimet@infini-soft.com
 *  September 24th, 2022
 * 
 *  1.  Performance Benchmarks
 *      Array vs Object Mutation
 *
 *      Index is unknown therefore array must
 *      traverse array vs object accessing
 *      using key.
 * 
 *
 *  2.  Ordering Evaluation
 *      Sparse Array vs Object
 *
 *      Validate ordering after mutating array and object.
 */

// Creating SPARSE array with Array class
// https://www.freecodecamp.org/news/sparse-and-dense-arrays-in-javascript/
const array = new Array(999999).fill(0).map((a) => ({ id: a }));
const obj = array.reduce((acc, v) => ({ ...acc, id: v }), {});
const rand = () => (Math.random() * 100 * Math.random() * 999999) % 999999;

/**
 * Performance Benchmarks
 * Array vs Object Mutation
 */
const performance_array = (id) => {
  const test1start = new Date().getTime();

  array.forEach((a, index) => {
    if (a.id === id) {
      array[index] = 1;
    }
  });
  const test1end = new Date().getTime() - test1start;
  return test1end;
};

const performance_object = (id) => {
  const test2start = new Date().getTime();
  obj[id] = 1;
  const test2end = new Date().getTime() - test2start;

  return test2end;
};

const performance_benchmarks = () => {
  console.log(`
                    ********************************

                        Performance Benchmark
                        Array vs Object Mutation

                    **********************************
    `);

  const loop100 = new Array(256).fill(0);

  const test1start = new Date().getTime();
  loop100.forEach(() => performance_array(rand()));
  const test1end = new Date().getTime() - test1start;

  const test2start = new Date().getTime();
  loop100.forEach(() => performance_object(rand()));
  const test2end = new Date().getTime() - test2start;

  console.log(`
        Object mutation                                           Array mutation 
  Avg Time       Execution Time                              Avg Time      Execution time
    ${
      test2end / loop100.length
    } ms          ${test2end} ms                                       ${
    test1end / loop100.length
  } ms     ${test1end} ms

`);
};

const output_array = (_original, _changed) => {
  console.log(`
Length     Original ${_original.length} items                   Changed ${_changed.length} items`);
  for (let i = 0; i < Math.max(_original.length, _changed.length); i++) {
    const o = _original[i];
    const c = _changed[i];
    console.log(
      `Index ${i}     Original ${o?.name ?? o}                  Changed ${
        c?.name ?? c
      }`
    );
  }
};
const output_object = (_org, _chg) => {
  const _original = Object.entries(_org);
  const _changed = Object.entries(_chg);

  console.log(`
Length     Original ${_original.length} items                   Changed ${_changed.length} items`);
  for (let i = 0; i < Math.max(_original.length, _changed.length); i++) {
    const o = _original[i];
    const c = _changed[i];
    console.log(
      `Index ${i}     Original ${o?.name ?? o}                  Changed ${
        c?.name ?? c
      }`
    );
  }
};

/**
 * Ordering Evaluation
 * Sparse Array vs Object
 */

const ordering_array = () => {
  const original = [
    { name: "martin" },
    { name: "aman" },
    { name: "murilo" },
    { name: "masseh" },
    { name: "georgette" },
  ];
  const changed = [
    { name: "martin" },
    { name: "aman" },
    { name: "murilo" },
    { name: "masseh" },
    { name: "georgette" },
  ];

  console.log(`
*******************************
  Ordering Evaluation
  Sparse Array
*******************************  
`);

  console.log(`Initial`);
  output_array(original, changed);

  delete changed[3];

  console.log(`
  After delete[3]`);
  output_array(original, changed);

  changed.push("PUSHED");
  console.log(`
  Push a value`);
  output_array(original, changed);
};

const ordering_object = () => {
  console.log(`

********************************
  Ordering Evaluation
  Object
********************************`);

  let _org = {
    ida: "martin",
    idb: "aman",
    idc: "murilo",
    idd: "masseh",
    ide: "georgette",
  };
  let _changed = {
    ida: "martin",
    idb: "aman",
    idc: "murilo",
    idd: "masseh",
    ide: "georgette",
  };

  console.log(`
  Initial`);
  output_object(_org, _changed);

  console.log(`
  Before delete changed.idc`);
  output_object(_org, _changed);

  var d = delete _changed["idc"];

  console.log(`
  After delete changed.idc`);
  output_object(_org, _changed);

  console.log(`
  Before changed.pushed = "PUSHED"`);
  _changed["pushed"] = "PUSHED";
  output_object(_org, _changed);
};

ordering_array();
ordering_object();
performance_benchmarks();
