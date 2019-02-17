const test = require('ava')

const { JWK: { generate, generateSync } } = require('../..');

[
  ['rsa'],
  ['RSA'],
  ['RSA', undefined, undefined, true],
  ['RSA', undefined, undefined, false],
  ['RSA', 2048],
  ['RSA', 2048, { use: 'sig' }],
  ['RSA', 2048, { use: 'enc' }],
  ['RSA', 2048, { use: 'sig', alg: 'PS256' }],
  ['RSA', 2048, { use: 'enc', alg: 'RSA-OAEP' }],
  ['RSA', 2048, { alg: 'PS256' }],
  ['RSA', 2048, { alg: 'RSA-OAEP' }],
  ['ec'],
  ['EC'],
  ['EC', undefined, undefined, true],
  ['EC', undefined, undefined, false],
  ['EC', 'P-256'],
  ['EC', 'P-256', { use: 'sig' }],
  ['EC', 'P-256', { use: 'enc' }],
  ['EC', 'P-256', { use: 'sig', alg: 'ES256' }],
  ['EC', 'P-256', { use: 'enc', alg: 'ECDH-ES' }],
  ['EC', 'P-256', { alg: 'ES256' }],
  ['EC', 'P-256', { alg: 'ECDH-ES' }],
  ['EC', 'P-384'],
  ['EC', 'P-384', { use: 'sig' }],
  ['EC', 'P-384', { use: 'enc' }],
  ['EC', 'P-384', { use: 'sig', alg: 'ES384' }],
  ['EC', 'P-384', { use: 'enc', alg: 'ECDH-ES' }],
  ['EC', 'P-384', { alg: 'ES384' }],
  ['EC', 'P-384', { alg: 'ECDH-ES' }],
  ['EC', 'P-521'],
  ['EC', 'P-521', { use: 'sig' }],
  ['EC', 'P-521', { use: 'enc' }],
  ['EC', 'P-521', { use: 'sig', alg: 'ES512' }],
  ['EC', 'P-521', { use: 'enc', alg: 'ECDH-ES' }],
  ['EC', 'P-521', { alg: 'ES512' }],
  ['EC', 'P-521', { alg: 'ECDH-ES' }],
  ['oct'],
  ['oct', 192],
  ['oct', 192, { use: 'sig' }],
  ['oct', 192, { use: 'enc' }],
  ['oct', 192, { use: 'sig', alg: 'HS256' }],
  ['oct', 192, { use: 'enc', alg: 'A192GCM' }],
  ['oct', 192, { alg: 'HS256' }],
  ['oct', 192, { alg: 'A192GCM' }]
].forEach((args) => {
  test(`sync generates ${args[0]}(${args[1]}) with options ${JSON.stringify(args[2])}${typeof args[3] === 'boolean' ? ` and private=${args[3]}` : ''}`, t => {
    const key = generateSync(args[0], args[1], args[2], args[3])
    t.truthy(key)

    if (key.kty !== 'oct') {
      if (args.length === 4) {
        if (args[3] === true) {
          t.true(key.private)
          t.false(key.public)
        } else {
          t.true(key.public)
          t.false(key.private)
        }
      } else {
        t.true(key.private)
        t.false(key.public)
      }
    }

    if (args[2]) {
      const { use, alg } = args[2]
      t.is(key.use, use)
      t.is(key.alg, alg)

      if (alg) {
        t.deepEqual([...key.algorithms()], [alg])
      }
    }
  })

  test(`async generates ${args[0]}(${args[1]}) with options ${JSON.stringify(args[2])}${typeof args[3] === 'boolean' ? ` and private=${args[3]}` : ''}`, async t => {
    const key = await generate(args[0], args[1], args[2], args[3])
    t.truthy(key)

    if (key.kty !== 'oct') {
      if (args.length === 4) {
        if (args[3] === true) {
          t.true(key.private)
          t.false(key.public)
        } else {
          t.true(key.public)
          t.false(key.private)
        }
      } else {
        t.true(key.private)
        t.false(key.public)
      }
    }

    if (args[2]) {
      const { use, alg } = args[2]
      t.is(key.use, use)
      t.is(key.alg, alg)

      if (alg) {
        t.deepEqual([...key.algorithms()], [alg])
      }
    }
  })
})

test('fails to generateSync unsupported kty', t => {
  t.throws(() => {
    generateSync('OKP')
  }, { instanceOf: TypeError, message: 'invalid key type' })
})

test('fails to generate unsupported kty', async t => {
  await t.throwsAsync(() => {
    return generate('OKP')
  }, { instanceOf: TypeError, message: 'invalid key type' })
})

test('fails to generateSync RSA with invalid bit lengths', t => {
  t.throws(() => {
    generateSync('rsa', 2048 + 1)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})

test('fails to generate RSA with invalid bit lengths', async t => {
  await t.throwsAsync(() => {
    return generate('rsa', 2048 + 1)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})

test('fails to generateSync RSA with less than 512 bits', t => {
  t.throws(() => {
    generateSync('rsa', 512 - 8)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})

test('fails to generate RSA with less than 512 bits', async t => {
  await t.throwsAsync(() => {
    return generate('rsa', 512 - 8)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})

test('fails to generateSync oct with invalid bit lengths', t => {
  t.throws(() => {
    generateSync('oct', 256 + 1)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})

test('fails to generate oct with invalid bit lengths', async t => {
  await t.throwsAsync(() => {
    return generate('oct', 256 + 1)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})

test('fails to generateSync oct with less than 512 bits', t => {
  t.throws(() => {
    generateSync('oct', 0)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})

test('fails to generate oct with less than 512 bits', async t => {
  await t.throwsAsync(() => {
    return generate('oct', 0)
  }, { instanceOf: TypeError, message: 'invalid bit length' })
})
